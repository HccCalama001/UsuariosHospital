<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Services\AuthService;
use App\Services\EmailService;
use App\Services\SistemaService;
use App\Services\TokenService;
use App\Services\UsuarioService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Class AuthController
 *
 * Controlador responsable del proceso de autenticación y recuperación de contraseña.
 */
class AuthController extends Controller
{
    /**
     * @var AuthService
     */
    protected AuthService $authService;
        /**
     * @var SistemaService
     */
    protected SistemaService $sistemaService;


    /**
     * @var TokenService
     */
    protected TokenService $tokenService;

    /**
     * @var UsuarioService
     */
    protected UsuarioService $usuarioService;

    /**
     * @var EmailService
     */
    protected EmailService $emailService;

    /**
     * AuthController constructor.
     *
     * @param  AuthService    $authService
     * @param  TokenService   $tokenService
     * @param  UsuarioService $usuarioService
     * @param  EmailService   $emailService
     */
    public function __construct(
        AuthService $authService,
        TokenService $tokenService,
        UsuarioService $usuarioService,
        EmailService $emailService,
        SistemaService $sistemaService
    ) {
        $this->authService = $authService;
        $this->tokenService = $tokenService;
        $this->usuarioService = $usuarioService;
        $this->emailService = $emailService;
        $this->sistemaService = $sistemaService;
    }

    /**
     * Muestra la vista de inicio de sesión.
     *
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('auth/SQLLogin', [
            
        ]);
    }

    /**
     * Muestra el formulario para recuperación de contraseña.
     *
     * @return Response
     */
    public function showForgotPasswordForm(): Response
    {
        return Inertia::render('auth/ForgotPassword', [
        ]);
    }

    /**
     * Muestra la vista de verificación de código.
     *
     * @return Response
     */
    public function showVerifyCode(): Response
    {
        return Inertia::render('auth/VerifyCode', [
        ]);
    }

    /**
     * Maneja la verificación de código y token.
     *
     * @param  AuthRequest  $request
     * @return JsonResponse
     */
    public function handleVerifyCode(AuthRequest $request): JsonResponse
    {
        try {
            $token = $this->authService->verifyCodeAndToken($request->code);

            // Crear una cookie segura con el token
            $cookie = $this->tokenService->guardarEnCookieReset($token, 15);

            // Respuesta JSON con el estado y adjuntando la cookie
            return response()
                ->json([
                    'message'  => 'Código verificado con éxito',
                    'redirect' => '/auth/change-password',
                ])
                ->withCookie($cookie);
        } catch (\Exception $e) {
            return response()->json([
                'errors' => [
                    'code' => $e->getMessage(),
                ],
            ], 422);
        }
    }

    /**
     * Muestra la vista de cambio de contraseña.
     *
     * @return Response
     */
    public function showChangePassword(): Response
    {
        $token = request()->cookie('reset_token');

        return Inertia::render('auth/ChangePassword', [
            'token'     => $token
        ]);
    }

    /**
     * Maneja la autenticación del usuario.
     *
     * @param  AuthRequest  $request
     * @return JsonResponse
     */
    public function authenticate(AuthRequest $request): JsonResponse
    {
        try {
            $this->authService->authenticateUser($request->username, $request->current_password);
            $usuarioData = $this->usuarioService->buscarUsuarioResumen($request->username);

            // Usuario nuevo o temporal
            if (is_null($usuarioData['userNew'])) {
                $token = $this->tokenService->generateTemporaryToken([
                    'username'         => $request->username,
                    'temporary'        => true,
                    'userLogin'        => $usuarioData,
                    'current_password' => $request->current_password,
                ]);
            
                $cookie = $this->tokenService->guardarEnCookie($token);
            
                return response()
                    ->json([
                        'status'   => 'success',
                        'redirect' => route('usuario.completarDatos'),
                    ])
                    ->withCookie($cookie);
            }
            // Usuario existente
            $user   = $this->usuarioService->buscarUsuarioExistente($request->username);
    
            // 3. Generar un token minimalista
            $token = $this->tokenService->generateFullToken($user);

            // 4. Guardar el token en la cookie
            $cookie = $this->tokenService->guardarEnCookie($token);

            return response()
                ->json([
                    'status'   => 'success',
                    'redirect' => route('usuario.index'),
                ])
                ->withCookie($cookie);
        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'errors' => [
                    'authentication' => $e->getMessage(),
                ],
            ], 422);
        }
    }

    /**
     * Cierra todas las sesiones activas del usuario en SQL Server.
     *
     * @return RedirectResponse
     */
    public function closeSessions(): RedirectResponse
    {
        try {
            $username = Session::get('sql_username');

            if (!$username) {
                return back()->withErrors(['message' => 'No autorizado.']);
            }

            // Cerrar sesiones activas
            $this->authService->closeUserSessions($username);

            return redirect()->route('sqlpassword.success');
        } catch (\Exception $e) {
            return back()->withErrors([
                'message' => 'Error al cerrar las sesiones: ' . $e->getMessage(),
            ]);
        }
    }

    /**
     * Maneja la generación de token y envío de correo para recuperación de contraseña.
     *
     * @param  AuthRequest  $request
     * @return JsonResponse
     */
    public function forgotPassword(AuthRequest $request): JsonResponse
    {
        $identifier = $request->input('identifier');

        try {
            // Generar el token y obtener el correo del usuario
            $data = $this->authService->generateResetToken($identifier);

            $codAleatorio = $data['codAleatorio'];
            $email        = $data['email'];
            $resetLink    = url('/auth/verify-code');

            // Enviar el correo utilizando EmailService
            $this->emailService->enviarCorreoRecuperacion($email, $resetLink, $codAleatorio);
        } catch (\Exception $e) {
            // Se puede registrar el error si se desea
        }

        // Respuesta genérica para evitar exposición de datos
        return response()->json([
            'message' => 'Si los datos proporcionados son válidos, se enviará un correo con las instrucciones.',
        ], 200);
    }

    /**
     * Maneja el reseteo de contraseña del usuario.
     *
     * @param  ResetPasswordRequest  $request
     * @return JsonResponse
     */
    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $token       = $request->input('token');
        $newPassword = $request->input('new_password');

        try {
            $response = $this->authService->ResetPassword($token, $newPassword);

            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al cambiar la contraseña.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
