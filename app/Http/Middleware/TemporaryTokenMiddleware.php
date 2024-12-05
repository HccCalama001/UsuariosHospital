<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class TemporaryTokenMiddleware
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

    public function handle($request, Closure $next)
    {
        \Log::info('Middleware TemporaryTokenMiddleware ejecutado');
        
        $token = $request->bearerToken() ?? $request->cookie('auth_token');
        if (!$token) {
            // Si no hay token, redirigir al login
            if (!$request->expectsJson()) {
                return redirect()->route('sqlpassword.login');
            }
    
            return response()->json(['message' => 'Token no encontrado.'], 401);
        }
    
        try {
            $decoded = JWTAuth::setToken($token)->getPayload();
           
    
            if (!$decoded->get('temporary', false)) {
                
                return redirect()->route('sqlpassword.login');
            }
    
            $request->merge(['temporary_data' => $decoded->toArray()]);
           
        } catch (\Exception $e) {
        
            return response()->json(['message' => 'Error con el token: ' . $e->getMessage()], 401);
        }
    
        return $next($request);
    }
}
