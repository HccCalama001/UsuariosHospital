<?php

// Migración para crear la tabla grupos_sistemas
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGruposSistemasTable extends Migration
{
    protected $connection = 'sqlsrvUsers';

    public function up()
    {
        Schema::create('grupos_sistemas', function (Blueprint $table) {
            $table->id('GrupoID');
            $table->string('NombreGrupo', 255);
            $table->string('Url', 255)->nullable();
            $table->text('Descripcion')->nullable(); // Agregada columna Descripcion
            $table->enum('Tipo', ['escritorio', 'web']); // Se movió aquí
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('grupos_sistemas');
    }
}