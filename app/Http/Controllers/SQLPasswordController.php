<?php
namespace App\Http\Controllers;

use App\Http\Requests\SQLPasswordRequest;
use App\Services\EmailService;
use App\Services\SQLPasswordService;
use App\Services\TokenService;
use App\Services\UsuarioService;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SQLPasswordController extends Controller
{
    protected $sqlPasswordService;
    protected $tokenService;
    protected $usuarioService;
    protected $emailService;

    public function __construct(SQLPasswordService $sqlPasswordService, TokenService $tokenService, UsuarioService $usuarioService, EmailService $emailService)
    {
        $this->sqlPasswordService = $sqlPasswordService;
        $this->tokenService = $tokenService;
        $this->usuarioService = $usuarioService;
        $this->emailService = $emailService;
    }

    /**
     * Muestra la vista de inicio de sesión.
     */
    public function index()
    {
        return Inertia::render('changePassword/SQLLogin', [
            'csrfToken' => csrf_token(), 
        ]);
    }
    
     // Mostrar el formulario de recuperación de contraseña
     public function showForgotPasswordForm()
     {
         return Inertia::render('changePassword/ForgotPassword',[
            'csrfToken' => csrf_token(), 
        ]);
     }
 

    public function authenticate(SQLPasswordRequest $request)
    {
        try {
    
            $this->sqlPasswordService->authenticateUser($request->username, $request->current_password);
    
            $usuarioData = $this->usuarioService->buscarUsuarioResumen($request->username);
            
    
            if (is_null($usuarioData['userNew'])) {
                // Usuario nuevo o temporal
                $token = $this->tokenService->generateTemporaryToken([
                    'username' => $request->username,
                    'temporary' => true,
                ]);
                // Guardar datos en la sesión
                session([
                    'userLogin' => $usuarioData,
                    'current_password' => $request->current_password,
                ]);
            
                $cookie = $this->tokenService->guardarEnCookie($token);
            
                return response()->json([
                    'status' => 'success',
                    'redirect' => route('usuario.completarDatos'),
                ])->withCookie($cookie);
            }
    
            // Usuario existente
            $user = $this->usuarioService->buscarUsuarioExistente($request->username);
            $token = $this->tokenService->generateFullToken($user);
            $cookie = $this->tokenService->guardarEnCookie($token);
    
            return response()->json([
                'status' => 'success',
                'redirect' => route('usuario.index'),
            ])->withCookie($cookie);
    
        } catch (\Exception $e) {
            Log::error('Error de autenticación:', ['message' => $e->getMessage()]);
    
            return response()->json([
                'status' => 'error',
                'errors' => ['authentication' => $e->getMessage()],
            ],422);
        }
    }

    /**
     * Cierra todas las sesiones activas del usuario en SQL Server.
     */
    public function closeSessions()
    {
        try {
            $username = Session::get('sql_username');
            if (!$username) {
                return back()->withErrors(['message' => 'No autorizado.']);
            }

            // Cerrar sesiones activas
            $this->sqlPasswordService->closeUserSessions($username);

            return redirect()->route('sqlpassword.success');
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Error al cerrar las sesiones: ' . $e->getMessage()]);
        }
    }

    public function forgotPassword(SQLPasswordRequest $request)
    {
   
        $identifier = $request->input('identifier');


        try {
            // Generar el token
      
            $token = $this->sqlPasswordService->generateResetToken($identifier);
              // Crear el enlace de restablecimiento
            // Crear el enlace de restablecimiento
            $resetLink = url("/reset-password?token={$token}");

            // Enviar el correo utilizando EmailService
            $this->emailService->enviarCorreoRecuperacion($identifier, $resetLink);

      
            return response()->json(['message' => 'Correo de recuperación enviado.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

}
