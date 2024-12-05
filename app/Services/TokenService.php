<?php

namespace App\Services;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;

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
            \Log::error('JWT_SECRET no está configurado.');
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
        return JWTAuth::fromUser($user);
    }
}
