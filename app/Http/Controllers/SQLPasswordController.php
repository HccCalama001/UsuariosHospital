<?php
namespace App\Http\Controllers;

use App\Http\Requests\SQLPasswordRequest;
use App\Services\SQLPasswordService;
use App\Services\TokenService;
use App\Services\UsuarioService;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
class SQLPasswordController extends Controller
{
    protected $sqlPasswordService;
    protected $tokenService;
    protected $usuarioService;

    public function __construct(SQLPasswordService $sqlPasswordService, TokenService $tokenService, UsuarioService $usuarioService)
    {
        $this->sqlPasswordService = $sqlPasswordService;
        $this->tokenService = $tokenService;
        $this->usuarioService = $usuarioService;
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
            
                $cookie = cookie('auth_token', $token, 10, '/', null, false, false, false, 'Lax');
            
                return response()->json([
                    'status' => 'success',
                    'redirect' => route('usuario.completarDatos'),
                ])->withCookie($cookie);
            }
    
            // Usuario existente
            $user = $this->usuarioService->buscarUsuarioExistente($request->username);
            $token = $this->tokenService->generateFullToken($user);
            $cookie = cookie('auth_token', $token, 120, '/', null, false, false, false, 'Lax');
    
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
}
