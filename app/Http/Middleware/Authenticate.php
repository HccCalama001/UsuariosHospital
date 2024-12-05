<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (!$request->expectsJson()) {
            return route('sqlpassword.login'); // Ruta a la página de login
        }
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Obtener el token desde el encabezado Authorization o la cookie
        $token = $request->bearerToken() ?? $request->cookie('auth_token');
    
        if (!$token) {
            // Si no hay token, redirigir al login
            if (!$request->expectsJson()) {
                return redirect()->route('sqlpassword.login');
            }
    
            return response()->json(['message' => 'Token no encontrado.'], 401);
        }
    
        try {
            // Validar el token JWT
            $user = JWTAuth::setToken($token)->authenticate();
    
            if (!$user) {
                return response()->json(['message' => 'Token inválido.'], 401);
            }
    
            // El usuario está autenticado, agregarlo al request
            $request->merge(['user' => $user]);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Error con el token: ' . $e->getMessage()], 401);
        }
    
        // Continuar con la solicitud
        return $next($request);
    }
    
}
