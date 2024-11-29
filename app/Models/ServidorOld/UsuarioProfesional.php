<?php

namespace App\Models\ServidorOld;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsuarioProfesional extends Model
{
    use HasFactory;

    protected $connection = 'sqlsrv2';
    protected $table = 'auth_tipo_profesional';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'estado'
    ];

    public function authRememberToken()
    {
        return $this->hasOne(UsuarioToken::class, 'id_profesional', 'id');
    }
}
