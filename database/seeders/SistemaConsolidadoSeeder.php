<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SistemaConsolidadoSeeder extends Seeder
{
    protected $sourceConnection = 'sqlsrv'; // Conexión a las tablas fuente
    protected $targetConnection = 'sqlsrvUsers'; // Conexión a la tabla destino
    protected $table = 'sistema_consolidado'; // Tabla destino

    public function run()
    {
        // Datos para aplicaciones de escritorio (TAB_SistemaSalud)
        $escritorioData = DB::connection($this->sourceConnection)
            ->table('TAB_SistemaSalud')
            ->where('TAB_Vigencia', 1) // Solo registros con TAB_Vigencia = 1
            ->get();

        foreach ($escritorioData as $data) {
            DB::connection($this->targetConnection)->table($this->table)->insert([
                'codigo' => trim($data->TAB_Codigo), // Asegúrate de eliminar espacios
                'nombre' => $data->TAB_Text,
                'descripcion' => null, // Sin descripción en TAB_SistemaSalud
                'valida_rut' => $data->TAB_ValidaRut,
                'usuario_bd' => $data->TAB_UsuarioBD,
                'vigencia' => $data->TAB_Vigencia,
                'tipo' => 'escritorio',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Datos para aplicaciones web (sistemas)
        $webData = DB::connection($this->sourceConnection)
            ->table('sistemas')
            ->get();

        foreach ($webData as $data) {
            DB::connection($this->targetConnection)->table($this->table)->insert([
                'codigo' => $data->id,
                'nombre' => $data->nombre,
                'descripcion' => $data->descripcion,
                'valida_rut' => null, // No aplica para sistemas web
                'usuario_bd' => null, // No aplica para sistemas web
                'vigencia' => true, // Asumimos que son vigentes
                'tipo' => 'web',
                'created_at' => $data->created_at ?? now(),
                'updated_at' => $data->updated_at ?? now(),
            ]);
        }
    }
}
