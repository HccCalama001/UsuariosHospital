<?php

namespace App\Models\ServidorOld;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsuarioSistema extends Model
{
    use HasFactory;

    protected $connection = 'sqlsrv2';
    protected $table = 'TAB_UsuarioSistema';
    protected $primaryKey = 'TAB_Login';
    
    public $timestamps = false;

    protected $fillable = [
        'TAB_Login', //Nombre de los usuarios que tienen sistema
        'TAB_ID_Sistema', //Codigo del sistema de salud al que puede acceder
        'TAB_ID_Privilegio', //Codigo del privilegio que tiene el usuario
    ];

    public function sistemaSalud()
    {
        return $this->belongsTo(SistemaSalud::class, 'TAB_ID_Sistema', 'TAB_Codigo');
    }

    public function privilegios()
    {
        return $this->belongsTo(Privilegios::class, 'TAB_ID_Privilegio', 'TAB_ID_Privilegio');
    }
    public function sysSqlLogin()
    {
        return $this->belongsTo(UsuarioLogin::class, 'TAB_Login', 'name');
    }
}