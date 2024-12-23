<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePasswordResetsTable extends Migration
{
    protected $connection = 'sqlsrvUsers';
    public function up()
    {
        Schema::create('password_resets', function (Blueprint $table) {
            $table->id();
            $table->string('email', 255);
            $table->text('token');
            $table->string('codAleatorio', 5)->nullable();
            $table->dateTime('created_at')->nullable();
            $table->index('email', 'password_resets_email_index');
        });
    }

    public function down()
    {
        Schema::dropIfExists('password_resets');
    }
}
