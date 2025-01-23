<?php

namespace App\Services;

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
        // Obtener los códigos de sistemas de escritorio y web
        $codigosEscritorio = collect($resumen['usuarioSistema'] ?? [])
            ->pluck('TAB_ID_Sistema')
            ->map(fn($cod) => trim($cod))
            ->unique();

        $codigosWeb = collect($resumen['usuarioSistemaWeb'] ?? [])
            ->pluck('sistema_id')
            ->map(fn($cod) => trim($cod))
            ->unique();
        Log::info($codigosWeb);

        // Obtener grupos y sistemas
        $grupos = DB::connection('sqlsrvUsers')
            ->table('grupos_sistemas')
            ->whereNull('deleted_at')
            ->get();

        $sistemas = DB::connection('sqlsrvUsers')
            ->table('sistema_consolidado')
            ->whereNull('deleted_at')
            ->get();

        // Agrupar los sistemas por su GrupoID
        $sistemasPorGrupo = $sistemas->groupBy('GrupoID');

        // Filtrar en memoria
        $gruposDelUsuario = $grupos->filter(function ($grupo) use ($sistemasPorGrupo, $codigosEscritorio, $codigosWeb) {
            $sistDeEsteGrupo = $sistemasPorGrupo->get($grupo->GrupoID, collect());
            $tieneAcceso = $grupo->Tipo === 'externo' || $sistDeEsteGrupo->contains(function ($sistema) use ($grupo, $codigosEscritorio, $codigosWeb) {
                $codigoBD = trim($sistema->Codigo ?? '');
                return ($grupo->Tipo === 'escritorio' && $codigosEscritorio->contains($codigoBD)) ||
                       ($grupo->Tipo === 'web' && $codigosWeb->contains($codigoBD));
            });

            if ($tieneAcceso) {
                $grupo->Url = $grupo->Url === 'Desconosido' ? 'Desconocido' : $grupo->Url;
                return true;
            }
            return false;
        })->map(function ($grupo) {
            return [
                'GrupoID'     => $grupo->GrupoID,
                'NombreGrupo' => $grupo->NombreGrupo,
                'Tipo'        => $grupo->Tipo,
                'Url'         => $grupo->Url,
                'imagen'      => $grupo->imagen,
            ];
        })->values()->all();

        Log::info($gruposDelUsuario);

        return $gruposDelUsuario;
    }
}