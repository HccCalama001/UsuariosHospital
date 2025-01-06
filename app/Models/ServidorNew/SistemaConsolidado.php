<?php

namespace App\Models\ServidorNew;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class SistemaConsolidado
 *
 * Modelo que representa la tabla 'sistema_consolidado' en la conexión 'sqlsrvUsers'.
 *
 * @property int         $SistemaID
 * @property string      $Codigo
 * @property string      $Nombre
 * @property string      $Descripcion
 * @property bool|int    $ValidaRUT
 * @property string      $UsuarioBD
 * @property bool|int    $Vigencia
 * @property int         $GrupoID
 * @property string|null $deleted_at
 * @property string|null $created_at
 * @property string|null $updated_at
 */
class SistemaConsolidado extends Model
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
    protected $table = 'sistema_consolidado';

    /**
     * Clave primaria de la tabla.
     *
     * @var string
     */
    protected $primaryKey = 'SistemaID';

    /**
     * Atributos asignables de forma masiva.
     *
     * @var array
     */
    protected $fillable = [
        'Codigo',
        'Nombre',
        'Descripcion',
        'ValidaRUT',
        'UsuarioBD',
        'Vigencia',
        'GrupoID',
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
     * Relación con el modelo GruposSistema.
     *
     * @return BelongsTo
     */
    public function grupo(): BelongsTo
    {
        return $this->belongsTo(GruposSistema::class, 'GrupoID', 'GrupoID');
    }

    /**
     * Crea o actualiza un sistema con los datos proporcionados.
     *
     * @param  array  $datos
     * @return static
     */
    public static function crearOActualizar(array $datos): self
    {
        return self::updateOrCreate(
            ['SistemaID' => $datos['SistemaID'] ?? null],
            $datos
        );
    }

    /**
     * Verifica si el sistema está vigente.
     *
     * @return bool|int
     */
    public function estaVigente()
    {
        // Retorna el valor de la columna 'Vigencia', puede ser bool o int según la tabla.
        return $this->Vigencia;
    }

    /**
     * Elimina un sistema por su ID.
     *
     * @param  int  $id
     * @return bool
     */
    public static function eliminarPorID($id): bool
    {
        $sistema = self::find($id);

        if ($sistema) {
            $sistema->delete();
            return true;
        }

        return false;
    }

    /**
     * Retorna el grupo asociado a este sistema.
     *
     * @return GruposSistema|null
     */
    public function obtenerGrupo(): ?GruposSistema
    {
        return $this->grupo()->first();
    }
}
