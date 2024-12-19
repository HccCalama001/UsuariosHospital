<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UpdateUsuariosTableV2 extends Migration
{
    protected $connection = 'sqlsrvUsers'; // Conexión específica

    public function up()
    {
        Schema::connection($this->connection)->table('usuarios', function (Blueprint $table) {
            // Elimina la restricción única en 'Rut' antes de modificarla
            DB::statement('ALTER TABLE usuarios DROP CONSTRAINT UQ__usuarios__CAF036603595D72C');
            
            // Modifica la longitud del campo `Rut`
            $table->string('Rut', 12)->collation('Modern_Spanish_CI_AS')->change();

            // Reagregar la restricción única
            $table->unique('Rut', 'usuarios_rut_unique');

            // Asegurar claves únicas para `NombreUsuario` y `EmailUsuario`
            $table->unique('NombreUsuario', 'usuarios_nombreusuario_unique');
            $table->unique('EmailUsuario', 'usuarios_emailusuario_unique');

            // Agregar la clave foránea `RolID` sin cascada
            $table->foreign('RolID')
                ->references('id')
                ->on('roles')
                ->onDelete('no action');
        });
    }

    public function down()
    {
        Schema::connection($this->connection)->table('usuarios', function (Blueprint $table) {
            // Eliminar claves únicas
            $table->dropUnique('usuarios_nombreusuario_unique');
            $table->dropUnique('usuarios_emailusuario_unique');
            $table->dropUnique('usuarios_rut_unique');

            // Restaurar la longitud original de `Rut`
            $table->string('Rut')->collation('Modern_Spanish_CI_AS')->change();
            DB::statement('ALTER TABLE usuarios ADD CONSTRAINT UQ__usuarios__CAF036603595D72C UNIQUE (Rut)');

            // Eliminar la clave foránea `RolID`
            $table->dropForeign(['RolID']);
        });
    }
}
