<?php

namespace App\Models\ServidorNew;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Tymon\JWTAuth\Contracts\JWTSubject;

use App\Models\ServidorNew\Rol;
use App\Models\ServidorOld\UsuarioLogin;
use App\Models\ServidorOld\UsuarioServicio;
use App\Models\ServidorOld\ServicioProfesional;
use App\Models\ServidorOld\UsuarioSistema;
use App\Models\ServidorOld\RolUsuarioSistema;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, SoftDeletes;

    // Especificar la conexión a la base de datos (opcional si 'mysql' es la predeterminada)
    protected $connection = 'mysql';

    protected $table = 'usuarios';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'NombreUsuario',
        'EmailUsuario',
        'Rut',
        'password',
        'RolID',
        'NumeroTelefono',
        'Nombre',
        'ApellidoPaterno',
        'ApellidoMaterno',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $dates = ['deleted_at'];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    public function rol()
    {
        return $this->belongsTo(Rol::class, 'RolID', 'id');
    }

    public function getNombreCompletoAttribute()
    {
        return "{$this->Nombre} {$this->ApellidoPaterno} {$this->ApellidoMaterno}";
    }

    public function hasRole($roleName)
    {
        return $this->rol && $this->rol->nombre === $roleName;
    }

    // Relaciones con modelos del servidor antiguo
    public function login()
    {
        return $this->hasOne(UsuarioLogin::class, 'name', 'NombreUsuario');
    }

    public function servicio()
    {
        return $this->hasOne(UsuarioServicio::class, 'Segu_Usr_RUT', 'Rut');
    }

    public function profesional()
    {
        return $this->hasOne(ServicioProfesional::class, 'SER_PRO_Rut', 'Rut');
    }

    public function sistemas()
    {
        return $this->hasMany(UsuarioSistema::class, 'TAB_Login', 'NombreUsuario');
    }

    public function rolesSistema()
    {
        return $this->hasManyThrough(
            RolUsuarioSistema::class,
            UsuarioLogin::class,
            'name',             // Foreign key on UsuarioLogin table...
            'user_principal_id', // Foreign key on RolUsuarioSistema table...
            'NombreUsuario',    // Local key on User table...
            'principal_id'      // Local key on UsuarioLogin table...
        );
    }

    /**
     * Métodos requeridos por JWTSubject
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
