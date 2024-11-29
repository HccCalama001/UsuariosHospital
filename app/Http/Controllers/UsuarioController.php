<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ServidorNew\User;
use App\Models\ServidorOld\UsuarioLogin;
use App\Models\ServidorOld\UsuarioServicio;
use App\Models\ServidorOld\ServicioProfesional;

class UsuarioController extends Controller
{
    public function buscarUsuario(Request $request)
    {
        // Validar que el parámetro 'nameuser' esté presente
        $request->validate([
            'nameuser' => 'required|string',
        ]);

        $query = $request->input('nameuser'); // Nombre de usuario o RUT

        // Inicializar variables para cada fuente de datos
        $userNew = null;
        $userLogin = null;
        $userServicio = null;
        $userProfesional = null;

        // Buscar en la base de datos nueva (User)
        $userNew = User::with([
            'rol',
            'login.roleUserSistema.role',
            'login.roleUserSistema.sistema',
            'sistemas.sistemaSalud',
            'rolesSistema.role',
            'rolesSistema.sistema',
            'servicio',
            'profesional.tipoProfesional',
        ])
            ->where('NombreUsuario', $query)
            ->orWhere('Rut', $query)
            ->first();

        // Buscar en UsuarioLogin
        $userLogin = UsuarioLogin::with([
            'seguUsuario.servicioProfesional.tipoProfesional',
            'authRememberToken',
            'roleUserSistema.role',
            'roleUserSistema.sistema',
            'usuarioSistema.sistemaSalud',
        ])
            ->where('name', $query)
            ->first();

        // Buscar en UsuarioServicio
        $userServicio = UsuarioServicio::with([
            'servicioProfesional.tipoProfesional',
            'sysSqlLogin',
        ])
            ->where('Segu_Usr_Cuenta', $query)
            ->orWhere('Segu_Usr_RUT', $query)
            ->first();

        // Buscar en ServicioProfesional
        if ($userServicio) {
            // Si se encuentra en UsuarioServicio, usar el RUT para buscar en ServicioProfesional
            $rut = $userServicio->Segu_Usr_RUT; // Extraemos el RUT
        } else {
            // Si no se encuentra en UsuarioServicio, asumir que $query ya es un RUT válido
            $rut = $query;
        }
        
        // Buscar en ServicioProfesional usando el RUT obtenido o proporcionado
        $userProfesional = ServicioProfesional::with([
            'tipoProfesional',
            'usuarioServicio',
        ])
            ->where('SER_PRO_Rut', $rut)
            ->first();

        // Si no se encontró en ServicioProfesional pero tenemos el RUT de UsuarioServicio
        if (!$userProfesional && $userServicio) {
            $rutFromUserServicio = $userServicio->Segu_Usr_RUT;
            if ($rutFromUserServicio) {
                $userProfesional = ServicioProfesional::with([
                    'tipoProfesional',
                    'usuarioServicio',
                ])
                    ->where('SER_PRO_Rut', $rutFromUserServicio)
                    ->first();
            }
        }

        // Verificar si no se encontró en ninguna base de datos
        if (!$userNew && !$userLogin && !$userServicio && !$userProfesional) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Construir los datos de cada fuente

        // Datos del usuario de la base de datos nueva (User)
        $userNewData = null;
        if ($userNew) {
            $userNewArray = $userNew->toArray();
            // Excluir campos sensibles
            unset($userNewArray['password'], $userNewArray['remember_token']);
            $userNewData = $userNewArray;
        }

        // Datos del usuario de UsuarioLogin
        $userLoginData = null;
        if ($userLogin) {
            $userLoginArray = $userLogin->toArray();
            // Excluir campos sensibles o binarios
            unset($userLoginArray['sid'], $userLoginArray['password_hash']);
            $userLoginData = $userLoginArray;
        }

        // Datos del usuario de UsuarioServicio
        $userServicioData = null;
        if ($userServicio) {
            $userServicioData = $userServicio->toArray();
        }

        // Datos del usuario de ServicioProfesional
        $userProfesionalData = null;
        if ($userProfesional) {
            $userProfesionalData = $userProfesional->toArray();
        }

        // Construir el resumen general
        $resumen = [
            'userNew' => $userNewData,
            'userLogin' => $userLoginData,
            'userServicio' => $userServicioData,
            'userProfesional' => $userProfesionalData,
        ];

        return response()->json($resumen);
    }
}
