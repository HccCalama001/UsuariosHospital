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
            $table->id(); // bigIncrements (SQL Server: bigint IDENTITY)
            $table->string('nombre');
            $table->text('descripcion')->nullable(); // NVARCHAR(MAX)
        });
    }

    public function down()
    {
        Schema::dropIfExists('roles');
    }
}

