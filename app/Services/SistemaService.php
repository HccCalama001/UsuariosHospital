<?php

namespace App\Services;

use App\Models\ServidorNew\SistemaConsolidado;
use App\Models\ServidorNew\GruposSistema;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class SistemaService
{
    /**
     * Carga los datos de grupos y sistemas con consultas planas (sin Eloquent),
     * filtra en memoria según el JSON de resumen, y hace logs para debug.
     */
    public function obtenerUsuarioGrupos(array $resumen)
    {


        // 1) Obtener los códigos de sistemas de escritorio (usuarioSistema)
        //    y de sistemas web (usuarioSistemaWeb).
        $codigosEscritorio = collect($resumen['usuarioSistema'] ?? [])
            ->pluck('TAB_ID_Sistema')
            ->map(fn($cod) => trim($cod))
            ->unique();

        $codigosWeb = collect($resumen['usuarioSistemaWeb'] ?? [])
            ->pluck('sistema_id')
            ->map(fn($cod) => trim($cod))
            ->unique();

        // 2) Cargar TODOS los grupos (sin Eloquent)
        $grupos = DB::connection('sqlsrvUsers')
            ->table('grupos_sistemas')
            ->select(
                'GrupoID',
                'NombreGrupo',
                'Url',
                'Descripcion',
                'Tipo',
                'imagen',
                'created_at',
                'updated_at',
                'deleted_at'
            )
            ->whereNull('deleted_at') // Por si estás usando SoftDeletes
            ->get();


        // 3) Cargar TODOS los sistemas
        $sistemas = DB::connection('sqlsrvUsers')
            ->table('sistema_consolidado')
            ->select(
                'SistemaID',
                'Codigo',
                'Nombre',
                'Descripcion',
                'ValidaRUT',
                'UsuarioBD',
                'Vigencia',
                'GrupoID',
                'created_at',
                'updated_at',
                'deleted_at'
            )
            ->whereNull('deleted_at')
            ->get();


        // 4) Agrupar los sistemas por su GrupoID
        $sistemasPorGrupo = $sistemas->groupBy('GrupoID');


        // 5) Filtrar en memoria
        $gruposDelUsuario = [];

        foreach ($grupos as $grupo) {
            // Los sistemas de este grupo
            $sistDeEsteGrupo = $sistemasPorGrupo->get($grupo->GrupoID, collect());
            $tieneAcceso = false;



            foreach ($sistDeEsteGrupo as $sistema) {
                $codigoBD = trim($sistema->Codigo ?? '');

                if ($grupo->Tipo === 'escritorio') {
                    if ($codigosEscritorio->contains($codigoBD)) {
       
                        $tieneAcceso = true;
                        break;
                    }
                } elseif ($grupo->Tipo === 'web') {
                    if ($codigosWeb->contains($codigoBD)) {
                   
                        $tieneAcceso = true;
                        break;
                    }
                }
            }

            if ($tieneAcceso) {
                // Corrección si el campo 'Url' viene mal escrito como "Desconosido"
                // (lo ideal es corregirlo en la BD, pero aquí lo hacemos por si acaso).
                $urlGroup = $grupo->Url;
                if ($urlGroup === 'Desconosido') {
                    $urlGroup = 'Desconocido';
                }
            
                $gruposDelUsuario[] = [
                    'GrupoID'     => $grupo->GrupoID,
                    'NombreGrupo' => $grupo->NombreGrupo,
                    'Tipo'        => $grupo->Tipo,
                    'Url'         => $urlGroup,
                    'imagen'      => $grupo->imagen, 
                    
                ];
            }
        }
      
        return $gruposDelUsuario;
    }
}
