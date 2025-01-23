// src/services/authService.js

export const logoutUser = () => {
    // Elimina la cookie de autenticación
    document.cookie =
        "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.hospitalcalama.cl;";

    // Redirige a la pantalla de login
    window.location.href = "auth/login";
};
