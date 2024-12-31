<?php

namespace App\Models\ServidorNew;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Collection;

/**
 * Class GruposSistema
 *
 * Modelo que representa la tabla 'grupos_sistemas' en la base de datos.
 * 
 * @property int    $GrupoID
 * @property string $NombreGrupo
 * @property string $Url
 * @property string $Descripcion
 * @property string $Tipo
 * @property string $imagen
 *
 * @method static static updateOrCreate(array $attributes, array $values = [])
 * @method static static find(int $id)
 */
class GruposSistema extends Model
{
    use SoftDeletes;

    /**
     * La conexión de base de datos que se utilizará.
     *
     * @var string
     */
    protected $connection = 'sqlsrvUsers';

    /**
     * La tabla asociada con el modelo.
     *
     * @var string
     */
    protected $table = 'grupos_sistemas';

    /**
     * La clave primaria de la tabla.
     *
     * @var string
     */
    protected $primaryKey = 'GrupoID';

    /**
     * Atributos que se pueden asignar de forma masiva.
     *
     * @var array
     */
    protected $fillable = [
        'NombreGrupo',
        'Url',
        'Descripcion',
        'Tipo',
        'imagen',
    ];

    /**
     * Atributos que deben ser tratados como fechas.
     *
     * @var array
     */
    protected $dates = [
        'deleted_at',
        'created_at',
        'updated_at',
    ];

    /**
     * Relación con el modelo SistemaConsolidado.
     *
     * @return HasMany
     */
    public function sistemas(): HasMany
    {
        return $this->hasMany(SistemaConsolidado::class, 'GrupoID', 'GrupoID');
    }

    /**
     * Crea o actualiza un grupo a partir de los datos proporcionados.
     *
     * @param  array  $datos
     * @return static
     */
    public static function crearOActualizar(array $datos): self
    {
        return self::updateOrCreate(
            ['GrupoID' => $datos['GrupoID'] ?? null],
            $datos
        );
    }

    /**
     * Obtiene todos los sistemas relacionados con este grupo.
     *
     * @return Collection
     */
    public function obtenerSistemas(): Collection
    {
        return $this->sistemas()->get();
    }

    /**
     * Elimina un grupo por su ID.
     *
     * @param  int  $id
     * @return bool
     */
    public static function eliminarPorID($id): bool
    {
        $grupo = self::find($id);

        if ($grupo) {
            $grupo->delete();
            return true;
        }

        return false;
    }
}
