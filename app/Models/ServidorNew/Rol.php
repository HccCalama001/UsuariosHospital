<?php

namespace App\Models\ServidorNew;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Rol
 *
 * Representa la tabla 'roles' en la conexión 'sqlsrvUsers'.
 *
 * @property int    $RolID
 * @property string $NombreRol
 * @property string $Descripcion
 * @property string $created_at
 * @property string $updated_at
 * @property string $deleted_at
 */
class Rol extends Model
{
    use SoftDeletes;

    /**
     * Conexión de base de datos utilizada por este modelo.
     *
     * @var string
     */
    protected $connection = 'sqlsrvUsers';

    /**
     * Nombre de la tabla asociada a este modelo.
     *
     * @var string
     */
    protected $table = 'roles';

    /**
     * Clave primaria de la tabla.
     *
     * @var string
     */
    protected $primaryKey = 'RolID';

    /**
     * Indica si la clave primaria es auto-incremental.
     *
     * @var bool
     */
    public $incrementing = true;

    /**
     * Indica el tipo de la clave primaria.
     *
     * @var string
     */
    protected $keyType = 'int';

    /**
     * Atributos asignables de forma masiva.
     *
     * @var array
     */
    protected $fillable = [
        'NombreRol',
        'Descripcion',
    ];

    /**
     * Atributos que deben ser tratados como fechas por Laravel.
     *
     * @var array
     */
    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    /**
     * Indica si el modelo maneja automáticamente las columnas
     * created_at y updated_at.
     *
     * @var bool
     */
    public $timestamps = true;

    /**
     * Relación: un rol puede tener muchos usuarios.
     *
     * @return HasMany
     */
    public function usuarios(): HasMany
    {
        return $this->hasMany(User::class, 'RolID', 'RolID');
    }

    /**
     * Determina el nombre de la clave usada para route model binding.
     *
     * @return string
     */
    public function getRouteKeyName(): string
    {
        return 'RolID';
    }
}
