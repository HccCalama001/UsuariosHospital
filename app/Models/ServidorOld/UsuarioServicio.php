<?php

namespace App\Models\ServidorOld;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsuarioServicio extends Model
{
    use HasFactory;
    
    protected $connection = 'sqlsrv2';
    protected $table = 'Segu_Usuarios';
    protected $primaryKey = 'Segu_Usr_RUT';

    protected $fillable = [
        'Segu_Usr_Cuenta',
        'Segu_Usr_Nombre',
        'Segu_Usr_ApellidoPaterno',
        'Segu_Usr_ApellidoMaterno',
        'Segu_Usr_RUT',
        'Segu_Usr_FuncionAdmnistr',
        'Segu_Usr_Codigo',
        'Segu_Usr_Fono',
        'Segu_Usr_Mail'
    ];

    public $timestamps = false;
    protected $keyType = 'string';

    protected $hidden = [
        'Segu_Vigente',
        'Segu_Usr_Descripcion',
        'Segu_FLD_CCCODIGO',
        'ID_Establecimiento',
        'Segu_Usr_CambioClave',
        'Segu_Usr_CambioCodigo',
        'enfESI',
        'Segu_Usr_Cuenta',
    ];

    // Relación corregida: Uno a uno con ServicioProfesional
    public function servicioProfesional()
    {
        return $this->hasOne(ServicioProfesional::class, 'SER_PRO_Rut', 'Segu_Usr_RUT');
    }

    // Relación corregida: Pertenece a UsuarioLogin
    public function sysSqlLogin()
    {
        return $this->belongsTo(UsuarioLogin::class, 'Segu_Usr_Cuenta', 'name');
    }

    // Accesor corregido para obtener el nombre completo del usuario
    public function getNombreUsuarioAttribute()
    {
        return "{$this->Segu_Usr_Nombre} {$this->Segu_Usr_ApellidoPaterno} {$this->Segu_Usr_ApellidoMaterno}";
    }

    // Scope corregido para filtrar por username
    public function scopeUsername($query, $id)
    {
        return $query->where('Segu_Usr_Cuenta', '=', $id);
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
