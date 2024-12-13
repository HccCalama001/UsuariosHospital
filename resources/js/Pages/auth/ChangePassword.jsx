import React, { useState } from "react";

const ChangePassword = ({ token, csrfToken }) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                    // Enviar el token CSRF
                },
                body: JSON.stringify({
                    token,
                    new_password: newPassword,
                    password_confirmation: confirmPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.errors || "Error al cambiar la contraseña.");
            } else {
                setError(null); // Limpiar cualquier error previo
                setSuccessMessage(
                    data.message || "Contraseña cambiada con éxito."
                );
                // Redirigir si es necesario
                setTimeout(() => {
                    window.location.href = "/success-page"; // Redirigir después de un tiempo
                }, 2000);
            }
        } catch (err) {
            setError("Ocurrió un error inesperado.");
            console.error(err);
        }
    };

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
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            placeholder="Ingrese su nueva contraseña"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            placeholder="Confirme su nueva contraseña"
                            required
                        />
                    </div>

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
