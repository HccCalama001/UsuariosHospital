<?php
namespace App\Models\ServidorOld;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsuarioLogin extends Model
{
    use HasFactory;
    
    protected $connection = 'sqlsrv2';
    protected $table = 'sys.sql_logins';
    protected $primaryKey = 'principal_id';
    public $timestamps = false;

    protected $fillable = [
        'name', 
        'principal_id',
    ];

    protected $hidden = ['sid', 'password_hash'];

    // Relación corregida: Uno a uno con UsuarioServicio
    public function seguUsuario()
    {
        return $this->hasOne(UsuarioServicio::class, 'Segu_Usr_Cuenta', 'name');
    }



    public function roleUserSistema()
    {
        return $this->hasMany(RolUsuarioSistema::class, 'user_name', 'name')
                    ->vigencia();
    }
    

}
