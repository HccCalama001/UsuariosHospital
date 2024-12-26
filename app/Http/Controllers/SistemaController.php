<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SistemaController extends Controller
{
    protected $sistemaService;

    public function __construct(SistemaService $sistemaService)
    {
        $this->sistemaService = $sistemaService;
    }

    /**
     * Método que recibe un array de sistemas y devuelve la info con grupos.
     * (En caso de que lo llames por ruta, esperaría recibir un Request con el JSON)
     */
    public function agrupar(Request $request)
    {
        $usuarioSistemas = $request->input('usuarioSistema', []);

        $sistemasConGrupos = $this->sistemaService->obtenerGruposDeSistemas($usuarioSistemas);

        return response()->json($sistemasConGrupos);
    }
}
