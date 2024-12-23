<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    protected $connection = 'sqlsrvUsers';
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('NombreUsuario', 255)->unique();
            $table->string('EmailUsuario', 255)->unique();
            $table->string('Rut', 12)->unique();
            $table->string('password', 255);
            $table->unsignedBigInteger('RolID')->nullable();
            $table->string('NumeroTelefono', 255)->nullable();
            $table->string('Nombre', 255)->nullable();
            $table->string('ApellidoPaterno', 255)->nullable();
            $table->string('ApellidoMaterno', 255)->nullable();
            $table->boolean('is_active')->default(1);
            $table->dateTime('email_verified_at')->nullable();
            $table->string('remember_token', 100)->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('RolID')
                ->references('RolID')->on('roles')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}
