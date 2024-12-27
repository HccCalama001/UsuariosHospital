<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection = 'sqlsrvUsers';
    
    public function up()
    {
        Schema::table('grupos_sistemas', function (Blueprint $table) {
            // Agrega la columna imagen (URL) después de la columna "Url", por ejemplo
            $table->string('imagen', 255)->nullable()->after('Url');
        });
    }

    public function down()
    {
        Schema::table('grupos_sistemas', function (Blueprint $table) {
            // Elimina la columna imagen
            $table->dropColumn('imagen');
        });
    }
};
