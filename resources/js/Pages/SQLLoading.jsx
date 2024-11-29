import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";

const SQLLoading = () => {
    const { errors } = usePage().props;
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!errors?.message) {
            // Llamar al backend para cerrar las sesiones
            Inertia.post(
                "/sql-close-sessions",
                {},
                {
                    onError: (response) => {
                        setError(
                            response.props.errors.message ||
                                "Error desconocido al cerrar las sesiones."
                        );
                    },
                }
            );
        } else {
            setError(errors.message);
        }
    }, []);

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-green-300 via-green-400 to-emerald-500">
            {/* Fondo Decorativo */}
            <div className="absolute inset-0 bg-opacity-25 bg-white mix-blend-overlay"></div>

            {/* Contenido */}
            <div className="relative w-full max-w-lg bg-white shadow-2xl rounded-2xl p-10 z-10 text-center">
                {error ? (
                    <>
                        <h1 className="text-3xl font-extrabold text-red-600 mb-4">
                            ¡Error!
                        </h1>
                        <p className="text-gray-700 mb-6">{error}</p>
                        <a
                            href="/sql-change-password"
                            className="inline-block bg-emerald-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-emerald-700 transition shadow-md"
                        >
                            Volver al cambio de contraseña
                        </a>
                    </>
                ) : (
                    <>
                        {/* Spinner */}
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-500 border-solid"></div>
                        </div>
                        <h1 className="text-2xl font-bold text-emerald-700 mt-6">
                            Procesando...
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Por favor, espera mientras cerramos las sesiones
                            activas.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default SQLLoading;
