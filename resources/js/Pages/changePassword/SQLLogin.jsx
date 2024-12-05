import React, { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";

const SQLLogin = () => {
    const { csrfToken } = usePage().props; // Obtener el token CSRF
    const [formData, setFormData] = useState({
        username: "",
        current_password: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async () => {
        if (!csrfToken) {
            setErrors({
                general: "Token CSRF no disponible. Inténtelo más tarde.",
            });
            return;
        }

        setIsSubmitting(true); // Mostrar indicador de carga

        try {
            const response = await fetch("/sql/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: JSON.stringify(formData),
            });

            // Manejar la respuesta
            if (response.ok) {
                const data = await response.json();
                window.location.href = data.redirect;
            } else {
                if (response.status === 422) {
                    const data = await response.json();
                    setErrors(data.errors || {});
                } else {
                    setErrors({
                        general:
                            "Error inesperado. Por favor, inténtelo más tarde.",
                    });
                }
            }
        } catch (error) {
            setErrors({
                general: "Error de conexión. Por favor, inténtelo más tarde.",
            });
        } finally {
            setIsSubmitting(false); // Ocultar indicador de carga
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">
            <div className="relative w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 z-10">
                <h1 className="text-3xl font-extrabold text-center mb-4 text-emerald-700">
                    Bienvenido
                </h1>

                {/* Mostrar errores generales */}
                {(errors.general || errors.authentication) && (
                    <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-400 text-red-700 flex items-start space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12h6m2 8H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v11a2 2 0 01-2 2z"
                            />
                        </svg>
                        <div>
                            {errors.general && <p>{errors.general}</p>}
                            {errors.authentication && (
                                <p>{errors.authentication}</p>
                            )}
                        </div>
                    </div>
                )}

                <form>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Nombre de Usuario
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Ingrese su usuario"
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.username}
                            </p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="current_password"
                            value={formData.current_password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Ingrese su contraseña"
                        />
                        {errors.current_password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.current_password}
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleLogin}
                        className={`w-full bg-emerald-600 text-white font-medium py-2 rounded-lg hover:bg-emerald-700 transition duration-200 shadow-md flex justify-center items-center space-x-2 ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8z"
                                    ></path>
                                </svg>
                                <span>Enviando...</span>
                            </>
                        ) : (
                            "Iniciar Sesión"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SQLLogin;
