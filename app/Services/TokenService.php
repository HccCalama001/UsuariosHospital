<?php

namespace App\Services;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Illuminate\Support\Facades\Cookie;

class TokenService
{
    /**
     * Valida un token JWT y devuelve el usuario autenticado.
     *
     * @param string $token
     * @return mixed
     * @throws \Exception
     */
    public function validateToken(string $token)
    {
        try {
            return JWTAuth::setToken($token)->authenticate();
        } catch (\Exception $e) {
            throw new \Exception('Token inválido o expirado.');
        }
    }

    /**
     * Genera un token temporal con datos personalizados.
     *
     * @param array $claims
     * @return string
     */
    public function generateTemporaryToken(array $claims): string
    {
        // Verificar si existe la clave JWT_SECRET
        $jwtSecret = config('jwt.secret');
        if (!$jwtSecret) {
            throw new \Exception('JWT_SECRET no está configurado en el archivo .env.');
        }
    
    
        // Claims requeridos
        $requiredClaims = [
            'sub' => $claims['username'] ?? 'guest', // Usuario o un identificador genérico
            'iat' => now()->timestamp, // Fecha de emisión
            'exp' => now()->addMinutes(15)->timestamp, // Fecha de expiración
        ];
    
        // Combina los claims proporcionados con los obligatorios
        $claims = array_merge($requiredClaims, $claims);
    
        // Genera el payload y crea el token
        $payload = JWTFactory::customClaims($claims)->make();
        
    
        return JWTAuth::encode($payload)->get();
    }
    

    /**
     * Genera un token completo para un usuario.
     *
     * @param mixed $user
     * @return string
     */
    public function generateFullToken($user): string
    {

        return JWTAuth::claims([
  
        ])->fromUser($user);
    }

        /**
     * Guarda el token en una cookie.
     *
     * @param string $token El token que se guardará.
     * @param int $minutes Duración de la cookie en minutos.
     * @return \Symfony\Component\HttpFoundation\Cookie
     */
    public function guardarEnCookie(string $token, int $minutes = 120)
    {
        return cookie('auth_token', $token, $minutes, '/', null, false, false, false, 'Lax');
    }

            /**
     * Guarda el token en una cookie.
     *
     * @param string $token El token que se guardará.
     * @param int $minutes Duración de la cookie en minutos.
     * @return \Symfony\Component\HttpFoundation\Cookie
     */
    public function guardarEnCookieReset(string $token, int $minutes = 30)
    {
        return cookie('reset_token', $token, $minutes, '/', null, false, false, false, 'Lax');
    }

      /**
     * Decodifica el token almacenado en la cookie.
     *
     * @return array|null
     */
    public function decodeTokenFromCookie(): ?array
    {
        // Obtén el token desde la cookie
        $token = Cookie::get('auth_token');
    
        if (!$token) {
            \Log::error('La cookie auth_token no está presente.');
            return null; // No hay token en la cookie
        }
        \Log::error('La si');
        try {
            // Decodifica el token usando JWTAuth
            $decoded = JWTAuth::setToken($token)->getPayload()->toArray();
            return $decoded; // Devuelve el contenido del token como array
        } catch (\Exception $e) {
            // Maneja errores de decodificación
            \Log::error('Error al decodificar el token: ' . $e->getMessage());
            return null;
        }
    }
    
}
