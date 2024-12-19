<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateRolesTable extends Migration
{
    protected $connection = 'sqlsrvUsers'; // Asegúrate de usar la conexión correcta

    public function up()
    {
        Schema::connection($this->connection)->table('roles', function (Blueprint $table) {
            // Cambiar el nombre del campo `nombre` a `NombreRol`
            $table->renameColumn('nombre', 'NombreRol');

            // Cambiar el nombre del campo `descripcion` a `Descripcion`
            $table->renameColumn('descripcion', 'Descripcion');

            // Agregar columnas de timestamps y soft deletes si no existen
            if (!Schema::connection($this->connection)->hasColumn('roles', 'created_at')) {
                $table->timestamps(); // created_at y updated_at
            }

            if (!Schema::connection($this->connection)->hasColumn('roles', 'deleted_at')) {
                $table->softDeletes(); // deleted_at para eliminación lógica
            }
        });
    }

    public function down()
    {
        Schema::connection($this->connection)->table('roles', function (Blueprint $table) {
            // Restaurar el nombre de las columnas a su estado original
            $table->renameColumn('NombreRol', 'nombre');
            $table->renameColumn('Descripcion', 'descripcion');

            // Eliminar las columnas de timestamps y soft deletes
            $table->dropSoftDeletes();
            $table->dropTimestamps();
        });
    }
}
