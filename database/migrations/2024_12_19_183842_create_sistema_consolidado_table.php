<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSistemaConsolidadoTable extends Migration
{
    public function up()
    {
        Schema::connection('sqlsrvUsers')->create('sistema_consolidado', function (Blueprint $table) {
            $table->id();
            $table->string('codigo');
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->string('valida_rut')->nullable();
            $table->integer('usuario_bd')->nullable();
            $table->boolean('vigencia');
            $table->string('tipo'); // Puede ser 'escritorio' o 'web'
            $table->timestamps();
            $table->softDeletes(); // Agrega la columna deleted_at para SoftDeletes
        });
    }

    public function down()
    {
        Schema::connection('sqlsrvUsers')->dropIfExists('sistema_consolidado');
    }
}
