<?php

namespace App\Models\ServidorNew;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class PasswordReset
 *
 * Modelo que representa la tabla 'password_resets' en la conexión 'sqlsrvUsers'.
 * No maneja timestamps automáticamente (created_at, updated_at).
 *
 * @property string $email
 * @property string $token
 * @property string $created_at
 */
class PasswordReset extends Model
{
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
    protected $table = 'password_resets';

    /**
     * Indica que este modelo no gestionará automáticamente
     * las columnas created_at y updated_at.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * Atributos que se pueden asignar de forma masiva.
     *
     * @var array
     */
    protected $fillable = ['email', 'token', 'created_at'];

    /**
     * Relación con el modelo User.
     * Asume que la clave foránea es 'email' y
     * la clave primaria en la tabla de usuarios es 'EmailUsuario'.
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'email', 'EmailUsuario'); // Relación por `email`
    }
}
