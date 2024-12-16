import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import getCookie from "../../services/cookieService";

const ChangePassword = ({ token, csrfToken }) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState({
        newPassword: false,
        confirmPassword: false,
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const resetToken = getCookie("reset_token"); // Recuperar el token de la cookie

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                    Authorization: `Bearer ${resetToken}`, // Enviar el token en el encabezado
                },
                body: JSON.stringify({
                    token,
                    new_password: newPassword,
                    new_password_confirmation: confirmPassword,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                if (data.errors) {
                    const errorMessages = Object.values(data.errors)
                        .flat()
                        .join(" ");
                    setError(errorMessages);
                } else {
                    setError("Error al cambiar la contraseña.");
                }
            } else {
                setError(null);
                setSuccessMessage(
                    data.message || "Contraseña cambiada con éxito."
                );
                setTimeout(() => {
                    window.location.href = "login";
                }, 2000);
            }
        } catch (err) {
            setError("Ocurrió un error inesperado.");
            console.error(err);
        }
    };

    const renderPasswordInput = (label, value, setValue, field) => (
        <div className="mb-6 relative">
            <label className="block text-gray-700 font-medium mb-2">
                {label}
            </label>
            <div className="relative">
                <input
                    type={showPassword[field] ? "text" : "password"}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    placeholder={`Ingrese su ${label.toLowerCase()}`}
                    required
                />
                {value && (
                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword((prev) => ({
                                ...prev,
                                [field]: !prev[field],
                            }))
                        }
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                    >
                        {showPassword[field] ? <FaEyeSlash /> : <FaEye />}
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 font-poppins">
            <div className="bg-white shadow-xl rounded-xl p-10 max-w-lg w-full">
                <h1 className="text-4xl font-bold text-teal-600 text-center mb-8">
                    Cambiar Contraseña
                </h1>

                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        <p>{error}</p>
                    </div>
                )}

                {successMessage && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                        <p>{successMessage}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {renderPasswordInput(
                        "Nueva Contraseña",
                        newPassword,
                        setNewPassword,
                        "newPassword"
                    )}

                    {renderPasswordInput(
                        "Confirmar Contraseña",
                        confirmPassword,
                        setConfirmPassword,
                        "confirmPassword"
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-teal-600 text-white font-medium rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-200"
                    >
                        Cambiar Contraseña
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
