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
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Token no encontrado.'], 401);
            }
            return redirect()->route('sqlpassword.login');
        }
    
        try {
            // Validar el token usando el guard unificado `web`
            $user = auth('web')->setToken($token)->authenticate();
    
            if (!$user) {
                if ($request->expectsJson()) {
                    return response()->json(['message' => 'Token inválido.'], 401);
                }
                return redirect()->route('sqlpassword.login');
            }
    
            // Registrar el usuario en el contexto de autenticación
            auth('web')->login($user);
    
            // También puedes registrar al usuario en el request para uso adicional
            $request->merge(['user' => $user]);
    
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Token inválido o expirado.'], 401);
            }
            return redirect()->route('sqlpassword.login');
        }
    
        return $next($request);
    }
    
    
}
