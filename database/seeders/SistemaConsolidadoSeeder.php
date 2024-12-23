<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SistemaConsolidadoSeeder extends Seeder
{
    protected $sourceConnection = 'sqlsrv';      // Conexión de origen
    protected $targetConnection = 'sqlsrvUsers'; // Conexión de destino
    protected $table = 'sistema_consolidado';    // Tabla destino

    public function run()
    {
        // 1. Datos para aplicaciones de escritorio (TAB_SistemaSalud)
        $escritorioData = DB::connection($this->sourceConnection)
            ->table('TAB_SistemaSalud')
            ->where('TAB_Vigencia', 1) // Solo registros con TAB_Vigencia = 1
            ->get();

        foreach ($escritorioData as $data) {

            // Convertir 'S'/'N' a bit (1/0). Asumimos que la tabla fuente maneja 'S' como sí/verdadero y 'N' como no/falso.
            $validaRUT = ($data->TAB_ValidaRut === 'S') ? 1 : 0;

            DB::connection($this->targetConnection)->table($this->table)->insert([
                'Codigo'      => trim($data->TAB_Codigo),
                'Nombre'      => $data->TAB_Text,
                'Descripcion' => null,   // Sin descripción en TAB_SistemaSalud
                'ValidaRUT'   => $validaRUT, // bit
                'UsuarioBD'   => $data->TAB_UsuarioBD ?? null,
                'Vigencia'    => $data->TAB_Vigencia ?? true,
                'GrupoID'     => 1,
                'created_at'  => now(),
                'updated_at'  => now(),
            ]);
        }

        // 2. Datos para aplicaciones web (sistemas)
        $webData = DB::connection($this->sourceConnection)
            ->table('sistemas')
            ->get();

        foreach ($webData as $data) {

            // Para sistemas web, quizá ValidaRUT no aplique, lo ponemos en false (0).
            DB::connection($this->targetConnection)->table($this->table)->insert([
                'Codigo'      => $data->id,
                'Nombre'      => $data->nombre,
                'Descripcion' => $data->descripcion,
                'ValidaRUT'   => false,  // bit
                'UsuarioBD'   => null,
                'Vigencia'    => true,
                'GrupoID'     => 1,
                'created_at'  => $data->created_at ?? now(),
                'updated_at'  => $data->updated_at ?? now(),
            ]);
        }
    }
}
