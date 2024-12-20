<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSistemaConsolidadoTable extends Migration
{
    protected $connection = 'sqlsrvUsers';

    public function up()
    {
        Schema::create('sistema_consolidado', function (Blueprint $table) {
            $table->id('SistemaID');
            $table->string('Codigo', 50);
            $table->string('Nombre', 255);
            $table->text('Descripcion')->nullable(); // Agregada columna Descripcion
            $table->boolean('ValidaRUT')->default(false)->nullable();
            $table->integer('UsuarioBD')->nullable();
            $table->boolean('Vigencia')->default(true);
            $table->unsignedBigInteger('GrupoID')->nullable();
            $table->foreign('GrupoID')->references('GrupoID')->on('grupos_sistemas');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sistema_consolidado');
    }
}
