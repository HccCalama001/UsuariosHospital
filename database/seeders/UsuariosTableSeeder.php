<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsuariosTableSeeder extends Seeder
{
    protected $connection = 'sqlsrvUsers'; // Especifica la conexión si es necesaria
    protected $table = 'usuarios'; // Tabla objetivo

    public function run()
    {
        // Contraseña encriptada
        $hashedPassword = Hash::make('Calama1234.');
        $hashedPasswordS = Hash::make('010203.');

        // Inserción de datos en la tabla `usuarios`
        DB::connection($this->connection)->table($this->table)->insert([
            [
      
                'NombreUsuario' => 'velasquez',
                'EmailUsuario' => 'alejandra.velasquez@redsalud.gob.cl',
                'Rut' => '14586983-8',
                'password' => $hashedPassword,
                'RolID' => 1,
                'NumeroTelefono' => '599744',
                'Nombre' => 'Alejandra',
                'ApellidoPaterno' => 'Velasquez',
                'ApellidoMaterno' => null,
                'is_active' => true,
                'email_verified_at' => null,
                'created_at' => '2024-11-07 11:11:24.010',
                'updated_at' => '2024-12-10 16:20:54.737',
                'deleted_at' => null,
            ],
            [
            
                'NombreUsuario' => 'jaranda001',
                'EmailUsuario' => 'jean.aranda.s@redsalud.gob.cl',
                'Rut' => '19690677-0',
                'password' => $hashedPassword,
                'RolID' => 1,
                'NumeroTelefono' => '559742',
                'Nombre' => 'Jean',
                'ApellidoPaterno' => 'Aranda',
                'ApellidoMaterno' => null,
                'is_active' => true,
                'email_verified_at' => null,
                'created_at' => '2024-11-07 10:59:46.767',
                'updated_at' => '2024-11-28 15:50:22.657',
                'deleted_at' => null,
            ],
            [
          
                'NombreUsuario' => 'shuanca',
                'EmailUsuario' => 'sebastian.huanca.a@redsalud.gob.cl',
                'Rut' => '19463712-8',
                'password' =>  $hashedPasswordS,
                'RolID' => 1,
                'NumeroTelefono' => '559743',
                'Nombre' => 'Sebastian',
                'ApellidoPaterno' => 'Huanca',
                'ApellidoMaterno' => null,
                'is_active' => true,
                'email_verified_at' => null,
                'created_at' => '2024-11-07 11:00:22.143',
                'updated_at' => '2024-11-28 15:50:43.037',
                'deleted_at' => null,
            ],
            [
             
                'NombreUsuario' => 'lplaza',
                'EmailUsuario' => 'leando.plaza@redsalud.gob.cl',
                'Rut' => '21260927-7',
                'password' => $hashedPassword,
                'RolID' => 1,
                'NumeroTelefono' => '559929',
                'Nombre' => 'Leandro',
                'ApellidoPaterno' => 'Eade',
                'ApellidoMaterno' => null,
                'is_active' => true,
                'email_verified_at' => null,
                'created_at' => '2024-11-07 11:01:55.253',
                'updated_at' => '2024-12-02 14:16:56.850',
                'deleted_at' => null,
            ],
            [
        
                'NombreUsuario' => 'ctorres',
                'EmailUsuario' => 'cristian.torresm@redsalud.gob.cl',
                'Rut' => '17974505-4',
                'password' => $hashedPassword,
                'RolID' => 1,
                'NumeroTelefono' => '599740',
                'Nombre' => 'Cristian',
                'ApellidoPaterno' => 'Torres',
                'ApellidoMaterno' => null,
                'is_active' => true,
                'email_verified_at' => null,
                'created_at' => '2024-11-07 11:02:51.547',
                'updated_at' => '2024-11-26 09:52:16.103',
                'deleted_at' => null,
            ],
            [
           
                'NombreUsuario' => 'bryanv',
                'EmailUsuario' => 'bryan.venenciano@redsalud.gob.cl',
                'Rut' => '18183903-1',
                'password' => $hashedPassword,
                'RolID' => 1,
                'NumeroTelefono' => '559738',
                'Nombre' => 'Bryan',
                'ApellidoPaterno' => 'Venenciano',
                'ApellidoMaterno' => null,
                'is_active' => true,
                'email_verified_at' => null,
                'created_at' => '2024-11-07 11:04:07.717',
                'updated_at' => '2024-12-12 14:47:25.563',
                'deleted_at' => null,
            ],
            [
            
                'NombreUsuario' => 'jcruzp',
                'EmailUsuario' => 'soporte.informatico@redsalud.gob.cl',
                'Rut' => '11720146-5',
                'password' => $hashedPassword,
                'RolID' => 2,
                'NumeroTelefono' => '559739',
                'Nombre' => 'Joel',
                'ApellidoPaterno' => 'Cruz',
                'ApellidoMaterno' => null,
                'is_active' => true,
                'email_verified_at' => null,
                'created_at' => '2024-11-07 11:05:01.573',
                'updated_at' => '2024-12-12 16:54:39.263',
                'deleted_at' => null,
            ],
            [
                'NombreUsuario' => 'nalvare001',
                'EmailUsuario' => 'nicolas.alvares.o@redsalud.gob.cl',
                'Rut' => '20262113-9',
                'password' => $hashedPassword,
                'RolID' => 1,
                'NumeroTelefono' => '939324353',
                'Nombre' => 'Nicolas',
                'ApellidoPaterno' => 'Alvarez',
                'ApellidoMaterno' => 'Orrego',
                'is_active' => true,
                'email_verified_at' => null,
                'created_at' => '2024-11-13 08:44:34.987',
                'updated_at' => '2024-11-28 15:51:47.890',
                'deleted_at' => null,
            ],
            [
                'NombreUsuario' => 'Enfermero',
                'EmailUsuario' => 'enfermero@gmail.com',
                'Rut' => '5090253-6',
                'password' => $hashedPassword,
                'RolID' => 3,
                'NumeroTelefono' => '559740',
                'Nombre' => 'Enfermero',
                'ApellidoPaterno' => null,
                'ApellidoMaterno' => null,
                'is_active' => true,
                'email_verified_at' => null,
                'created_at' => '2024-11-28 15:52:48.883',
                'updated_at' => '2024-11-28 15:53:24.497',
                'deleted_at' => null,
            ]
        ]);
    }
}
