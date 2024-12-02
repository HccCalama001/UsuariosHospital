<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ServidorNew\User;
use App\Models\ServidorOld\UsuarioLogin;
use App\Models\ServidorOld\UsuarioServicio;
use App\Models\ServidorOld\UsuarioSistema;
use App\Models\ServidorOld\ServicioProfesional;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Tymon\JWTAuth\Facades\JWTAuth;

class UsuarioController extends Controller
{
    public function buscarUsuario(Request $request)
    {
        // Validar que el parámetro 'nameuser' esté presente
        $request->validate([
            'nameuser' => 'required|string',
        ]);

        $query = $request->input('nameuser'); // Nombre de usuario o RUT

        // Inicializar variables para cada fuente de datos
        $userNew = null;
        $userLogin = null;
        $usuarioSistema = null;

        // Buscar en la base de datos nueva (User)
        $userNew = User::with([
            'rol',
            'login.roleUserSistema.role',
            'login.roleUserSistema.sistema',
            'sistemas.sistemaSalud',
            'rolesSistema.role',
            'rolesSistema.sistema',
            'servicio',
            'profesional.tipoProfesional',
        ])
            ->where('NombreUsuario', $query)
            ->orWhere('Rut', $query)
            ->first();

        // Log de debugging
        Log::info('Resultado de $userNew:', ['userNew' => $userNew]);

        // Buscar en UsuarioLogin
        $userLogin = UsuarioLogin::with([
            'seguUsuario.servicioProfesional.tipoProfesional',
            'authRememberToken',
            'roleUserSistema.role',
            'roleUserSistema.sistema'
        ])
            ->where('name', $query)
            ->first();

        // Consultar UsuarioSistema y SistemaSalud (SQL Directo)
        $usuarioSistema = DB::connection('sqlsrv2')->select("
            SELECT us.TAB_Login, us.TAB_ID_Sistema, ss.TAB_Text AS sistemaSalud
            FROM TAB_UsuarioSistema us
            LEFT JOIN TAB_SistemaSalud ss ON us.TAB_ID_Sistema = ss.TAB_Codigo
            WHERE us.TAB_Login = ?
        ", [$query]);

        // Procesar datos del usuario nuevo (User)
        $userNewData = null;
        if ($userNew) {
            $userNewArray = $userNew->toArray();
            unset($userNewArray['password'], $userNewArray['remember_token']); // Excluir campos sensibles
            $userNewData = $userNewArray;
        }

        // Procesar datos de UsuarioLogin
        $userLoginData = null;
        if ($userLogin) {
            $userLoginArray = $userLogin->toArray();
            unset($userLoginArray['sid'], $userLoginArray['password_hash']); // Excluir campos sensibles
            $userLoginData = $userLoginArray;

            // Verificar roles asociados al usuario
            if (!empty($userLoginData['role_user_sistema'])) {
                $roles = collect($userLoginData['role_user_sistema'])->map(function ($roleUserSistema) {
                    return [
                        'role' => $roleUserSistema['role']['nombre'] ?? null,
                        'sistema' => $roleUserSistema['sistema']['nombre'] ?? null,
                        'vigencia' => $roleUserSistema['vigencia'] ?? null,
                    ];
                });
                $userLoginData['roles'] = $roles; // Añadir roles procesados a la respuesta
            }
        }

        // Procesar datos de UsuarioSistema
        $usuarioSistemaData = collect($usuarioSistema)->map(function ($sistema) {
            return [
                'login' => $sistema->TAB_Login,
                'sistemaId' => $sistema->TAB_ID_Sistema,
                'sistemaSalud' => $sistema->sistemaSalud ?? 'No asignado',
            ];
        });

        // Construir el resumen general
        $resumen = [
            'userNew' => $userNewData,
            'userLogin' => $userLoginData,
            'usuarioSistema' => $usuarioSistemaData,
        ];

        return response()->json($resumen);
    }

    public function completarDatos(Request $request)
    {
        $userLogin = session('userLogin');
        $currentPassword = session('current_password'); // Obtener la contraseña de la sesión
        Log::info('clave', ['request' => $currentPassword]);

        return Inertia::render('usuario/CompletarDatos', [
            'userLogin' => $userLogin,
            'current_password' => $currentPassword, // Enviar al frontend
        ]);
    }
    

    public function guardarDatos(Request $request)
    {
        Log::info('Inicio del proceso de guardarDatos.', ['datosRecibidos' => $request->all()]);

        // Validar los datos recibidos
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'apellido_paterno' => 'required|string|max:255',
                'apellido_materno' => 'required|string|max:255',
                'rut' => 'required|string|unique:mysql.usuarios,Rut',
                'email' => 'required|email|unique:mysql.usuarios,EmailUsuario',
                'phone' => 'nullable|string|max:15',
                'current_password' => 'required|string',
                'userLogin' => 'required|string',
            ]);
            Log::info('Validación de datos exitosa.', ['datosValidados' => $request->all()]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Error de validación', ['errores' => $e->errors()]);
            return response()->json([
                'message' => 'Error de validación.',
                'errors' => $e->errors(),
            ], 422);
        }

        // Crear usuario
        try {
            $user = User::create([
                'Rut' => $request->rut,
                'Nombre' => $request->name,
                'ApellidoPaterno' => $request->apellido_paterno,
                'ApellidoMaterno' => $request->apellido_materno,
                'EmailUsuario' => $request->email,
                'NumeroTelefono' => $request->phone,
                'password' => bcrypt($request->current_password),
                'NombreUsuario' => $request->userLogin,
            ]);
            Log::info('Usuario creado exitosamente.', ['user' => $user]);
        } catch (\Exception $e) {
            Log::error('Error al crear el usuario', ['exception' => $e->getMessage()]);
            return response()->json([
                'message' => 'Error al crear el usuario.',
                'error' => $e->getMessage(),
            ], 500);
        }

        // Generar token JWT
        try {
            $token = JWTAuth::fromUser($user);
            Log::info('Token JWT generado con éxito.', ['token' => $token]);
        } catch (\Exception $e) {
            Log::error('Error al generar el token JWT', ['exception' => $e->getMessage()]);
            return response()->json([
                'message' => 'Error al generar el token.',
                'error' => $e->getMessage(),
            ], 500);
        }

        // Respuesta final
        Log::info('Datos completados correctamente.', ['user' => $user, 'token' => $token]);
        return response()->json([
            'message' => 'Datos completados correctamente.',
            'token' => $token,
            'user' => $user,
        ], 201);
    }
        

}
