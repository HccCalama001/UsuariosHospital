<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ServidorNew\User;

class Rol extends Model
{
    use HasFactory;

    // Si la tabla se llama 'roles', puedes omitir esta línea
    protected $table = 'roles';

    // Si la clave primaria es 'id', puedes omitir esta línea
    protected $primaryKey = 'id';

    // Si no utilizas timestamps en la tabla 'roles', añade esta línea
    public $timestamps = false;

    // Campos asignables masivamente
    protected $fillable = [
        'nombre',       // Nombre del rol
        'descripcion',  // Descripción del rol
    ];

    /**
     * Relación con el modelo User
     * Un rol puede tener muchos usuarios
     */
    public function usuarios()
    {
        return $this->hasMany(User::class, 'RolID', 'id');
    }
}
