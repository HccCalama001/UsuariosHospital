<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GruposSistemasSeeder extends Seeder
{
    protected $connection = 'sqlsrvUsers'; // Especifica la conexión
    protected $table = 'grupos_sistemas'; // Tabla objetivo

    public function run()
    {
        DB::connection($this->connection)->table('grupos_sistemas')->insert([
            ['NombreGrupo' => 'Urgencia', 'Url' => 'No Aplica', 'Descripcion' => 'Sistema de escritorio para gestión rápida de urgencias hospitalarias, priorizando registro, atención y seguimiento de pacientes críticos.', 'Tipo' => 'escritorio', 'created_at' => '2024-12-20 12:03:03.567', 'updated_at' => '2024-12-20 12:03:03.567', 'deleted_at' => null],
            [ 'NombreGrupo' => 'Farmacia', 'Url' => 'No Aplica', 'Descripcion' => 'Sistema de escritorio para gestión y entrega de resultados de exámenes en farmacia.', 'Tipo' => 'escritorio', 'created_at' => '2024-12-20 12:03:03.567', 'updated_at' => '2024-12-20 12:03:03.567', 'deleted_at' => null],
            [ 'NombreGrupo' => 'Hospitalización', 'Url' => 'No Aplica', 'Descripcion' => 'Sistema de escritorio para gestión de ingresos, estancias y alta de pacientes hospitalizados.', 'Tipo' => 'escritorio', 'created_at' => '2024-12-20 12:03:03.567', 'updated_at' => '2024-12-20 12:03:03.567', 'deleted_at' => null],
            ['NombreGrupo' => 'Pabellón', 'Url' => 'No Aplica', 'Descripcion' => 'Sistema de escritorio para gestión de programación, recursos y seguimiento de cirugías en pabellones.', 'Tipo' => 'escritorio', 'created_at' => '2024-12-20 12:03:03.567', 'updated_at' => '2024-12-20 12:03:03.567', 'deleted_at' => null],
            ['NombreGrupo' => 'Siclope', 'Url' => 'No Aplica', 'Descripcion' => 'Sistema de escritorio para ficha clinica electronica.', 'Tipo' => 'escritorio', 'created_at' => '2024-12-20 09:07:49.000', 'updated_at' => '2024-12-20 09:07:55.000', 'deleted_at' => null],
            ['NombreGrupo' => 'Helios', 'Url' => 'No Aplica', 'Descripcion' => 'Sistema de escritorio.', 'Tipo' => 'escritorio', 'created_at' => '2024-12-20 09:10:31.000', 'updated_at' => '2024-12-20 09:10:33.000', 'deleted_at' => null],
            ['NombreGrupo' => 'Apolo', 'Url' => 'No Aplica', 'Descripcion' => 'Sistema de escritorio.', 'Tipo' => 'escritorio', 'created_at' => '2024-12-20 09:43:54.000', 'updated_at' => '2024-12-20 09:43:56.000', 'deleted_at' => null],
            ['NombreGrupo' => 'Uros', 'Url' => 'No Aplica', 'Descripcion' => 'Sistema de escritorio.', 'Tipo' => 'escritorio', 'created_at' => '2024-12-20 09:44:47.000', 'updated_at' => '2024-12-20 09:44:49.000', 'deleted_at' => null],
            ['NombreGrupo' => 'Indice Paciente', 'Url' => 'No Aplica', 'Descripcion' => 'Sistema de escritorio.', 'Tipo' => 'escritorio', 'created_at' => '2024-12-20 09:48:47.000', 'updated_at' => '2024-12-20 09:48:49.000', 'deleted_at' => null],
            ['NombreGrupo' => 'Recaudacion', 'Url' => 'No Aplica', 'Descripcion' => 'Sistema de escritorio.', 'Tipo' => 'escritorio', 'created_at' => '2024-12-20 09:49:36.000', 'updated_at' => '2024-12-20 09:49:48.000', 'deleted_at' => null],
            ['NombreGrupo' => 'Agenda', 'Url' => 'No Aplica', 'Descripcion' => 'Sistema de escritorio.', 'Tipo' => 'escritorio', 'created_at' => '2024-12-20 09:49:54.000', 'updated_at' => '2024-12-20 09:49:56.000', 'deleted_at' => null],
            ['NombreGrupo' => 'Finanzas', 'Url' => 'No Aplica', 'Descripcion' => 'Sistema de escritorio.', 'Tipo' => 'escritorio', 'created_at' => '2024-12-20 09:50:48.000', 'updated_at' => '2024-12-20 09:51:02.000', 'deleted_at' => null],
            ['NombreGrupo' => 'Consultas Medicas', 'Url' => 'No Aplica', 'Descripcion' => 'Sistema de escritorio.', 'Tipo' => 'escritorio', 'created_at' => '2024-12-20 09:51:28.000', 'updated_at' => '2024-12-20 09:51:29.000', 'deleted_at' => null],
            ['NombreGrupo' => 'Lista Espera', 'Url' => 'No Aplica', 'Descripcion' => 'Sistema de escritorio.', 'Tipo' => 'escritorio', 'created_at' => '2024-12-20 09:51:53.000', 'updated_at' => '2024-12-20 09:51:55.000', 'deleted_at' => null],
            ['NombreGrupo' => 'PPV', 'Url' => 'http://ppv.hospitalcalama.cl', 'Descripcion' => 'Sistema Web', 'Tipo' => 'web', 'created_at' => '2024-12-20 10:06:57.000', 'updated_at' => '2024-12-20 10:06:59.000', 'deleted_at' => null],
            ['NombreGrupo' => 'Procedimiento Lista Espera', 'Url' => 'http://proc.hospitalcalama.cl', 'Descripcion' => 'Sistema Web', 'Tipo' => 'web', 'created_at' => '2024-12-20 10:09:07.000', 'updated_at' => '2024-12-20 10:09:09.000', 'deleted_at' => null],
            ['NombreGrupo' => 'Fichas Clinicas', 'Url' => 'http://fichas.hospitalcalama.cl', 'Descripcion' => 'Sistema Web', 'Tipo' => 'web', 'created_at' => '2024-12-20 10:11:37.000', 'updated_at' => '2024-12-20 10:11:38.000', 'deleted_at' => null],
            ['NombreGrupo' => 'REM', 'Url' => 'http://rem.hospitalcalama.cl', 'Descripcion' => 'Sistema Web', 'Tipo' => 'web', 'created_at' => '2024-12-20 10:15:05.000', 'updated_at' => '2024-12-20 10:15:10.000', 'deleted_at' => null],
            ['NombreGrupo' => 'Lista Espera Rx', 'Url' => 'http://esperarx.hospitalcalama.cl', 'Descripcion' => 'Sistema Web', 'Tipo' => 'web', 'created_at' => '2024-12-20 10:16:28.000', 'updated_at' => '2024-12-20 10:16:44.000', 'deleted_at' => null],
            ['NombreGrupo' => 'Turno Clinico', 'Url' => 'http://turnos.hospitalcalama.cl', 'Descripcion' => 'Sistema Web', 'Tipo' => 'web', 'created_at' => '2024-12-20 10:18:03.000', 'updated_at' => '2024-12-20 10:18:05.000', 'deleted_at' => null],
            ['NombreGrupo' => 'FARMACIA-GES', 'Url' => 'http://farmages.hospitalcalama.cl', 'Descripcion' => 'Sistema Web', 'Tipo' => 'web', 'created_at' => '2024-12-20 10:21:56.000', 'updated_at' => '2024-12-20 10:21:58.000', 'deleted_at' => null],
            ['NombreGrupo' => 'Control de Gestión', 'Url' => 'http://gestion.hospitalcalama.cl', 'Descripcion' => 'Sistema Web', 'Tipo' => 'web', 'created_at' => '2024-12-20 10:23:35.000', 'updated_at' => '2024-12-20 10:23:36.000', 'deleted_at' => null],
            ['NombreGrupo' => 'C.A.I', 'Url' => 'http://cai.hospitalcalama.cl', 'Descripcion' => 'Sistema Web de gestion de ticket informatico e Inventario', 'Tipo' => 'web', 'created_at' => '2024-12-20 10:24:35.000', 'updated_at' => '2024-12-20 10:24:37.000', 'deleted_at' => null],
            ['NombreGrupo' => 'Consentimientos', 'Url' => 'http://cons.hospitalcalama.cl', 'Descripcion' => 'Sistema Web', 'Tipo' => 'web', 'created_at' => '2024-12-20 10:26:22.000', 'updated_at' => '2024-12-20 10:26:24.000', 'deleted_at' => null],
            ['NombreGrupo' => 'Mater', 'Url' => 'http://mater.hospitalcalama.cl', 'Descripcion' => 'Sistema Web', 'Tipo' => 'web', 'created_at' => '2024-12-20 10:40:24.000', 'updated_at' => '2024-12-20 10:40:26.000', 'deleted_at' => null],
            ['NombreGrupo' => 'Registro usuario', 'Url' => 'No Aplica', 'Descripcion' => 'Sistema de escritorio.', 'Tipo' => 'escritorio', 'created_at' => '2024-12-20 12:34:56.000', 'updated_at' => '2024-12-20 12:34:58.000', 'deleted_at' => null],
            ['NombreGrupo' => 'Larga Estadia', 'Url' => 'http://estadia.hospitalcalama.cl', 'Descripcion' => 'Sistema de escritorio.', 'Tipo' => 'web', 'created_at' => '2024-12-20 12:51:04.000', 'updated_at' => '2024-12-20 12:51:06.000', 'deleted_at' => null],
        ]);
    }
}