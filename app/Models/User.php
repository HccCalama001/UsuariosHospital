<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, SoftDeletes;

    // Definir la conexión (opcional si usas varias conexiones)
    protected $connection = 'default_connection'; // Cambia si necesitas otra conexión

    // Definir la tabla asociada
    protected $table = 'usuarios';

    // Definir la clave primaria
    protected $primaryKey = 'id';

    // Definir los campos asignables masivamente
    protected $fillable = [
        'NombreUsuario',          // Nombre de usuario
        'EmailUsuario',           // Correo electrónico
        'Rut',                    // RUT o identificador único
        'password',               // Contraseña para autenticación
        'RolID',                  // Identificador del rol
        'NumeroTelefono',         // Teléfono del usuario
        'Segu_Usr_Cuenta',        // Cuenta del sistema (alias)
        'Segu_Usr_Nombre',        // Nombre del usuario
        'Segu_Usr_ApellidoPaterno', // Apellido paterno
        'Segu_Usr_ApellidoMaterno', // Apellido materno
        'TAB_Login',              // Usuario para el sistema
        'role_id',                // Rol asignado al usuario
        'SER_PRO_Rut',            // RUT del profesional
        'SER_PRO_Nombres',        // Nombre del profesional
        'SER_PRO_ApellPater',     // Apellido paterno del profesional
        'SER_PRO_ApellMater',     // Apellido materno del profesional
    ];

    // Ocultar campos sensibles en las respuestas JSON
    protected $hidden = [
        'password', 
        'Remember_token',
    ];

    // Definir fechas que serán gestionadas automáticamente
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * Relación con tokens de API (Sanctum)
     */
    public function tokens()
    {
        return $this->hasMany(\Laravel\Sanctum\PersonalAccessToken::class, 'tokenable_id');
    }

    // Relaciones adicionales

    // Relación con UsuarioLogin
    public function login()
    {
        return $this->hasOne(UsuarioLogin::class, 'principal_id', 'id');
    }

    // Relación con UsuarioServicio
    public function servicio()
    {
        return $this->hasOne(UsuarioServicio::class, 'Segu_Usr_RUT', 'Rut');
    }

    // Relación con UsuarioProfesional
    public function profesional()
    {
        return $this->hasOne(UsuarioProfesional::class, 'id', 'id');
    }

    // Relación con UsuarioSistema
    public function sistema()
    {
        return $this->hasMany(UsuarioSistema::class, 'TAB_Login', 'id');
    }

    // Relación con RolUsuarioSistema
    public function rolesSistema()
    {
        return $this->hasMany(RolUsuarioSistema::class, 'user_principal_id', 'id');
    }

    // Relación con ServicioProfesional
    public function serviciosProfesionales()
    {
        return $this->hasMany(ServicioProfesional::class, 'SER_PRO_Rut', 'Rut');
    }

    // Accesores y Mutadores

    // Accesor para obtener el nombre completo del usuario
    public function getNombreCompletoAttribute()
    {
        if ($this->servicio) {
            return "{$this->servicio->Segu_Usr_Nombre} {$this->servicio->Segu_Usr_ApellidoPaterno} {$this->servicio->Segu_Usr_ApellidoMaterno}";
        }

        return "{$this->SER_PRO_Nombres} {$this->SER_PRO_ApellPater} {$this->SER_PRO_ApellMater}" ?: $this->NombreUsuario;
    }

    // Método para verificar roles
    public function hasRole($role)
    {
        if ($this->rolesSistema()->where('role_id', $role)->exists()) {
            return true;
        }

        return false;
    }
}
