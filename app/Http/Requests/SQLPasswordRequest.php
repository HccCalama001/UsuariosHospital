<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

class SQLPasswordRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Cambiar según las necesidades de autorización
    }

    public function rules()
    {
        // Log de la ruta y método actuales
        Log::info('Ruta actual en SQLPasswordRequest:', ['route' => $this->route()->getName()]);
        Log::info('Método HTTP en SQLPasswordRequest:', ['method' => $this->method()]);

        if ($this->routeIs('sqlpassword.authenticate')) {
            Log::info('Validando reglas para inicio de sesión.', ['input' => $this->all()]);
            return $this->loginRules();
        }

        if ($this->routeIs('sqlpassword.update')) {
            Log::info('Validando reglas para cambio de contraseña.', ['input' => $this->all()]);
            return $this->updatePasswordRules();
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
        ];
    }

    private function loginRules()
    {
        // Log de las reglas aplicadas para el login
        $rules = [
            'username' => 'required|string',
            'current_password' => 'required|string',
        ];
        Log::info('Reglas de validación para inicio de sesión:', $rules);

        return $rules;
    }

    private function updatePasswordRules()
    {
        // Log de las reglas aplicadas para cambio de contraseña
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
}
