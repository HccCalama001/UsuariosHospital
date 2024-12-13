<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ValidateResetToken
{
    /**
     * Manejar una solicitud entrante.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->cookie('reset_token');

        log::info($token);

        if (!$token) {
            return redirect()->route('verify-code')->withErrors([
                'general' => 'El token no es válido o ha expirado.',
            ]);
        }

        // Si el token existe, continuar con la solicitud
        return $next($request);
    }
}
