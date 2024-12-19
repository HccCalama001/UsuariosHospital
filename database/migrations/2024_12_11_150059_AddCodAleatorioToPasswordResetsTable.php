<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCodAleatorioToPasswordResetsTable extends Migration
{
    protected $connection = 'sqlsrvUsers';

    public function up()
    {
        Schema::table('password_resets', function (Blueprint $table) {
            $table->string('codAleatorio', 5)->nullable()->after('token');
        });
    }

    public function down()
    {
        Schema::table('password_resets', function (Blueprint $table) {
            $table->dropColumn('codAleatorio');
        });
    }
}
