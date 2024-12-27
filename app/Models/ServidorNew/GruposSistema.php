<?php

namespace App\Models\ServidorNew;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GruposSistema extends Model
{
    use  SoftDeletes;

    // Especificar la conexión a la base de datos
    protected $connection = 'sqlsrvUsers';

    // Especificar el nombre de la tabla
    protected $table = 'grupos_sistemas';

    // Especificar la clave primaria
    protected $primaryKey = 'GrupoID';

    // Definir los atributos asignables en masa
    protected $fillable = [
        'NombreGrupo',
        'Url',
        'Descripcion',
        'Tipo',
        'imagen'
    ];

    // Definir los atributos que deben tratarse como fechas
    protected $dates = ['deleted_at', 'created_at', 'updated_at'];

    // Relación con el modelo SistemaConsolidado
    public function sistemas()
    {
        return $this->hasMany(SistemaConsolidado::class, 'GrupoID', 'GrupoID');
    }
    // Crear o actualizar un grupo
    public static function crearOActualizar(array $datos)
    {
        return self::updateOrCreate(['GrupoID' => $datos['GrupoID'] ?? null], $datos);
    }

    // Obtener todos los sistemas relacionados
    public function obtenerSistemas()
    {
        return $this->sistemas()->get();
    }

    // Eliminar un grupo por ID
    public static function eliminarPorID($id)
    {
        $grupo = self::find($id);
        if ($grupo) {
            $grupo->delete();
            return true;
        }
        return false;
    }
}
