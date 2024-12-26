<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator; // Importar la clase correcta
use Illuminate\Support\Facades\Log;

class UsuarioRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Errores de validación.',
                'errors' => $validator->errors(), // Esto incluye los mensajes personalizados
            ], 422)
        );
    }

    public function authorize()
    {
        return true; // Cambiar según las necesidades de autorización
    }

    public function rules()
    {
     
        // Determinar qué reglas usar según la ruta o método
        if ($this->isMethod('post')) {
            if ($this->routeIs('usuario.guardarDatos')) {
                return $this->guardarDatosRules();
            }

            if ($this->routeIs('usuario.buscarUsuario')) {
                return $this->buscarUsuarioRules();
            }
            if ($this->routeIs('usuario.actualizarUsuarioGlobal')) {
               
                return $this->actualiarDatosRules();
            }
        }
        return [];
    }

    public function messages()
    {
        return [
            'name.required' => 'El campo Nombre es obligatorio.',
            'apellido_paterno.required' => 'El Apellido Paterno es obligatorio.',
            'apellido_materno.required' => 'El Apellido Materno es obligatorio.',
            'rut.required' => 'El RUT es obligatorio.',
            'rut.unique' => 'El RUT ya está registrado.',
            'email.required' => 'El Correo Electrónico es obligatorio.',
            'email.email' => 'Debe proporcionar un correo electrónico válido.',
            'email.unique' => 'El correo electrónico ya está registrado.',
            'phone.required' => 'El campo Teléfono es obligatorio.',
            'current_password.required' => 'La Contraseña Actual es obligatoria.',
            'current_password.min' => 'La Contraseña Actual debe tener al menos 8 caracteres.',
            'userLogin.required' => 'El campo Usuario es obligatorio.',
            'nameuser.required' => 'El Nombre de Usuario es obligatorio.',
        ];
    }

    private function buscarUsuarioRules()
    {
        return [
            'nameuser' => 'required|string',
        ];
    }

    private function guardarDatosRules()
    {
        return [
            'name' => 'required|string|max:255',
            'apellido_paterno' => 'required|string|max:255',
            'apellido_materno' => 'required|string|max:255',
            'rut' => 'required|string|unique:sqlsrvUsers.usuarios,Rut',
            'email' => 'required|email|unique:sqlsrvUsers.usuarios,EmailUsuario',
            'phone' => 'nullable|string|max:15',
            'current_password' => 'required|string|min:8',
            'userLogin' => 'required|string|max:255',
        ];
    }
    private function actualiarDatosRules()
    {
        $userLogin = $this->input('userLogin'); // Obtenemos el valor de userLogin del request
    
        return [
            'name' => 'required|string|max:255',
            'apellido_paterno' => 'required|string|max:255',
            'apellido_materno' => 'required|string|max:255',
            'rut' => "required|string|unique:sqlsrvUsers.usuarios,Rut,{$userLogin},NombreUsuario", // Excluir el registro actual por userLogin
            'email' => "required|email|unique:sqlsrvUsers.usuarios,EmailUsuario,{$userLogin},NombreUsuario", // Excluir el registro actual por userLogin
            'phone' => 'nullable|string|max:15',
            'userLogin' => 'required|string|max:255',
        ];
    }
    
}
