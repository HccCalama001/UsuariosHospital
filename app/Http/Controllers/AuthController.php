<?php
namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Services\EmailService;
use App\Services\AuthService;
use App\Services\TokenService;
use App\Services\UsuarioService;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;



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
        return Inertia::render('auth/VerifyCode');
    }

    /**
     * Verificar el código de recuperación.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function verifyCode(AuthRequest $request)
    {
      /*  $request->validate([
            'code' => 'required|string|max:10',
        ]);

        $resetEntry = DB::table('password_resets')
            ->where('codAleatorio', $request->code)
            ->first();

        if (!$resetEntry) {
            return response()->json([
                'message' => 'El código ingresado es inválido o ha expirado.',
            ], 400);
        }

        // Código válido, redirigir a la vista de cambio de contraseña
        return redirect()->route('password.change', ['code' => $request->code]); */
    }
 

    public function authenticate(AuthRequest $request)
    {
        try {
    
            $this->AuthService->authenticateUser($request->username, $request->current_password);
    
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
    
               // Crear el enlace de verificación
            $resetLink = url("/verify-code");

            // Enviar el correo utilizando EmailService
            $this->emailService->enviarCorreoRecuperacion($email, $resetLink, $codAleatorio);
        } catch (\Exception $e) {
            // No hacer nada específico aquí, pero podrías registrar el error
            Log::error('Error en forgotPassword:', ['message' => $e->getMessage()]);
        }
    
        // Respuesta genérica para evitar exposición de datos
        return response()->json(['message' => 'Si los datos proporcionados son válidos, se enviará un correo con las instrucciones.'], 200);
    }
    
    

    

}
