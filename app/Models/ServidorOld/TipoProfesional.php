<?php

namespace App\Models\ServidorOld;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoProfesional extends Model
{
    use HasFactory;
    
    protected $connection = 'sqlsrv2';

    protected $table = 'TAB_TipoProfe';

    protected $primaryKey = 'TAB_Codigo';

    protected $fillable = [
        'TAB_Text',
    ];
    protected $hidden = [
        'TAB_Clasificacion',
    ];

    public $timestamps = false;

    public function servicioProfesional()
    {
        return $this->hasMany(ServicioProfesional::class,  'SER_PRO_Tipo', 'TAB_Codigo');
    }
}
