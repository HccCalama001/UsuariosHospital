<?php

namespace App\Models\ServidorOld;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RolUsuarioSistema extends Model
{
    use HasFactory;

    protected $connection = 'sqlsrv2';
    protected $table = 'role_user_sistema';
    protected $primaryKey = 'id';

    //public $timestamps = false;

    protected $fillable = [
        'role_id',
        'user_principal_id',
        'sistemas_id',
        'vigencia'
    ];

    public function role()
    {
        return $this->belongsTo(RolSistema::class, 'role_id', 'id');
    }

    public function sistema()
    {
        return $this->belongsTo(Sistema::class, 'sistemas_id', 'id');
    }

    public function sysSqlLogin()
    {
        return $this->belongsTo(UsuarioLogin::class, 'user_principal_id', 'principal_id');
    }

    public function scopeVigencia($query)
    {
        return $query->where('vigencia', 1);
    }
}
