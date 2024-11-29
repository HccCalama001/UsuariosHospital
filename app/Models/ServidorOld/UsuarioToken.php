<?php

namespace App\Models\ServidorOld;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsuarioToken extends Model
{

    use HasFactory;

    protected $connection = 'sqlsrv2';
    protected $table = 'auth_remember_token';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'id_user',
        'id_servicio',
        'id_profesional'
    ];

    public function sysSqlLogin()
    {
        return $this->belongsTo(UsuarioLogin::class, 'id_user', 'principal_id');
    }

    public function ppvServicio()
    {
        return $this->belongsTo(PPVServicio::class, 'id_servicio', 'ID');
    }

    public function authTipoProfesional()
    {
        return $this->belongsTo(UsuarioProfesional::class, 'id_profesional', 'id');
    }
}
