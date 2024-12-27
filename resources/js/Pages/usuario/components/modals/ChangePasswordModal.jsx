import React, { useState, useEffect } from "react";
import {
    FaTimes,
    FaCheckCircle,
    FaExclamationCircle,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";
import { cambiarContrasena } from "../../../../services/apiService";

const ChangePasswordModal = ({ isOpen, onClose, csrfToken }) => {
    const [formData, setFormData] = useState({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const [validationChecks, setValidationChecks] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
        match: false,
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState({
        current_password: false,
        new_password: false,
        new_password_confirmation: false,
    });
    const [showChecklist, setShowChecklist] = useState(false);

    // Restablecer el estado interno al abrir el modal
    useEffect(() => {
        if (isOpen) {
            setFormData({
                current_password: "",
                new_password: "",
                new_password_confirmation: "",
            });
            setValidationChecks({
                length: false,
                uppercase: false,
                lowercase: false,
                number: false,
                special: false,
                match: false,
            });
            setErrors({});
            setStatus(null);
            setIsSubmitting(false);
            setShowChecklist(false);
        }
    }, [isOpen]);

    const validatePassword = (password, confirmPassword) => {
        setValidationChecks({
            length: password.length >= 5 && password.length <= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[@$!%*?&#.]/.test(password),
            match: password === confirmPassword,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === "new_password" || name === "new_password_confirmation") {
            validatePassword(
                name === "new_password" ? value : formData.new_password,
                name === "new_password_confirmation" ? value : formData.new_password
            );

            setShowChecklist(value.length > 0);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setStatus(null);
        setIsSubmitting(true);

        try {
            await cambiarContrasena(formData, csrfToken);
            setStatus({
                type: "success",
                message: "Contraseña actualizada exitosamente.",
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

    const renderPasswordInput = (name, placeholder, label) => (
        <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">{label}</label>
            <div className="relative">
                <input
                    type={showPassword[name] ? "text" : "password"}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${errors[name] ? "border-red-500" : "border-gray-300"
                        }`}
                    placeholder={placeholder}
                />
                {formData[name] && (
                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword((prev) => ({
                                ...prev,
                                [name]: !prev[name],
                            }))
                        }
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                    >
                        {showPassword[name] ? <FaEyeSlash /> : <FaEye />}
                    </button>
                )}
            </div>
            {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name][0]}</p>
            )}
        </div>
    );

    const renderValidationChecklist = () => (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm text-gray-700">
            <p className="font-semibold mb-2">La contraseña debe cumplir los siguientes requisitos:</p>
            <ul className="space-y-1">
                <li className={validationChecks.length ? "text-green-600" : "text-red-600"}>
                    {validationChecks.length ? "✅" : "❌"} Entre 5 y 8 caracteres.
                </li>
                <li className={validationChecks.uppercase ? "text-green-600" : "text-red-600"}>
                    {validationChecks.uppercase ? "✅" : "❌"} Al menos una letra mayúscula.
                </li>
                <li className={validationChecks.lowercase ? "text-green-600" : "text-red-600"}>
                    {validationChecks.lowercase ? "✅" : "❌"} Al menos una letra minúscula.
                </li>
                <li className={validationChecks.number ? "text-green-600" : "text-red-600"}>
                    {validationChecks.number ? "✅" : "❌"} Al menos un número.
                </li>
                <li className={validationChecks.special ? "text-green-600" : "text-red-600"}>
                    {validationChecks.special ? "✅" : "❌"} Al menos un carácter especial.
                </li>
                <li className={validationChecks.match ? "text-green-600" : "text-red-600"}>
                    {validationChecks.match ? "✅" : "❌"} Las contraseñas deben coincidir.
                </li>
            </ul>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg p-8">
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
                {status ? (
                    <div className="flex flex-col items-center justify-center mt-6 space-y-4">
                        {status.type === "success" ? (
                            <FaCheckCircle className="text-green-500 text-6xl" />
                        ) : (
                            <FaExclamationCircle className="text-red-500 text-6xl" />
                        )}
                        <p className="text-center text-lg font-medium">{status.message}</p>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition"
                        >
                            Cerrar
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        {renderPasswordInput("current_password", "Ingresa tu contraseña actual", "Contraseña Actual")}
                        {renderPasswordInput("new_password", "Ingresa tu nueva contraseña", "Nueva Contraseña")}
                        {showChecklist && renderValidationChecklist()}
                        {renderPasswordInput("new_password_confirmation", "Confirma tu nueva contraseña", "Confirmar Contraseña")}
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
                                disabled={
                                    isSubmitting ||
                                    !Object.values(validationChecks).every((check) => check)
                                }
                                className={`px-6 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition ${isSubmitting ||
                                    !Object.values(validationChecks).every((check) => check)
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
