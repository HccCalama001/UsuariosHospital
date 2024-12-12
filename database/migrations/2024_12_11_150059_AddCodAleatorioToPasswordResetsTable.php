<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCodAleatorioToPasswordResetsTable extends Migration
{
    protected $connection = 'mysql';

    public function up()
    {
        Schema::table('password_resets', function (Blueprint $table) {
            $table->string('codAleatorio', 5)->after('token')->nullable();
        });
    }

    public function down()
    {
        Schema::table('password_resets', function (Blueprint $table) {
            $table->dropColumn('codAleatorio');
        });
    }
}
