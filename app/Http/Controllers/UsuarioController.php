<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\TokenService;
use App\Services\UsuarioService;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\UsuarioRequest;
use Illuminate\Support\Facades\Session;
use App\Http\Requests\ChangePasswordRequest;
use Illuminate\Validation\ValidationException;

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
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al cambiar la contraseña.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Actualiza los datos del usuario globalmente, tanto en el sistema nuevo como en el antiguo.
     *
     * @param UsuarioRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function actualizarUsuarioGlobal(UsuarioRequest $request)
    {
        // Aquí asumes que en el request se recibe un campo `user_id` que indica el ID del usuario a actualizar
        $username = $request->input('userLogin');
        // Mapeas las reglas del request a los campos que tu servicio necesita
        $datos = [
            'Nombre' => $request->input('name'),
            'ApellidoPaterno' => $request->input('apellido_paterno'),
            'ApellidoMaterno' => $request->input('apellido_materno'),
            'Rut' => $request->input('rut'), // Opcional si quieres permitir actualizar RUT
            'EmailUsuario' => $request->input('email'),
            'NumeroTelefono' => $request->input('phone'),
            // Si quisieras actualizar contraseña u otros campos, agrégalos aquí
        ];

        // Llamamos al servicio para actualizar globalmente
        $this->usuarioService->actualizarUsuarioGlobal($username, $datos);

        return response()->json(['message' => 'Usuario actualizado correctamente.'], 200);
    }

    public function obtenerNombreCompleto(Request $request)
    {
        try {
            $username = $request->input('username');
            Log::info('Buscando nombre completo para: ' . $username);

            $nombreCompleto = $this->usuarioService->obtenerNombreCompleto($username);

            return response()->json([
                'success' => true,
                'nombre_completo' => $nombreCompleto,
            ]);
        } catch (\Exception $e) {
            Log::error('Error al obtener nombre completo: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 404);
        }
    }
}
