<?php

namespace App\Models\ServidorOld;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PPVServicio extends Model
{
    use HasFactory;

    protected $connection = 'sqlsrv3';
    protected $table = 'PPV_Servicios';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $fillable = [
        'servicio',
        'vigente',
        'cod_rel_servicio'
    ];

    public function authRememberToken()
    {
        return $this->hasOne(UsuarioToken::class, 'id_servicio', 'ID');
    }
}
