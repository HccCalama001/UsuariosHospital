<?php
namespace App\Models\ServidorOld;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServicioProfesional extends Model
{
    use HasFactory;
    
    protected $connection = 'sqlsrv2';
    protected $table = 'SER_Profesiona';
    protected $primaryKey = 'SER_PRO_Rut';

    protected $fillable = [
        'SER_PRO_Rut',
        'SER_PRO_Tipo',
        'SER_PRO_ApellPater',
        'SER_PRO_ApellMater',
        'SER_PRO_Nombres',
        'SER_PRO_Estado',
        'SER_PRO_Procedencia',
        'Farmacia',
        'SER_PRO_Agenda',
        'SER_PRO_Telefono', // Agregado aquí
    ];

    protected $hidden = [
        'SER_PRO_Direccion',
        'SER_PRO_Observacio',
        'SER_PRO_TimeStamp',
        'SER_PRO_Soundex',
        'SER_PRO_NomSocial',
        'SER_PRO_EsSocial',
    ];

    public $timestamps = false;
    protected $keyType = 'string';

    // Relación corregida: Pertenece a UsuarioServicio
    public function usuarioServicio()
    {
        return $this->belongsTo(UsuarioServicio::class, 'SER_PRO_Rut', 'Segu_Usr_RUT');
    }

    // Relación corregida: Pertenece a TipoProfesional
    public function tipoProfesional()
    {
        return $this->belongsTo(TipoProfesional::class, 'SER_PRO_Tipo', 'TAB_Codigo');
    }

      /**
     * Relación con SistemaConsolidado.
     * Un ServicioProfesional puede estar relacionado con un SistemaConsolidado.
     */
    public function sistemaConsolidado()
    {
        return $this->hasMany(SistemaConsolidado::class, 'codigo', 'SER_PRO_Rut')
            ->where('tipo', 'escritorio'); // Filtrar por tipo si es necesario
    }

    
}
