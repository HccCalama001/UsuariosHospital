<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/usuario/buscar', [UsuarioController::class, 'buscarUsuario'])->name('usuario.buscar');
Route::get('/usuario/buscar/detalle', [UsuarioController::class, 'obtenerNombreCompleto'])->name('usuario.detalle');

Route::get('/usuario/grupos', [UsuarioController::class, 'obtenerGrupos']);
