<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class AuthRequest
 *
 * FormRequest personalizado para manejar la validación
 * según la ruta que se está utilizando. 
 */
class AuthRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para hacer esta petición.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        // Cambiar a 'false' o añadir lógica extra si se requiere autorización específica.
        return true;
    }

    /**
     * Define las reglas de validación basadas en la ruta que se llama.
     *
     * @return array
     */
    public function rules(): array
    {
        if ($this->routeIs('sqlpassword.authenticate')) {
            return $this->loginRules();
        }

        if ($this->routeIs('sqlpassword.update')) {
            return $this->updatePasswordRules();
        }

        if ($this->routeIs('sqlpassword.forgot')) {
            return $this->forgotPasswordRules();
        }

        if ($this->routeIs('verify-code')) {
            return $this->verifyCodeRules();
        }

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
            'username.required'               => 'El campo de usuario es obligatorio.',
            'current_password.required'       => 'El campo de contraseña actual es obligatorio.',
            'new_password.required'           => 'El campo de nueva contraseña es obligatorio.',
            'new_password.min'                => 'La nueva contraseña debe tener al menos 8 caracteres.',
            'new_password.regex'              => 'La nueva contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
            'new_password_confirmation.same'  => 'La confirmación de la contraseña no coincide.',
            'identifier.required'             => 'El identificador (correo o usuario) es obligatorio.',
            'identifier.string'               => 'El identificador debe ser un texto válido.',
            'code.required'                   => 'El código de verificación es obligatorio.',
            'code.string'                     => 'El código de verificación debe ser un texto válido.',
            'code.max'                        => 'El código de verificación no puede exceder los 10 caracteres.',
        ];
    }

    /**
     * Reglas de validación para el inicio de sesión.
     *
     * @return array
     */
    private function loginRules(): array
    {
        return [
            'username'         => 'required|string',
            'current_password' => 'required|string',
        ];
    }

    /**
     * Reglas de validación para actualizar la contraseña.
     *
     * @return array
     */
    private function updatePasswordRules(): array
    {
        return [
            'new_password' => [
                'required',
                'string',
                'min:8',
                'regex:/[A-Z]/',       // Al menos una letra mayúscula
                'regex:/[a-z]/',       // Al menos una letra minúscula
                'regex:/[0-9]/',       // Al menos un dígito
                'regex:/[@$!%*?&#.]/', // Al menos un carácter especial
            ],
            'new_password_confirmation' => 'required|same:new_password',
        ];
    }

    /**
     * Reglas de validación para la recuperación de contraseña (forgot password).
     *
     * @return array
     */
    private function forgotPasswordRules(): array
    {
        return [
            'identifier' => 'required|string',
        ];
    }

    /**
     * Reglas de validación para verificar el código de recuperación.
     *
     * @return array
     */
    private function verifyCodeRules(): array
    {
        return [
            'code' => 'required|string|max:10',
        ];
    }
}
