<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    protected $middleware = [
        \App\Http\Middleware\TrustProxies::class,
        \Fruitcake\Cors\HandleCors::class,
        \App\Http\Middleware\PreventRequestsDuringMaintenance::class,
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        \App\Http\Middleware\TrimStrings::class,
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
    ];

    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
            \Fruitcake\Cors\HandleCors::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
            'throttle:api',
            \Tymon\JWTAuth\Http\Middleware\Authenticate::class,
        ],
    ];

    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'temporaryToken' => \App\Http\Middleware\TemporaryTokenMiddleware::class,
        'validate.reset.token' => \App\Http\Middleware\ValidateResetToken::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'jwt.refresh' => \Tymon\JWTAuth\Http\Middleware\RefreshToken::class,
        'guest.check' => \App\Http\Middleware\CheckGuest::class,
    ];
}
