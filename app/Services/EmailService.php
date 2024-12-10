<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;

class EmailService
{
    /**
     * Envía un correo electrónico de recuperación de contraseña.
     *
     * @param string $email
     * @param string $resetLink
     * @return void
     */
    public function enviarCorreoRecuperacion($email, $resetLink)
    {
        Mail::send('emails.password_reset', ['link' => $resetLink], function ($message) use ($email) {
            $message->to($email)
                ->subject('Recuperación de Contraseña');
        });
    }
}
