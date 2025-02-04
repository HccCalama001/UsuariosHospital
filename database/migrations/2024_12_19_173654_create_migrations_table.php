<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMigrationsTable extends Migration
{
    protected $connection = 'sqlsrvUsers';
    public function up()
    {
        Schema::create('migrations', function (Blueprint $table) {
            $table->id();
            $table->string('migration', 255);
            $table->integer('batch');
        });
    }

    public function down()
    {
        Schema::dropIfExists('migrations');
    }
}
