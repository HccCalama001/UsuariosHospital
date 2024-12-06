<?php
namespace App\Http\Controllers;

use App\Http\Requests\UsuarioRequest;
use App\Services\UsuarioService;
use App\Services\TokenService;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\ChangePasswordRequest;

class UsuarioController extends Controller
{
    protected $usuarioService;
    protected $tokenService;

    public function __construct(UsuarioService $usuarioService, TokenService $tokenService)
    {
        $this->usuarioService = $usuarioService;
        $this->tokenService = $tokenService;
    }

    /**
     * Muestra el perfil del usuario autenticado.
     */
    public function index()
    {
        try {
            $token = request()->cookie('auth_token');
            if (!$token) {
                return redirect()->route('sqlpassword.login')->withErrors(['message' => 'Por favor, inicie sesión.']);
            }

            // Validar el token y obtener el usuario autenticado
            $user = $this->tokenService->validateToken($token);

            if (!$user) {
                return redirect()->route('sqlpassword.login')->withErrors(['message' => 'Usuario no encontrado.']);
            }

            $resumen = $this->usuarioService->buscarUsuarioResumen($user->NombreUsuario);

            return Inertia::render('usuario/Index', [
                'user' => $this->usuarioService->formatUserData($user),
                'resumen' => $resumen,
                'csrfToken' => csrf_token()
            ]);
        } catch (\Exception $e) {
            return redirect()->route('sqlpassword.login')->withErrors(['message' => $e->getMessage()]);
        }
    }

    /**
     * Busca información de un usuario.
     */
    public function buscarUsuario(UsuarioRequest $request)
    {
        $resumen = $this->usuarioService->buscarUsuarioResumen($request->nameuser);

        return response()->json($resumen);
    }

    /**
     * Muestra la vista para completar datos.
     */
    public function completarDatos()
    {
        $userLogin = session('userLogin');
        $currentPassword = session('current_password');

    
        return Inertia::render('usuario/CompletarDatos', [
            'userLogin' => $userLogin,
            'current_password' => $currentPassword,
            'csrfToken' => csrf_token(), // Incluir el token CSRF
        ]);
    }

    public function guardarDatos(UsuarioRequest $request)
    {
        try {
            // Validar los datos del request
            $validatedData = $request->validated();

            // Guardar los datos utilizando el servicio correspondiente
            $user = $this->usuarioService->guardarDatos($validatedData);

            // Generar el token completo para el usuario creado
            $token = $this->tokenService->generateFullToken($user);

            // Respuesta exitosa
            return response()->json([
                'message' => 'Datos completados correctamente.',
                'token' => $token,
                'user' => $user,
            ], 201);

        } catch (ValidationException $e) {
            // Captura los errores de validación y los envía al cliente
            Log::error('Errores de validación:', $e->errors());

            return response()->json([
                'message' => 'Errores de validación.',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            // Manejo de cualquier otro tipo de error
            Log::error('Error al completar los datos: ' . $e->getMessage());

            return response()->json([
                'message' => 'Error al completar los datos.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function cambiarContrasena(ChangePasswordRequest $request)
    {
        try {
       
            // Llamar al servicio para cambiar la contraseña
            $response = $this->usuarioService->cambiarContrasena(auth()->user()->NombreUsuario, $request->validated());

            return response()->json($response, 200);
        }  catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al cambiar la contraseña.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
