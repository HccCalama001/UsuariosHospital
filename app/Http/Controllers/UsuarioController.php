<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\UsuarioRequest;
use App\Services\AuthService;
use App\Services\SistemaService;
use App\Services\TokenService;
use App\Services\UsuarioService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Class UsuarioController
 *
 * Controlador encargado de la gestión de datos de usuarios y operaciones relacionadas,
 * incluyendo la visualización de perfil, actualización de datos y cambio de contraseña.
 */
class UsuarioController extends Controller
{
    /**
     * @var UsuarioService
     */
    protected UsuarioService $usuarioService;

    /**
     * @var TokenService
     */
    protected TokenService $tokenService;

    /**
     * @var SistemaService
     */
    protected SistemaService $sistemaService;

    /**
     * @var AuthService
     */
    protected AuthService $authService;

    /**
     * UsuarioController constructor.
     *
     * @param  UsuarioService  $usuarioService
     * @param  TokenService    $tokenService
     * @param  SistemaService  $sistemaService
     * @param  AuthService     $authService
     */
    public function __construct(
        UsuarioService $usuarioService,
        TokenService $tokenService,
        SistemaService $sistemaService,
        AuthService $authService
    ) {
        $this->usuarioService = $usuarioService;
        $this->tokenService = $tokenService;
        $this->sistemaService = $sistemaService;
        $this->authService = $authService;
    }

    /**
     * Muestra el perfil del usuario autenticado.
     *
     * @return Response|RedirectResponse
     */
    public function index()
    {
        try {
            $token = request()->cookie('auth_token');

            if (!$token) {
                return redirect()
                    ->route('sqlpassword.login')
                    ->withErrors(['message' => 'Por favor, inicie sesión.']);
            }

            // Validar el token y obtener el usuario autenticado
            $user = $this->tokenService->validateToken($token);

            if (!$user) {
                return redirect()
                    ->route('sqlpassword.login')
                    ->withErrors(['message' => 'Usuario no encontrado.']);
            }

            // Obtener un resumen del usuario
            $resumen = $this->usuarioService->buscarUsuarioResumen($user->NombreUsuario);

            // 2) Aquí mandas a tu servicio (o controlador) de sistemas la parte del JSON con los sistemas
            //    para que te devuelva un array (o colección) con la información de los grupos
            $gruposDelUsuario = $this->sistemaService->obtenerUsuarioGrupos($resumen);

            return Inertia::render('usuario/Index', [
                'user'             => $this->usuarioService->formatUserData($user),
                'resumen'          => $resumen,
                'gruposDelUsuario' => $gruposDelUsuario,
            ]);
        } catch (\Exception $e) {
            return redirect()
                ->route('sqlpassword.login')
                ->withErrors(['message' => $e->getMessage()]);
        }
    }

    /**
     * Muestra el formulario para resetear la contraseña.
     *
     * @param  Request  $request
     * @return Response|RedirectResponse
     */
    public function showResetPasswordForm(Request $request)
    {
        $token = $request->query('token');

        if (!$token) {
            return redirect()
                ->route('sqlpassword.login')
                ->withErrors(['message' => 'Token no válido o expirado.']);
        }

        return Inertia::render('usuario/ResetPassword', [
            'token'     => $token,
        ]);
    }

    /**
     * Busca información de un usuario a partir del nombre de usuario.
     *
     * @param  UsuarioRequest  $request
     * @return JsonResponse
     */
    public function buscarUsuario(UsuarioRequest $request): JsonResponse
    {
        $resumen = $this->usuarioService->buscarUsuarioResumen($request->nameuser);

        return response()->json($resumen);
    }

    /**
     * Muestra la vista para que el usuario complete sus datos.
     *
     * @return Response
     */
    public function completarDatos(): Response
    {
  
        $tokenData = $this->tokenService->decodeTokenFromCookie();

  
        if (!$tokenData) {
            \Log::error('El token decodificado es inválido o está vacío.');
        }
    
     
    
        return Inertia::render('usuario/CompletarDatos', [
            'userLogin'        => $tokenData['userLogin'] ?? null,
            'current_password' => $tokenData['current_password'] ?? null,
        ]);
    }

