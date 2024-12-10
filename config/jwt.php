<?php

/*
 * This file is part of jwt-auth.
 *
 * (c) Sean Tymon <tymon148@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

return [
    'secret' => env('JWT_SECRET'),
    'ttl' => 120, // Duración del token en minutos
    'refresh_ttl' => 20160, // Duración del token para refrescar (en minutos)
    'algo' => 'HS256',
    'required_claims' => ['iss', 'iat', 'exp', 'nbf', 'sub', 'jti'],
    'blacklist_enabled' => true,
    'blacklist_grace_period' => 0,
    'providers' => [
        'jwt' => Tymon\JWTAuth\Providers\JWT\Namshi::class,
        'auth' => Tymon\JWTAuth\Providers\Auth\Illuminate::class,
        'storage' => Tymon\JWTAuth\Providers\Storage\Illuminate::class,
    ],
];
