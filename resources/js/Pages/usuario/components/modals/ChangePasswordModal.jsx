import React, { useState } from "react";
import { FaTimes, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { cambiarContrasena } from "../../../../services/apiService";

const ChangePasswordModal = ({ isOpen, onClose, csrfToken }) => {
    const [formData, setFormData] = useState({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [status, setStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === "new_password" || name === "new_password_confirmation") {
            setPasswordsMatch(
                name === "new_password"
                    ? value === formData.new_password_confirmation
                    : value === formData.new_password
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setStatus(null);
        setIsSubmitting(true);

        try {
            const response = await cambiarContrasena(formData, csrfToken);
            setStatus({
                type: "success",
                message: "Contraseña actualizada exitosamente.",
            });
            setFormData({
                current_password: "",
                new_password: "",
                new_password_confirmation: "",
            });
        } catch (error) {
            if (error.errors) {
                setErrors(error.errors);
            } else {
                setStatus({
                    type: "error",
                    message: error.message,
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg p-8">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-4">
                    <h2 className="text-2xl font-bold text-teal-600">
                        {status ? "Resultado" : "Cambiar Contraseña"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>

                {/* Contenido */}
                {status ? (
                    <div className="flex flex-col items-center justify-center mt-6 space-y-4">
                        {status.type === "success" ? (
                            <FaCheckCircle className="text-green-500 text-6xl" />
                        ) : (
                            <FaExclamationCircle className="text-red-500 text-6xl" />
                        )}
                        <p className="text-center text-lg font-medium">
                            {status.message}
                        </p>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition"
                        >
                            Cerrar
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        {/* Contraseña Actual */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Contraseña Actual
                            </label>
                            <input
                                type="password"
                                name="current_password"
                                value={formData.current_password}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                                    errors.current_password
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                placeholder="Ingresa tu contraseña actual"
                            />
                            {errors.current_password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.current_password[0]}
                                </p>
                            )}
                        </div>

                        {/* Nueva Contraseña */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Nueva Contraseña
                            </label>
                            <input
                                type="password"
                                name="new_password"
                                value={formData.new_password}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                                    !passwordsMatch
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                placeholder="Ingresa tu nueva contraseña"
                            />
                            {errors.new_password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.new_password[0]}
                                </p>
                            )}
                        </div>

                        {/* Confirmar Contraseña */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Confirmar Contraseña
                            </label>
                            <input
                                type="password"
                                name="new_password_confirmation"
                                value={formData.new_password_confirmation}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                                    !passwordsMatch
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                placeholder="Confirma tu nueva contraseña"
                            />
                            {!passwordsMatch && (
                                <p className="text-red-500 text-sm mt-1">
                                    Las contraseñas no coinciden.
                                </p>
                            )}
                        </div>

                        {/* Botones */}
                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || !passwordsMatch}
                                className={`px-6 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition ${
                                    isSubmitting || !passwordsMatch
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                {isSubmitting ? "Cambiando..." : "Cambiar"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ChangePasswordModal;
