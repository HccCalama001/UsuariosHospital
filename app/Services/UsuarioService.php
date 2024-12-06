<?php
namespace App\Services;

use App\Models\ServidorNew\User;
use App\Models\ServidorOld\UsuarioLogin;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;


class UsuarioService
{
    public function buscarUsuarioResumen($nameuser)
    {
        $userNew = User::with('rol', 'login.roleUserSistema.role')->where('NombreUsuario', $nameuser)->orWhere('Rut', $nameuser)->first();

        $userLogin = UsuarioLogin::with('seguUsuario.servicioProfesional.tipoProfesional')
            ->where('name', $nameuser)
            ->first();

        $usuarioSistema = DB::connection('sqlsrv2')->select("
            SELECT us.TAB_Login, us.TAB_ID_Sistema, ss.TAB_Text AS sistemaSalud
            FROM TAB_UsuarioSistema us
            LEFT JOIN TAB_SistemaSalud ss ON us.TAB_ID_Sistema = ss.TAB_Codigo
            WHERE us.TAB_Login = ?
        ", [$nameuser]);

        return [
            'userNew' => $userNew ? $userNew->toArray() : null,
            'userLogin' => $userLogin ? $userLogin->toArray() : null,
            'usuarioSistema' => $usuarioSistema,
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
        Log::info("Iniciando cambio de contraseña para el usuario: {$username}");
    
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
    
            // Actualizar contraseña en MySQL
            DB::connection('mysql')->table('usuarios')
                ->where('NombreUsuario', $username)
                ->update(['password' => Hash::make($data['new_password'])]);
        });
    
        Log::info("Cambio de contraseña completado exitosamente para el usuario: {$username}");
    
        return [
            'message' => 'La contraseña ha sido cambiada exitosamente en ambos sistemas.',
        ];
    }
    
    

}
