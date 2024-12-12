<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsuarioController;


// Ruta raíz que redirige a /sql/login
Route::get('/', function () {
    return redirect()->route('sqlpassword.login');
});



// Rutas públicas (sin autenticación JWT)
Route::prefix('auth')->group(function () {
    Route::get('/login', [AuthController::class, 'index'])->name('sqlpassword.login');
    Route::post('/authenticate', [AuthController::class, 'authenticate'])->name('sqlpassword.authenticate');
    Route::get('/forgot-password', [AuthController::class, 'showForgotPasswordForm'])->name('forgot-password');
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->name('sqlpassword.forgot');
    Route::get('/verify-code', [AuthController::class, 'showVerifyCode'])->name('verify-code');
    Route::post('/verify-code', [AuthController::class, 'verifyCode']);

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

});





