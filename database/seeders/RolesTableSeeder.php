<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rol;

class RolesTableSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            ['nombre' => 'Administrador', 'descripcion' => 'Rol de administrador'],
            ['nombre' => 'Usuario', 'descripcion' => 'Rol de usuario estándar'],
            // Añade más roles según necesites
        ];

        foreach ($roles as $rol) {
            Rol::create($rol);
        }
    }
}
