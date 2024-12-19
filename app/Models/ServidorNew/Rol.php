<?php

namespace App\Models\ServidorNew;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\ServidorNew\Usuario;

class Rol extends Model
{
    use SoftDeletes;
    protected $connection = 'sqlsrvUsers';
    protected $table = 'roles';

    // Definir clave primaria personalizada
    protected $primaryKey = 'RolID';

    // Especificar que la clave primaria es autoincremental y de tipo entero
    public $incrementing = true;
    protected $keyType = 'int';

    // Definir los campos asignables masivamente
    protected $fillable = [
        'NombreRol',
        'Descripcion',
    ];

    // Definir las fechas manejadas por Laravel
    protected $dates = ['created_at', 'updated_at', 'deleted_at']; // Nombres de fechas en minúsculas por convención de Laravel

    // Laravel manejará los timestamps automáticamente
    public $timestamps = true; // Cambiado a true para permitir que Laravel maneje created_at y updated_at

    // Relación con la tabla Usuarios
    public function usuarios()
    {
        return $this->hasMany(User::class, 'RolID', 'RolID');
    }

    // Especificar el nombre de la clave para el route model binding
    public function getRouteKeyName()
    {
        return 'RolID';
    }
}
