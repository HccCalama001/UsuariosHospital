<?php

use Inertia\Inertia;
use App\Http\Controllers\SQLPasswordController;

Route::get('/sql-login', [SQLPasswordController::class, 'index'])->name('sqlpassword.login');
Route::post('/sql-authenticate', [SQLPasswordController::class, 'authenticate'])->name('sqlpassword.authenticate');

Route::get('/sql-change-password', [SQLPasswordController::class, 'indexChange'])->name('sqlpassword.change');
Route::post('/sql-update-password', [SQLPasswordController::class, 'updatePassword'])->name('sqlpassword.update');

Route::get('/sql-success', fn() => inertia('SQLPasswordSuccess'))->name('sqlpassword.success');

Route::post('/sql-close-sessions', [SQLPasswordController::class, 'closeSessions'])->name('sqlpassword.closeSessions');

Route::get('/sql-loading', fn() => inertia('SQLLoading'))->name('sqlpassword.loading');
