<?php
return [
    'paths' => ['api/*', 'login', 'logout', 'guardar-datos'], // Rutas habilitadas para CORS
    'allowed_methods' => ['*'],
    'allowed_origins' => ['*'], // Cambia esto según tu dominio
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // Habilita el uso de cookies
];
