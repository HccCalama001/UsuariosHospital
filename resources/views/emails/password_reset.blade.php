<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperación de Contraseña</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #e6fcf5; /* Fondo general */
            margin: 0;
            padding: 0;
            color: #333333;
        }
        .email-container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border: 1px solid #b8f2e6;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .email-header {
            background-color: #00bfa6; /* Verde principal */
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
        }
        .email-body p {
            font-size: 16px;
            line-height: 1.5;
        }
        .verification-code {
            display: block;
            font-size: 24px;
            font-weight: bold;
            color: #00bfa6;
            text-align: center;
            margin: 20px 0;
        }
        .email-body a {
            display: inline-block;
            background-color: #00bfa6; /* Verde principal */
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 10px;
            transition: background-color 0.3s ease;
        }
        .email-body a:hover {
            background-color: #008f7a; /* Verde oscuro */
        }
        .email-footer {
            background-color: #e0f7f3; /* Verde claro */
            color: #666666;
            padding: 10px;
            text-align: center;
            font-size: 12px;
        }
        .email-footer a {
            color: #00bfa6;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Recuperación de Contraseña</h1>
        </div>
        <div class="email-body">
            <p>Hola,</p>
            <p>Hemos recibido una solicitud para restablecer tu contraseña. Utiliza el siguiente código de verificación para continuar:</p>
            <span class="verification-code">{{ $code }}</span>
            <p>O haz clic en el botón a continuación para verificar tu código:</p>
            <p>
                <a href="{{ $link }}">Verificar Código</a>
            </p>
            <p>Si no solicitaste un cambio de contraseña, ignora este correo.</p>
            <p>Gracias,</p>
            <p>El equipo de soporte</p>
        </div>
        <div class="email-footer">
            <p>&copy; {{ date('Y') }} Tu Empresa. Todos los derechos reservados.</p>
            <p><a href="https://example.com/terminos">Términos y condiciones</a> | <a href="https://example.com/privacidad">Política de privacidad</a></p>
        </div>
    </div>
</body>
</html>