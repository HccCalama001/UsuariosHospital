<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\PasswordResetMail;

class EmailService
{
    /**
     * Envía un correo electrónico de recuperación de contraseña.
     *
     * @param string $email
     * @param string $resetLink
     * @return void
     */
    public function enviarCorreoRecuperacion($email, $resetLink,$codVery)
    {
        Log::info('Enviando correo de recuperación de contraseña a ' . $email);
        Mail::to($email)->send(new PasswordResetMail($resetLink,$codVery));
    }
}
