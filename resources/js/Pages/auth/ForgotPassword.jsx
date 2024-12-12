import React, { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

const ForgotPassword = () => {
    const { csrfToken } = usePage().props;
    const [formData, setFormData] = useState({
        identifier: "", // Puede ser nombre de usuario o correo electrónico
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState(null);
    const [errors, setErrors] = useState(null);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(null);
        setErrors(null);

        try {
            const response = await fetch("/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setStatus({
                    type: "success",
                    message:
                        data.message ||
                        "Si el identificador es válido, recibirás un correo electrónico con instrucciones para recuperar tu contraseña.",
                });
            } else if (response.status === 422) {
                const data = await response.json();
                setErrors(data.errors || {});
            } else {
                setStatus({
                    type: "error",
                    message: "Algo salió mal. Inténtalo nuevamente más tarde.",
                });
            }
        } catch (error) {
            setStatus({
                type: "error",
                message: "Error de conexión. Por favor, inténtalo nuevamente.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 font-poppins">
            <div className="bg-white shadow-xl rounded-xl p-10 max-w-lg w-full">
                <h1 className="text-4xl font-bold text-teal-600 text-center mb-8">
                    Recuperar Contraseña
                </h1>
                {status && (
                    <div
                        className={`mb-6 p-4 rounded ${
                            status.type === "success"
                                ? "bg-green-100 text-green-700 border border-green-400"
                                : "bg-red-100 text-red-700 border border-red-400"
                        }`}
                    >
                        {status.message}
                    </div>
                )}
                {errors && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        {errors.identifier && (
                            <p>{errors.identifier.join(", ")}</p>
                        )}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Nombre de Usuario o Correo Electrónico
                        </label>
                        <input
                            type="text"
                            name="identifier"
                            value={formData.identifier}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            placeholder="Ingrese su nombre de usuario o correo electrónico"
                            required
                        />
                    </div>
                    <button
                        type="submit"
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
                            "Recuperar Contraseña"
                        )}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-6">
                    ¿Recordaste tu contraseña?{" "}
                    <button
                        onClick={() => Inertia.get("login")}
                        className="text-teal-500 hover:underline"
                    >
                        Iniciar Sesion
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
