<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth; // si usas JWT

class CheckGuest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Obtener el token desde el encabezado Authorization o la cookie
        $token = $request->bearerToken() ?? $request->cookie('auth_token');

        // Si existe token, validarlo opcionalmente
        if ($token) {
            try {
                // Intentamos validar el token con el guard "web"
                $user = auth('web')->setToken($token)->authenticate();

                // Si el token es válido (user != null), redirigimos a /usuario
                if ($user) {
                    return redirect()->route('usuario.index');
                }

            } catch (\Exception $e) {
                // Si el token es inválido o expiró, puedes decidir:
                // - Omitir y continuar -> return $next($request);
                // - O redirigir a login
                // Aquí dejaremos que continúe como invitado.
            }

            // Si NO validaste el token y solo quieres checar si existe, 
            // podrías hacer directamente: return redirect()->route('usuario.index');
        }

        // Si no existe token (o no fue válido), dejar continuar
        return $next($request);
    }
}
