<?php

namespace App\Models\ServidorNew;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SistemaConsolidado extends Model
{
    use  SoftDeletes;

    // Especificar la conexión a la base de datos
    protected $connection = 'sqlsrvUsers';

    // Especificar el nombre de la tabla
    protected $table = 'sistema_consolidado';

    // Especificar la clave primaria
    protected $primaryKey = 'SistemaID';

    // Definir los atributos asignables en masa
    protected $fillable = [
        'Codigo',
        'Nombre',
        'Descripcion',
        'ValidaRUT',
        'UsuarioBD',
        'Vigencia',
        'GrupoID'
    ];

    // Definir los atributos que deben tratarse como fechas
    protected $dates = ['deleted_at', 'created_at', 'updated_at'];

    // Relación con el modelo GruposSistemas
    public function grupo()
    {
        return $this->belongsTo(GruposSistema::class, 'GrupoID', 'GrupoID');
    }

    // Crear o actualizar un sistema
    public static function crearOActualizar(array $datos)
    {
        return self::updateOrCreate(['SistemaID' => $datos['SistemaID'] ?? null], $datos);
    }

    // Verificar si un sistema está vigente
    public function estaVigente()
    {
        return $this->Vigencia;
    }

    // Eliminar un sistema por ID
    public static function eliminarPorID($id)
    {
        $sistema = self::find($id);
        if ($sistema) {
            $sistema->delete();
            return true;
        }
        return false;
    }

    // Obtener el grupo asociado
    public function obtenerGrupo()
    {
        return $this->grupo()->first();
    }
}
