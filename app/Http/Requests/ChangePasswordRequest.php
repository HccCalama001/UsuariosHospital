<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator; // Importar la clase correcta

class ChangePasswordRequest extends FormRequest
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
        return true; // Cambiar si necesitas autorización específica
    }

    public function rules()
    {
        return [
            'current_password' => 'required|string',
            'new_password' => [
                'required',
                'string',
                'max:8',
                'min:5',
                'regex:/[A-Z]/',
                'regex:/[a-z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*?&#.]/',
            ]
        ];
    }

    public function messages()
    {
        return [
            'current_password.required' => 'La contraseña actual es obligatoria.',
            'new_password.required' => 'La nueva contraseña es obligatoria.',
            'new_password.min' => 'La nueva contraseña debe tener al menos 5 caracteres.',
            'new_password.max' => 'La nueva contraseña debe tener como maximo 8 caracteres.',
            'new_password.regex' => 'La nueva contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
            'new_password.confirmed' => 'La confirmación de la nueva contraseña no coincide.',
        ];
    }
}
