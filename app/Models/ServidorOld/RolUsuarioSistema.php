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

    protected $fillable = [
        'role_id',
        'user_name',
        'sistemas_id',
        'vigencia',
    ];

    // Relación corregida: Pertenece a RolSistema
    public function role()
    {
        return $this->belongsTo(RolSistema::class, 'role_id', 'id');
    }

    // Relación corregida: Pertenece a Sistema
    public function sistema()
    {
        return $this->belongsTo(Sistema::class, 'sistemas_id', 'id');
    }

    // Relación corregida: Pertenece a UsuarioLogin
    public function sysSqlLogin()
    {
        return $this->belongsTo(UsuarioLogin::class, 'user_name', 'principal_id');
    }

    // Scope corregido: Filtra por vigencia activa
    public function scopeVigencia($query)
    {
        return $query->where('vigencia', 1);
    }
}
