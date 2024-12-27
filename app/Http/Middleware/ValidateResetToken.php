<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ValidateResetToken
{
    /**
     * Maneja una solicitud entrante.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->bearerToken() ?? $request->cookie('reset_token');
        // Normalizar y verificar si el token es vacío, nulo o la cadena 'null'
        if ($token === null || strtolower(trim($token)) === 'null' || trim($token) === '') {
            return redirect()->route('verify-code')->withErrors([
                'general' => 'El token no es válido o ha expirado.',
            ]);
        }

        // Si se considera válido, continuar con la solicitud
       
        return $next($request);
    }
}
