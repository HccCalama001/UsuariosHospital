<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    protected $connection = 'sqlsrvUsers';

    public function up()
    {
        // 1. Eliminar la foreign key en usuarios y la columna RolID
        Schema::table('usuarios', function (Blueprint $table) {
            // Si la foreign key se llamó 'usuarios_RolID_foreign' o similar,
            // debes indicarla correctamente. A veces Laravel nombra la FK 
            // como {tabla}_{columna}_foreign.
            $table->dropForeign(['RolID']);
            $table->dropColumn('RolID');
        });

        // 2. Eliminar la tabla roles
        Schema::dropIfExists('roles');
    }

    public function down()
    {
        // En caso de querer revertir este cambio, aquí se recrean la tabla roles y 
        // la columna RolID en usuarios junto con su FK.

        // 1. Recrear la tabla roles
        Schema::create('roles', function (Blueprint $table) {
            $table->id('RolID');
            $table->string('NombreRol', 255);
            $table->text('Descripcion')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // 2. Volver a agregar la columna RolID en usuarios y la foreign key
        Schema::table('usuarios', function (Blueprint $table) {
            $table->unsignedBigInteger('RolID')->nullable();
            $table->foreign('RolID')
                ->references('RolID')->on('roles')
                ->onDelete('set null');
        });
    }
};
