<?php

namespace App\Models\ServidorNew;

use Illuminate\{Database\Eloquent\Factories\HasFactory, Database\Eloquent\Model};

class SistemaConsolidado extends Model
{
    use HasFactory, SoftDeletes;

    // Especificar la conexión a la base de datos (opcional si 'sql' es la predeterminada)
    protected $connection = 'sqlsrvUsers';

     // Campos rellenables
     protected $fillable = [
         'codigo',
         'nombre',
         'descripcion',
         'valida_rut',
         'usuario_bd',
         'vigencia',
         'tipo', // Puede ser 'escritorio' o 'web'
         'created_at',
         'updated_at',
     ];

     // Indica si los timestamps son manejados automáticamente
     public $timestamps = true;
}
