<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    /**
     * La conexión de base de datos que debe utilizar la migración.
     *
     * @var string
     */
    protected $connection = 'mysql';

    /**
     * Ejecutar las migraciones.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection($this->connection)->create('usuarios', function (Blueprint $table) {
            $table->id(); // Campo 'id' como clave primaria autoincremental

            $table->string('NombreUsuario')->unique(); // Nombre de usuario único
            $table->string('EmailUsuario')->unique(); // Correo electrónico único
            $table->string('Rut')->unique(); // RUT único

            $table->string('password'); // Contraseña encriptada

            $table->unsignedBigInteger('RolID')->nullable(); // Identificador del rol (clave foránea a 'roles')

            $table->string('NumeroTelefono')->nullable(); // Teléfono del usuario

            $table->string('Nombre')->nullable(); // Nombre del usuario
            $table->string('ApellidoPaterno')->nullable(); // Apellido paterno
            $table->string('ApellidoMaterno')->nullable(); // Apellido materno

            $table->rememberToken(); // Campo 'remember_token' para autenticación

            $table->timestamps(); // Campos 'created_at' y 'updated_at'

            $table->softDeletes(); // Campo 'deleted_at' para borrado suave (soft deletes)

            // Clave foránea a la tabla 'roles'
            $table->foreign('RolID')->references('id')->on('roles')->onDelete('set null');
        });
    }

    /**
     * Revertir las migraciones.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection($this->connection)->dropIfExists('usuarios');
    }
}
