import React from "react";

const SQLPasswordSuccess = () => {
    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-green-300 via-green-400 to-emerald-500">
            {/* Fondo Decorativo */}
            <div className="absolute inset-0 bg-opacity-25 bg-white mix-blend-overlay"></div>

            {/* Contenedor */}
            <div className="relative w-full max-w-lg bg-white shadow-2xl rounded-2xl p-10 z-10 text-center">
                <h1 className="text-3xl font-extrabold text-emerald-700 mb-4">
                    ¡Contraseña Cambiada!
                </h1>
                <p className="text-gray-700 text-lg mb-6">
                    Tu contraseña se ha cambiado con éxito. Ahora puedes iniciar
                    sesión con tu nueva contraseña.
                </p>
                <a
                    href="/sql-login"
                    className="inline-block bg-emerald-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-emerald-700 transition duration-200 shadow-md"
                >
                    Volver al Inicio de Sesión
                </a>
            </div>
        </div>
    );
};

export default SQLPasswordSuccess;
