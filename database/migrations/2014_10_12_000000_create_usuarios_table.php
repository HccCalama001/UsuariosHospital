<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    protected $connection = 'sqlsrvUsers';

    public function up()
    {
        Schema::connection($this->connection)->create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('NombreUsuario')->unique();
            $table->string('EmailUsuario')->unique();
            $table->string('Rut')->unique();
            $table->string('password');
            $table->unsignedBigInteger('RolID')->nullable();
            $table->string('NumeroTelefono')->nullable();
            $table->string('Nombre')->nullable();
            $table->string('ApellidoPaterno')->nullable();
            $table->string('ApellidoMaterno')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('RolID')->references('id')->on('roles')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::connection($this->connection)->dropIfExists('usuarios');
    }
}
