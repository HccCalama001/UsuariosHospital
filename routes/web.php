<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SQLPasswordController;
use App\Http\Controllers\UsuarioController;


// Ruta raíz que redirige a /sql/login
Route::get('/', function () {
    return redirect()->route('sqlpassword.login');
});

// Rutas públicas (sin autenticación JWT)
Route::prefix('sql')->group(function () {
    Route::get('/login', [SQLPasswordController::class, 'index'])->name('sqlpassword.login');
    Route::post('/authenticate', [SQLPasswordController::class, 'authenticate'])->name('sqlpassword.authenticate');
});

Route::middleware(['temporaryToken'])->group(function () {
    Route::get('/usuario/completar-datos', [UsuarioController::class, 'completarDatos'])->name('usuario.completarDatos');
    Route::post('/usuario/guardar-datos', [UsuarioController::class, 'guardarDatos'])->name('usuario.guardarDatos');
});

// Rutas protegidas (requieren autenticación JWT)
Route::middleware(['auth'])->group(function () {
    // Rutas relacionadas con el perfil del usuario
    Route::prefix('usuario')->group(function () {
        Route::get('/', [UsuarioController::class, 'index'])->name('usuario.index');
        Route::post('/buscar', [UsuarioController::class, 'buscarUsuario'])->name('usuario.buscarUsuario');
        Route::post('/cambiar-contrasena', [UsuarioController::class, 'cambiarContrasena']);
        Route::post('/actualizar-global', [UsuarioController::class, 'actualizarUsuarioGlobal'])->name('usuario.actualizarUsuarioGlobal');
        
    });

    // Rutas relacionadas con el cambio de contraseña SQL
    Route::prefix('sql')->group(function () {
        Route::post('/close-sessions', [SQLPasswordController::class, 'closeSessions'])->name('sqlpassword.closeSessions');
        Route::get('/loading', fn() => Inertia::render('changePassword/SQLLoading'))->name('sqlpassword.loading');
    });
});




Route::fallback(function () {
    return Inertia::render('ErrorPage', [
        'message' => 'La ruta solicitada no fue encontrada.',
    ]);
});