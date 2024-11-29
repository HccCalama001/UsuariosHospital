<?php

namespace App\Models\ServidorOld;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sistema extends Model
{
    use HasFactory;
    
    protected $connection = 'sqlsrv2';
    protected $table = 'sistemas';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'nombre',
        'descripcion'
    ];

    public function roleUserSistema()
    {
        return $this->HasMany(RolUsuarioSistema::class, 'sistemas_id', 'id');
    }

}
