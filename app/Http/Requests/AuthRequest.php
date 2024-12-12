<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

class AuthRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Cambiar según las necesidades de autorización
    }

    public function rules()
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

        return [];
    }

    public function messages()
    {
        return [
            'username.required' => 'El campo de usuario es obligatorio.',
            'current_password.required' => 'El campo de contraseña actual es obligatorio.',
            'new_password.required' => 'El campo de nueva contraseña es obligatorio.',
            'new_password.min' => 'La nueva contraseña debe tener al menos 8 caracteres.',
            'new_password.regex' => 'La nueva contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
            'new_password_confirmation.same' => 'La confirmación de la contraseña no coincide.',
            'identifier.required' => 'El identificador (correo o usuario) es obligatorio.',
            'identifier.string' => 'El identificador debe ser un texto válido.',
        ];
    }

    private function loginRules()
    {
        // Reglas para login
        $rules = [
            'username' => 'required|string',
            'current_password' => 'required|string',
        ];
        Log::info('Reglas de validación para inicio de sesión:', $rules);

        return $rules;
    }

    private function updatePasswordRules()
    {
        // Reglas para cambiar contraseña
        $rules = [
            'new_password' => [
                'required',
                'string',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[a-z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*?&#.]/',
            ],
            'new_password_confirmation' => 'required|same:new_password',
        ];
        Log::info('Reglas de validación para cambio de contraseña:', $rules);

        return $rules;
    }

    private function forgotPasswordRules()
    {
        // Reglas para recuperación de contraseña
        $rules = [
            'identifier' => 'required|string',
        ];
        Log::info('Reglas de validación para recuperación de contraseña:', $rules);

        return $rules;
    }
}
