<?php

use Inertia\Inertia;
use App\Http\Controllers\SQLPasswordController;
use App\Http\Controllers\UsuarioController;

Route::get('/sql-login', [SQLPasswordController::class, 'index'])->name('sqlpassword.login');
Route::post('/sql-authenticate', [SQLPasswordController::class, 'authenticate'])->name('sqlpassword.authenticate');

Route::get('/sql-change-password', [SQLPasswordController::class, 'indexChange'])->name('sqlpassword.change');
Route::post('/sql-update-password', [SQLPasswordController::class, 'updatePassword'])->name('sqlpassword.update');

Route::get('/sql-success', fn() => inertia('changePassword/SQLPasswordSuccess'))->name('sqlpassword.success');

Route::post('/sql-close-sessions', [SQLPasswordController::class, 'closeSessions'])->name('sqlpassword.closeSessions');

Route::get('/sql-loading', fn() => inertia('changePassword/SQLLoading'))->name('sqlpassword.loading');

Route::get('/completar-datos', [UsuarioController::class, 'completarDatos'])->name('completarDatos');
Route::post('/guardar-datos', [UsuarioController::class, 'guardarDatos'])->name('guardarDatos');
