<?php

namespace App\Models\ServidorOld;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SistemaSalud extends Model
{
    use HasFactory;

    protected $connection = 'sqlsrv2';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $table = 'TAB_SistemaSalud';
    protected $primaryKey = 'TAB_Codigo';


    protected $fillable = [
        'TAB_Codigo', //Codigo del sistema de salud
        'TAB_Text' //Nombre del sistema de salud
    ];

    protected $hidden = [
        'TAB_ValidaRut', //Campo que especifica si se Valida rut (N,S)
        'TAB_UsuarioBD' // Indica 1 pero no se que significa
    ];

    public function usuarioSistema()
    {
        return $this->hasMany(UsuarioSistema::class, 'TAB_ID_Sistema', 'TAB_Codigo');
    }
    
}
