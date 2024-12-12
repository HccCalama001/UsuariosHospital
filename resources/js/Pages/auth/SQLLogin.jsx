import React, { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { authenticateUser } from "../../services/apiService";
import { Inertia } from "@inertiajs/inertia";

const SQLLogin = () => {
    const { csrfToken } = usePage().props;
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

    const getError = (field) => {
        const error = errors[field];
        return Array.isArray(error) ? error[0] : error;
    };

    const handleLogin = async () => {
        if (!csrfToken) {
            setErrors({
                general: "Token CSRF no disponible. Inténtelo más tarde.",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const data = await authenticateUser(formData, csrfToken);
            window.location.href = data.redirect;
        } catch (error) {
            if (error.errors) {
                setErrors(error.errors);
            } else {
                setErrors({
                    general:
                        "Error inesperado. Por favor, inténtelo más tarde.",
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 font-poppins">
            <div className="bg-white shadow-xl rounded-xl p-10 max-w-lg w-full">
                <h1 className="text-4xl font-bold text-teal-600 text-center mb-8">
                    Iniciar Sesión
                </h1>

                {(getError("general") || getError("authentication")) && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        {getError("general") && <p>{getError("general")}</p>}
                        {getError("authentication") && (
                            <p>{getError("authentication")}</p>
                        )}
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
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            placeholder="Ingrese su usuario"
                        />
                        {getError("username") && (
                            <p className="text-red-500 text-sm mt-1">
                                {getError("username")}
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
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            placeholder="Ingrese su contraseña"
                        />
                        {getError("current_password") && (
                            <p className="text-red-500 text-sm mt-1">
                                {getError("current_password")}
                            </p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={handleLogin}
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 bg-teal-600 text-white font-medium rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-200 ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {isSubmitting ? (
                            <svg
                                className="animate-spin h-5 w-5 mx-auto"
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
                        ) : (
                            "Iniciar Sesión"
                        )}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-6">
                    ¿Olvidaste tu contraseña?{" "}
                    <button
                        onClick={() => Inertia.get("forgot-password")}
                        className="text-teal-500 hover:underline"
                    >
                        Recuperar
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SQLLogin;
