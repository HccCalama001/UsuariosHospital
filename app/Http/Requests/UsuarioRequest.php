<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

/**
 * Class UsuarioRequest
 *
 * Valida los campos necesarios para las distintas acciones
 * relacionadas con usuarios: guardar datos, buscar usuario
 * y actualizar datos globalmente.
 */
class UsuarioRequest extends FormRequest
{
    /**
     * Maneja la validación fallida lanzando una excepción con la respuesta en formato JSON.
     *
     * @param  Validator  $validator
     * @throws HttpResponseException
     */
    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Errores de validación.',
                'errors'  => $validator->errors(),
            ], 422)
        );
    }

    /**
     * Determina si el usuario está autorizado para hacer esta petición.
     * Ajusta a 'false' o incluye lógica extra si necesitas autorización específica.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Define las reglas de validación según la ruta o método HTTP.
     *
     * @return array
     */
    public function rules(): array
    {
        // Determinar qué reglas usar según la ruta y el método
        if ($this->isMethod('post')) {
            if ($this->routeIs('usuario.guardarDatos')) {
                return $this->guardarDatosRules();
            }

            if ($this->routeIs('usuario.buscarUsuario')) {
                return $this->buscarUsuarioRules();
            }

            if ($this->routeIs('usuario.actualizarUsuarioGlobal')) {
                return $this->actualizarDatosRules();
            }
        }

        // Si no coincide con ninguna ruta específica, retornar un array vacío
        return [];
    }

    /**
     * Mensajes de error personalizados para cada regla de validación.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'name.required'                 => 'El campo Nombre es obligatorio.',
            'apellido_paterno.required'     => 'El Apellido Paterno es obligatorio.',
            'apellido_materno.required'     => 'El Apellido Materno es obligatorio.',
            'rut.required'                  => 'El RUT es obligatorio.',
            'rut.unique'                    => 'El RUT ya está registrado.',
            'email.required'                => 'El Correo Electrónico es obligatorio.',
            'email.email'                   => 'Debe proporcionar un correo electrónico válido.',
            'email.unique'                  => 'El correo electrónico ya está registrado.',
            'phone.required'                => 'El campo Teléfono es obligatorio.',
            'current_password.required'     => 'La Contraseña Actual es obligatoria.',
            'current_password.min'          => 'La Contraseña Actual debe tener al menos 8 caracteres.',
            'userLogin.required'            => 'El campo Usuario es obligatorio.',
            'nameuser.required'             => 'El Nombre de Usuario es obligatorio.',
        ];
    }

    /**
     * Reglas de validación para la búsqueda de usuario.
     *
     * @return array
     */
    private function buscarUsuarioRules(): array
    {
        return [
            'nameuser' => 'required|string',
        ];
    }

    /**
     * Reglas de validación para guardar datos de un usuario.
     *
     * @return array
     */
    private function guardarDatosRules(): array
    {
        return [
            'name'              => 'required|string|max:255',
            'apellido_paterno'  => 'required|string|max:255',
            'apellido_materno'  => 'required|string|max:255',
            'rut'               => 'required|string|unique:sqlsrvUsers.usuarios,Rut',
            'email'             => 'required|email|unique:sqlsrvUsers.usuarios,EmailUsuario',
            'phone'             => 'nullable|string|max:15',
            'current_password'  => 'required|string|min:8',
            'userLogin'         => 'required|string|max:255',
        ];
    }

    /**
     * Reglas de validación para actualizar datos globalmente de un usuario.
     *
     * @return array
     */
    private function actualizarDatosRules(): array
    {
        // Obtenemos el valor de userLogin del request
        $userLogin = $this->input('userLogin');

        return [
            'name'              => 'required|string|max:255',
            'apellido_paterno'  => 'required|string|max:255',
            'apellido_materno'  => 'required|string|max:255',
            'rut'               => "required|string|unique:sqlsrvUsers.usuarios,Rut,{$userLogin},NombreUsuario",
            'email'             => "required|email|unique:sqlsrvUsers.usuarios,EmailUsuario,{$userLogin},NombreUsuario",
            'phone'             => 'nullable|string|max:15',
            'userLogin'         => 'required|string|max:255',
        ];
    }
}