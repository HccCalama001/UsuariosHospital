<?php

namespace App\Http\Controllers;

use App\Services\SistemaService; // Asegúrate de importar la clase correspondiente
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class SistemaController
 *
 * Controlador encargado de la lógica relacionada con la agrupación de sistemas.
 */
class SistemaController extends Controller
{
    /**
     * @var SistemaService
     */
    protected SistemaService $sistemaService;

    /**
     * SistemaController constructor.
     *
     * @param  SistemaService  $sistemaService
     */
    public function __construct(SistemaService $sistemaService)
    {
        $this->sistemaService = $sistemaService;
    }

    /**
     * Método que recibe un array de sistemas y devuelve la información con grupos.
     * (En caso de llamarse por ruta, se espera recibir un Request con el JSON).
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function agrupar(Request $request): JsonResponse
    {
        $usuarioSistemas = $request->input('usuarioSistema', []);

        $sistemasConGrupos = $this->sistemaService->obtenerGruposDeSistemas($usuarioSistemas);

        return response()->json($sistemasConGrupos);
    }
}