    /**
     * Guarda los datos del usuario que fueron completados.
     *
     * @param  UsuarioRequest  $request
     * @return JsonResponse
     */
    public function guardarDatos(UsuarioRequest $request): JsonResponse
    {
        try {
            log::info($request->all());
            // Validar los datos del request
            $validatedData = $request->validated();

            // Guardar los datos utilizando el servicio correspondiente
            $user = $this->usuarioService->guardarDatos($validatedData);

            // Generar el token completo para el usuario creado/actualizado
            $token = $this->tokenService->generateFullToken($user);

            return response()->json([
                'message' => 'Datos completados correctamente.',
                'token'   => $token,
                'user'    => $user,
            ], 201);
        } catch (ValidationException $e) {
            // Capturar los errores de validación y enviarlos al cliente
            return response()->json([
                'message' => 'Errores de validación.',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            // Manejo de cualquier otro tipo de error
            return response()->json([
                'message' => 'Error al completar los datos.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Cambia la contraseña del usuario autenticado.
     *
     * @param  ChangePasswordRequest  $request
     * @return JsonResponse
     */
    public function cambiarContrasena(ChangePasswordRequest $request): JsonResponse
    {
        try {
            // Validar que la contraseña actual coincida
            $validateUser = $this->authService->authenticateUser(
                auth()->user()->NombreUsuario,
                $request->current_password
            );

            if (!$validateUser) {
                return response()->json([
                    'message' => 'Contraseña actual incorrecta.',
                ], 422);
            }

            // Llamar al servicio para cambiar la contraseña
            $response = $this->usuarioService->cambiarContrasena(
                auth()->user()->NombreUsuario,
                $request->validated()
            );

            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al cambiar la contraseña.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Actualiza los datos del usuario globalmente (sistema nuevo y antiguo).
     *
     * @param  UsuarioRequest  $request
     * @return JsonResponse
     */
    public function actualizarUsuarioGlobal(UsuarioRequest $request): JsonResponse
    {
        // Se asume que en el request se recibe un campo `userLogin` con el usuario a actualizar
        $username = $request->input('userLogin');

        // Mapeo de las reglas del request a los campos que el servicio necesita
        $datos = [
            'Nombre'           => $request->input('name'),
            'ApellidoPaterno'  => $request->input('apellido_paterno'),
            'ApellidoMaterno'  => $request->input('apellido_materno'),
            'Rut'              => $request->input('rut'),
            'EmailUsuario'     => $request->input('email'),
            'NumeroTelefono'   => $request->input('phone'),
            // Agregar más campos si es necesario (ej. contraseña)
        ];

        // Llamar al servicio para actualizar globalmente
        $this->usuarioService->actualizarUsuarioGlobal($username, $datos);

        return response()->json([
            'message' => 'Usuario actualizado correctamente.',
        ], 200);
    }

    /**
     * Retorna el nombre completo de un usuario dado su nombre de usuario.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function obtenerNombreCompleto(Request $request): JsonResponse
    {
        try {
            $username = $request->input('username');
            $nombreCompleto = $this->usuarioService->obtenerNombreCompleto($username);

            return response()->json([
                'success'         => true,
                'nombre_completo' => $nombreCompleto,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 404);
        }
    }

    public function obtenerGrupos(Request $request)
    {
        try {
            // 1. Extraemos el user ID del token
            //    Asumiendo que ya tienes un middleware que hace JWTAuth::authenticate()
            //    y te da un $request->user() con los datos
            $authUser = $request->user(); // o JWTAuth::parseToken()->authenticate();

            // 2. Obtener el "resumen" del usuario
            $resumen = $this->usuarioService->buscarUsuarioResumen($authUser->NombreUsuario);

            // 3. Obtener los grupos
            $gruposDelUsuario = $this->sistemaService->obtenerUsuarioGrupos($resumen);

            // 4. Retornar la lista de grupos en JSON
            return response()->json([
                'status' => 'success',
                'grupos' => $gruposDelUsuario,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
