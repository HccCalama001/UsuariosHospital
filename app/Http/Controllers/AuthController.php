<?php
namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Services\EmailService;
use App\Services\AuthService;
use App\Services\TokenService;
use App\Services\UsuarioService;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;


class AuthController extends Controller
{
    protected $AuthService;
    protected $tokenService;
    protected $usuarioService;
    protected $emailService;

    public function __construct(AuthService $AuthService, TokenService $tokenService, UsuarioService $usuarioService, EmailService $emailService)
    {
        $this->AuthService = $AuthService;
        $this->tokenService = $tokenService;
        $this->usuarioService = $usuarioService;
        $this->emailService = $emailService;
    }
    /**
     * Muestra la vista de inicio de sesión.
     */
    public function index()
    {
        return Inertia::render('auth/SQLLogin', [
            'csrfToken' => csrf_token(), 
        ]);
    }
     // Mostrar el formulario de recuperación de contraseña
     public function showForgotPasswordForm()
     {
         return Inertia::render('auth/ForgotPassword',[
            'csrfToken' => csrf_token(), 
        ]);
     }
    /**
     * Mostrar la vista de verificación de código.
     *
     * @return \Inertia\Response
     */
    public function showVerifyCode()
    {
        return Inertia::render('auth/VerifyCode',[
            'csrfToken' => csrf_token(), 
        ]);
    }
    /**
     * Manejar la verificación del código.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handleVerifyCode(AuthRequest $request)
    {
        try {
            $token = $this->AuthService->verifyCodeAndToken($request->code);
            // Crear una cookie segura con el token
            $cookie = $this->tokenService->guardarEnCookieReset($token, 15);
            // Respuesta JSON con el estado y adjuntando la cookie
            return response()->json([
                'message' => 'Código verificado con éxito',
                'redirect' => '/auth/change-password',
            ])->withCookie($cookie);
        } catch (\Exception $e) {
            return response()->json([
                'errors' => ['code' => $e->getMessage()],
            ], 422);
        }
    }

    public function showChangePassword()
    {
        $token = request()->cookie('reset_token');
        return Inertia::render('auth/ChangePassword', [
            'token' => $token,
            'csrfToken' => csrf_token(), // Enviar el token CSRF
        ]);
        
    }
    

    public function authenticate(AuthRequest $request)
    {
        try {
    
            $this->AuthService->authenticateUser($request->username, $request->current_password);
    
            $usuarioData = $this->usuarioService->buscarUsuarioResumen($request->username);
            log::info('Usuario nuevo o temporal' , $usuarioData);
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
            $this->AuthService->closeUserSessions($username);

            return redirect()->route('sqlpassword.success');
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Error al cerrar las sesiones: ' . $e->getMessage()]);
        }
    }

    public function forgotPassword(AuthRequest $request)
    {
        $identifier = $request->input('identifier');
    
        try {
            // Generar el token y obtener el correo del usuario
            $data = $this->AuthService->generateResetToken($identifier);
    
            $codAleatorio = $data['codAleatorio'];
            $email = $data['email'];
            $resetLink = url("/auth/verify-code");

            // Enviar el correo utilizando EmailService
            $this->emailService->enviarCorreoRecuperacion($email, $resetLink, $codAleatorio);
        } catch (\Exception $e) {
            // No hacer nada específico aquí, pero podrías registrar el error
            Log::error('Error en forgotPassword:', ['message' => $e->getMessage()]);
        }
    
        // Respuesta genérica para evitar exposición de datos
        return response()->json(['message' => 'Si los datos proporcionados son válidos, se enviará un correo con las instrucciones.'], 200);
    }
    
    public function resetPassword(ResetPasswordRequest $request)
    {
        $token = $request->input('token');
        $newPassword = $request->input('new_password');
    
        try {
            $response = $this->AuthService->ResetPassword($token, $newPassword);
            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al cambiar la contraseña.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    

}
