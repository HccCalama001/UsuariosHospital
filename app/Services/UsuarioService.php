<?php
namespace App\Services;

use App\Models\ServidorNew\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use App\Models\ServidorOld\UsuarioLogin;
use App\Models\ServidorOld\UsuarioServicio;
use App\Models\ServidorNew\PasswordReset;
use Illuminate\Validation\ValidationException;



class UsuarioService
{
    public function buscarUsuarioResumen($nameuser)
    {
        $userNew = User::with('login.roleUserSistema.role', 'login.roleUserSistema.sistema')
        ->where('NombreUsuario', $nameuser)
        ->orWhere('Rut', $nameuser)
        ->first();

        if ($userNew) {
            $userNew->makeHidden(['login', 'created_at', 'updated_at', 'deleted_at','RolID','email_verified_at','remember_token']);
            // Extraer los nombres de los sistemas
            $sistemasWeb = $userNew->login->roleUserSistema->map(function ($roleUserSistema) {
                return [
                    'role_id' => $roleUserSistema->role_id,
                    'role_name' => $roleUserSistema->role->nombre ?? 'Sin rol', // Manejar roles sin nombre
                    'sistema_id' => $roleUserSistema->sistemas_id,
                    'sistema_name' => $roleUserSistema->sistema->nombre ?? 'Sin sistema', // Manejar sistemas sin nombre
                ];
            });
        
        } else {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        $userLogin = UsuarioLogin::with('seguUsuario.servicioProfesional.tipoProfesional')
            ->where('name', $nameuser)
            ->first();
        if($userLogin){
            $userLogin->makeHidden(['modify_date', 'type_desc']);
        }else{
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
        

        $usuarioSistema = DB::connection('sqlsrv2')->select("
            SELECT us.TAB_Login, us.TAB_ID_Sistema, ss.TAB_Text AS sistemaSalud
            FROM TAB_UsuarioSistema us
            LEFT JOIN TAB_SistemaSalud ss ON us.TAB_ID_Sistema = ss.TAB_Codigo
            WHERE us.TAB_Login = ?
        ", [$nameuser]);

        if(!$usuarioSistema){
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        return [
            'userNew' => $userNew ? $userNew->toArray() : null,
            'userLogin' => $userLogin ? $userLogin->toArray() : null,
            'usuarioSistema' => $usuarioSistema,
            'usuarioSistemaWeb' => $sistemasWeb,
        ];
    }

    public function formatUserData($user)
    {
        return [
            'nombre' => $user->Nombre,
            'apellido' => $user->ApellidoPaterno . ' ' . $user->ApellidoMaterno,
            'email' => $user->EmailUsuario,
            'telefono' => $user->NumeroTelefono,
            'rut' => $user->Rut,
            'username' => $user->NombreUsuario,
        ];
    }

    public function guardarDatos(array $validatedData)
    {
        return User::create([
            'Rut' => $validatedData['rut'],
            'Nombre' => $validatedData['name'],
            'ApellidoPaterno' => $validatedData['apellido_paterno'],
            'ApellidoMaterno' => $validatedData['apellido_materno'],
            'EmailUsuario' => $validatedData['email'],
            'NumeroTelefono' => $validatedData['phone'],
            'password' => bcrypt($validatedData['current_password']),
            'NombreUsuario' => $validatedData['userLogin'],
        ]);
    }

    public function buscarUsuarioExistente($username)
    {
        $user = User::where('NombreUsuario', $username)->first();

        if (!$user) {
            throw new \Exception('Usuario no encontrado en la base de datos.');
        }

        return $user;
    }

    public function cambiarContrasena($username, $data)
    {

        DB::transaction(function () use ($username, $data) {
            // Verificar existencia del usuario en SQL Server
            $sqlServerUser = DB::connection('sqlsrv')->selectOne("
                SELECT name AS username
                FROM sys.sql_logins
                WHERE name = ?", [$username]);

            if (!$sqlServerUser) {
                throw ValidationException::withMessages([
                    'current_password' => ['Usuario no encontrado en el sistema de SQL Server.'],
                ]);

            }

            // Actualizar contraseña en SQL Server
            DB::connection('sqlsrv')->statement("
                ALTER LOGIN [$username] WITH PASSWORD = '{$data['new_password']}'
            ");

            // Actualizar contraseña en SQL
            DB::connection('sqlsrvUsers')->table('usuarios')
                ->where('NombreUsuario', $username)
                ->update(['password' => Hash::make($data['new_password'])]);
        });

        return [
            'message' => 'La contraseña ha sido cambiada exitosamente en ambos sistemas.',
        ];
    }


    /**
     * Actualiza el usuario en el nuevo sistema y en los sistemas antiguos de manera global.
     *
     * @param  int   $userId
     * @param  array $datos
     * @return bool
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     * @throws \Throwable
     */
    public function actualizarUsuarioGlobal(string $username, array $datos): bool
    {
        return DB::transaction(function () use ($username, $datos) {
            // Obtener el usuario o lanzar excepción si no existe

            $user = User::findOrFailByUsername($username);

            // Actualizar datos en el sistema nuevo (SQL)
            $user->update([
                'Nombre' => $datos['Nombre'] ?? $user->Nombre,
                'ApellidoPaterno' => $datos['ApellidoPaterno'] ?? $user->ApellidoPaterno,
                'ApellidoMaterno' => $datos['ApellidoMaterno'] ?? $user->ApellidoMaterno,
                'EmailUsuario' => $datos['EmailUsuario'] ?? $user->EmailUsuario,
                'NumeroTelefono' => $datos['NumeroTelefono'] ?? $user->NumeroTelefono,
                'Rut' => $datos['Rut'] ?? $user->Rut,
                'NombreUsuario' => $datos['NombreUsuario'] ?? $user->NombreUsuario,
            ]);

            // Actualizar datos en UsuarioServicio (sistema antiguo) si existe el registro
            if ($user->servicio) {
                $user->servicio->update([
                    'Segu_Usr_Nombre' => $datos['Nombre'] ?? $user->Nombre,
                    'Segu_Usr_ApellidoPaterno' => $datos['ApellidoPaterno'] ?? $user->ApellidoPaterno,
                    'Segu_Usr_ApellidoMaterno' => $datos['ApellidoMaterno'] ?? $user->ApellidoMaterno,
                    'Segu_Usr_RUT' => $datos['Rut'] ?? $user->Rut,
                    'Segu_Usr_Fono' => $datos['NumeroTelefono'] ?? $user->NumeroTelefono,
                    'Segu_Usr_Mail' => $datos['EmailUsuario'] ?? $user->EmailUsuario,
                    'Segu_Usr_Cuenta' => $datos['NombreUsuario'] ?? $user->NombreUsuario,
                    // Agregar más campos aquí si existen en la BD antigua, por ejemplo email si está disponible.
                ]);
            }

            // Actualizar datos en ServicioProfesional (sistema antiguo) si existe el registro
            if ($user->profesional) {
                $user->profesional->update([
                    'SER_PRO_Nombres' => $datos['Nombre'] ?? $user->Nombre,
                    'SER_PRO_ApellPater' =>  $datos['ApellidoPaterno'] ?? $user->ApellidoPaterno,
                    'SER_PRO_ApellMater' => $datos['ApellidoMaterno'] ?? $user->ApellidoMaterno,
                    'SER_PRO_Rut' => $datos['Rut'] ?? $user->Rut,
                    'SER_PRO_Telefono' => $datos['NumeroTelefono'] ?? $user->NumeroTelefono,

                    // Agregar más campos si es necesario.
                ]);
            }

            // Aquí puedes agregar más lógica para actualizar otros sistemas o relaciones si es necesario.
            // Ejemplo: si necesitas modificar UsuarioLogin, etc.

            return true;
        });
    }

    public function obtenerNombreCompleto($username)
    {
        // Busca el usuario en la base de datos
        $user = UsuarioServicio::where('Segu_Usr_Cuenta', $username)->first();

        // Si el usuario no existe, lanza una excepción
        if (!$user) {
            throw new \Exception('Usuario no encontrado');
        }

        // Devuelve el nombre completo
        return $user->nombre_usuario; // Utiliza el accesor definido en el modelo
    }

    public function resetPassword($token, $newPassword)
    {
        $passwordReset = DB::connection('sqlsrvUsers')
            ->table('password_resets')
            ->where('token', $token)
            ->first();

        if (!$passwordReset) {
            throw new \Exception('Token no válido o expirado.');
        }

        // Buscar al usuario asociado al correo
        $user = User::where('EmailUsuario', $passwordReset->email)->first();

        if (!$user) {
            throw new \Exception('Usuario no encontrado.');
        }

        // Actualizar la contraseña del usuario
        $user->update([
            'password' => bcrypt($newPassword),
        ]);

        // Eliminar el token de la tabla `password_resets` después de usarlo
        DB::connection('sqlsrvUsers')
            ->table('password_resets')
            ->where('token', $token)
            ->delete();

        return true;
    }

    
}
