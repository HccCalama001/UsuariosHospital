<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePasswordResetsTable extends Migration
{
    protected $connection = 'mysql';
    public function up()
    {
        Schema::create('password_resets', function (Blueprint $table) {
            $table->id();
            $table->string('email')->index(); // Correo del usuario
            $table->text('token'); // Token JWT
            $table->timestamp('created_at')->nullable(); // Fecha de creación
        });
    }

    public function down()
    {
        Schema::dropIfExists('password_resets');
    }
}
