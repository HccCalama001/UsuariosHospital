<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolesTable extends Migration
{
    protected $connection = 'sqlsrvUsers';
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id('RolID');
            $table->string('NombreRol', 255);
            $table->text('Descripcion')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('roles');
    }
}
