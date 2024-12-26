<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class PasswordResetMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $resetLink;
    public $codAleatorio;

    /**
     * Crear una nueva instancia de mensaje.
     *
     * @param string $resetLink
     * @param string $codAleatorio
     */
    public function __construct($resetLink, $codAleatorio)
    {
        $this->resetLink = $resetLink;
        $this->codAleatorio = $codAleatorio;
    }

    /**
     * Construir el mensaje.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Recuperación de Contraseña')
                    ->view('emails.password_reset')
                    ->with([
                        'link' => $this->resetLink,
                        'code' => $this->codAleatorio,
                    ]);
    }
}
