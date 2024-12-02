<?php

namespace App\Models\ServidorOld;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Privilegios extends Model
{
    use HasFactory;

    protected $connection = 'sqlsrv2';
    protected $table = 'TAB_Privilegios';
    protected $primaryKey = 'TAB_ID_Privilegio';
    
    protected $fillable = [
        'TAB_ID_Privilegio', //Codigo del privilegio
        'TAB_DES_Privilegio', //Nombre del privilegio
    ];

    public function usuarioSistema()
    {
        return $this->hasMany(UsuarioSistema::class, 'TAB_ID_Privilegio', 'TAB_ID_Privilegio');
    }

}
