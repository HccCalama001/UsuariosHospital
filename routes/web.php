<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SQLPasswordController;
use App\Http\Controllers\UsuarioController;

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
    });

    // Rutas relacionadas con el cambio de contraseña SQL
    Route::prefix('sql')->group(function () {
        Route::get('/change-password', [SQLPasswordController::class, 'indexChange'])->name('sqlpassword.change');
        Route::post('/update-password', [SQLPasswordController::class, 'updatePassword'])->name('sqlpassword.update');
        Route::get('/success', fn() => Inertia::render('changePassword/SQLPasswordSuccess'))->name('sqlpassword.success');
        Route::post('/close-sessions', [SQLPasswordController::class, 'closeSessions'])->name('sqlpassword.closeSessions');
        Route::get('/loading', fn() => Inertia::render('changePassword/SQLLoading'))->name('sqlpassword.loading');
    });
});
