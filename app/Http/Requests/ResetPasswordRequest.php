<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

/**
 * Class ResetPasswordRequest
 *
 * FormRequest encargado de validar los campos necesarios
 * para el reseteo de contraseña, incluyendo el token y la nueva contraseña.
 */
class ResetPasswordRequest extends FormRequest
{
    /**
     * Lanza una excepción con respuesta JSON cuando la validación falla.
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
     * Determina si el usuario está autorizado para realizar esta petición.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        // Cambiar si se necesita una autorización específica
        return true;
    }

    /**
     * Reglas de validación para el reseteo de contraseña.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'token' => 'required|string',
            'new_password' => [
                'required',
                'string',
                'min:5',
                'max:8',
                'regex:/[A-Z]/',        // Al menos una letra mayúscula
                'regex:/[a-z]/',        // Al menos una letra minúscula
                'regex:/[0-9]/',        // Al menos un dígito
                'regex:/[@$!%*?&#.]/',  // Al menos un carácter especial
                'confirmed',            // Validar que coincida con password_confirmation
            ],
            'new_password_confirmation' => 'required|string',
        ];
    }

    /**
     * Mensajes de error personalizados para cada regla de validación.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'token.required'            => 'El token de recuperación es obligatorio.',
            'new_password.required'     => 'La nueva contraseña es obligatoria.',
            'new_password.min'          => 'La nueva contraseña debe tener al menos 5 caracteres.',
            'new_password.max'          => 'La nueva contraseña debe tener como máximo 8 caracteres.',
            'new_password.regex'        => 'La nueva contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
            'new_password.confirmed'    => 'La confirmación de la nueva contraseña no coincide.',
        ];
    }
}
