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
        Log::info('=== [obtenerUsuarioGruposManual] INICIO ===');

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

        // Logueamos ambas colecciones
        Log::info('Codigos de ESCRITORIO: ', $codigosEscritorio->toArray());
        Log::info('Codigos de WEB: ', $codigosWeb->toArray());

        // 2) Cargar TODOS los grupos (sin Eloquent)
        $grupos = DB::connection('sqlsrvUsers')
            ->table('grupos_sistemas')
            ->select(
                'GrupoID',
                'NombreGrupo',
                'Url',
                'Descripcion',
                'Tipo',
                'created_at',
                'updated_at',
                'deleted_at'
            )
            ->whereNull('deleted_at') // Por si estás usando SoftDeletes
            ->get();

        // Logueamos la cantidad de grupos encontrados
        Log::info('Cantidad de grupos encontrados: ' . $grupos->count());

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

        // Logueamos la cantidad de sistemas encontrados
        Log::info('Cantidad de sistemas encontrados: ' . $sistemas->count());

        // 4) Agrupar los sistemas por su GrupoID
        $sistemasPorGrupo = $sistemas->groupBy('GrupoID');

        Log::info('Sistemas agrupados por GrupoID: ');
        foreach ($sistemasPorGrupo as $grupoID => $sist) {
            Log::info(" -> GrupoID $grupoID tiene " . $sist->count() . ' sistemas.');
        }

        // 5) Filtrar en memoria
        $gruposDelUsuario = [];

        foreach ($grupos as $grupo) {
            // Los sistemas de este grupo
            $sistDeEsteGrupo = $sistemasPorGrupo->get($grupo->GrupoID, collect());
            $tieneAcceso = false;

            // Log para cada grupo
            Log::info("Analizando GrupoID: {$grupo->GrupoID}, Tipo: {$grupo->Tipo}, Nombre: {$grupo->NombreGrupo}");

            foreach ($sistDeEsteGrupo as $sistema) {
                $codigoBD = trim($sistema->Codigo ?? '');

                if ($grupo->Tipo === 'escritorio') {
                    if ($codigosEscritorio->contains($codigoBD)) {
                        Log::info("   -> ¡Match! El usuario sí tiene acceso a este sistema de escritorio: $codigoBD");
                        $tieneAcceso = true;
                        break;
                    }
                } elseif ($grupo->Tipo === 'web') {
                    if ($codigosWeb->contains($codigoBD)) {
                        Log::info("   -> ¡Match! El usuario sí tiene acceso a este sistema web: $codigoBD");
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
                ];
            }
        }

        // 6) Log final de los grupos filtrados, usando JSON_UNESCAPED_UNICODE
        // para que los acentos no aparezcan como \u00f3, etc.
        Log::info(
            'Grupos del usuario (JSON sin escapar Unicode ni slashes): ' 
            . json_encode($gruposDelUsuario, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)
        );

        Log::info('=== [obtenerUsuarioGruposManual] FIN ===');

        return $gruposDelUsuario;
    }
}
