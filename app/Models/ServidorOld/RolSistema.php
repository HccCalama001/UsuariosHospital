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
        'descripcion'
    ];

    public function roleUserSistema()
    {
        return $this->hasOne(RolUsuarioSistema::class, 'role_id', 'id');
    }
}
