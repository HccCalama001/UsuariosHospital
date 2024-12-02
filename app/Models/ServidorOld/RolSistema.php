<?php

namespace App\Models\ServidorOld;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RolSistema extends Model
{
    use HasFactory;

    protected $connection = 'sqlsrv2';
    protected $table = 'roles';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'nombre',
        'descripcion',
    ];

    // Relación corregida: Uno a muchos con RolUsuarioSistema
    public function roleUserSistema()
    {
        return $this->hasMany(RolUsuarioSistema::class, 'role_id', 'id');
    }
}
