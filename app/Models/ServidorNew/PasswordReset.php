<?php

namespace App\Models\ServidorNew;

use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    // Especificar la conexión a la base de datos (opcional si 'sql' es la predeterminada)
    protected $connection = 'sqlsrvUsers';
    protected $table = 'password_resets';
    public $timestamps = false; // La tabla no tiene `created_at` ni `updated_at`

    protected $fillable = ['email', 'token', 'created_at'];

    // Relación con el modelo User
    public function user()
    {
        return $this->belongsTo(User::class, 'email', 'EmailUsuario'); // Relación por `email`
    }
}
