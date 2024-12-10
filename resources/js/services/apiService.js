import Cookies from "js-cookie";

export const authenticateUser = async (formData, csrfToken) => {
    const response = await fetch("/sql/authenticate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
            "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
    }

    return await response.json();
};

export const guardarDatos = async (formData, csrfToken) => {
    const jwtToken = Cookies.get("auth_token");

    if (!jwtToken) {
        throw new Error(
            "Token de autenticación no encontrado. Por favor, inicie sesión nuevamente."
        );
    }

    const response = await fetch("guardar-datos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
            Authorization: `Bearer ${jwtToken}`,
            Accept: "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 422) {
            throw { errors: errorData.errors };
        } else {
            throw new Error(
                errorData.message || "Ocurrió un error inesperado."
            );
        }
    }

    return await response.json();
};

// apiService.js
export const cambiarContrasena = async (formData, csrfToken) => {
    const response = await fetch("/usuario/cambiar-contrasena", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
            Accept: "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 422) {
            throw { errors: errorData.errors };
        } else {
            throw new Error(
                errorData.message || "Ocurrió un error inesperado."
            );
        }
    }

    return await response.json();
};

// apiService.js
export const actualizarUsuario = async (formData, csrfToken) => {
    const response = await fetch(`/usuario/actualizar-global`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
            Accept: "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 422) {
            throw { errors: errorData.errors };
        } else {
            throw new Error(
                errorData.message || "Ocurrió un error inesperado."
            );
        }
    }

    return await response.json();
};
