<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use App\Models\ServidorNew\User;

class SQLPasswordService
{

        /**
     * Verifica la conexión con SQL Server.
     *
     * @return bool
     * @throws \Exception
     */
    public function testSqlServerConnection()
    {
        $connection = @sqlsrv_connect(env('DB_HOST'), [
            'UID' => env('DB_USERNAME'),
            'PWD' => env('DB_PASSWORD'),
            'Database' => 'master',
        ]);

        if (!$connection) {
            $errorDetails = sqlsrv_errors();
            Log::error('Error al conectar con SQL Server (test de conexión):', $errorDetails);
            throw new \Exception('Error al conectar con SQL Server. Verifique la configuración.');
        }

        sqlsrv_close($connection);

        return true;
    }

  
    /**
     * Autentica a un usuario en SQL Server.
     *
     * @param string $username
     * @param string $password
     * @return bool
     * @throws \Exception
     */
    public function authenticateUser($username, $password)
    {
        // Test de conexión antes de autenticar al usuario
        $this->testSqlServerConnection();

        // Intentar conectar con las credenciales del usuario
        $connection = @sqlsrv_connect(env('DB_HOST'), [
            'UID' => $username,
            'PWD' => $password,
            'Database' => 'master',
        ]);

        if (!$connection) {
            $errorDetails = sqlsrv_errors();
            Log::error('Error al autenticar al usuario en SQL Server:', $errorDetails);
            throw new \Exception('Usuario o contraseña incorrectos.');
        }

        sqlsrv_close($connection);

        return true;
    }

    public function updatePassword($username, $newPassword)
    {
        DB::unprepared("ALTER LOGIN [$username] WITH PASSWORD = '$newPassword'");
    }

    public function closeUserSessions($username)
    {
        $sessions = DB::select("SELECT session_id FROM sys.dm_exec_sessions WHERE login_name = ?", [$username]);

        foreach ($sessions as $session) {
            DB::unprepared("KILL {$session->session_id}");
        }

        Session::forget('sql_username');
    }

    public function generateResetToken($emailOrUsername)
    {

        // Buscar al usuario por correo o nombre de usuario
        $user = User::where('EmailUsuario', $emailOrUsername)
            ->orWhere('NombreUsuario', $emailOrUsername)
            ->first();

        if (!$user) {
            throw new \Exception('Usuario no encontrado.');
        }
       

        // Crear el payload del token
        $payload = [
            'sub' => $user->id, // ID del usuario
            'iat' => now()->timestamp, // Tiempo actual
            'exp' => now()->addMinutes(30)->timestamp, // Expira en 30 minutos
        ];

        // Generar el token JWT
        $token = JWTAuth::fromUser($user, $payload);

        try {
            DB::connection('mysql')
                ->table('password_resets')
                ->updateOrInsert(
                    ['email' => $user->EmailUsuario], // Identificar por correo electrónico
                    ['token' => $token, 'created_at' => now()] // Guardar el token y la fecha
                );
        
            
        } catch (\Exception $e) {
           
        
            return response()->json([
                'message' => 'Ocurrió un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.'
            ], 500);
        }

        return $token;
    }

}
