<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ServidorNew\Rol;

class RolesTableSeeder extends Seeder
{
    public function run()
    {
        Rol::create([
            'NombreRol' => 'Admin',
            'Descripcion' => 'Administrador del sistema',
        ]);

        Rol::create([
            'NombreRol' => 'Informatico',
            'Descripcion' => 'Personal de informática',
        ]);

        Rol::create([
            'NombreRol' => 'Personal Hospital',
            'Descripcion' => 'Personal del hospital',
        ]);
    }
}
