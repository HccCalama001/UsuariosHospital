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
    const [showChecklist, setShowChecklist] = useState(false);
    const [validationChecks, setValidationChecks] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
        match: false,
    });

    const resetToken = getCookie("reset_token"); // Recuperar el token de la cookie

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

    const handleNewPasswordChange = (e) => {
        const value = e.target.value;
        setNewPassword(value);

        // Mostrar el checklist solo si hay datos
        setShowChecklist(value.length > 0);
        validatePassword(value, confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        validatePassword(newPassword, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                    Authorization: `Bearer ${resetToken}`,
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

    const renderPasswordInput = (label, value, setValue, field, onChange) => (
        <div className="mb-6 relative">
            <label className="block text-gray-700 font-medium mb-2">
                {label}
            </label>
            <div className="relative">
                <input
                    type={showPassword[field] ? "text" : "password"}
                    value={value}
                    onChange={onChange}
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

    const renderValidationChecklist = () => (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm text-gray-700">
            <p className="font-semibold mb-2">
                La contraseña debe cumplir los siguientes requisitos:
            </p>
            <ul className="space-y-1">
                <li
                    className={
                        validationChecks.length
                            ? "text-green-600"
                            : "text-red-600"
                    }
                >
                    {validationChecks.length ? "✅" : "❌"} Entre 5 y 8
                    caracteres.
                </li>
                <li
                    className={
                        validationChecks.uppercase
                            ? "text-green-600"
                            : "text-red-600"
                    }
                >
                    {validationChecks.uppercase ? "✅" : "❌"} Al menos una letra
                    mayúscula.
                </li>
                <li
                    className={
                        validationChecks.lowercase
                            ? "text-green-600"
                            : "text-red-600"
                    }
                >
                    {validationChecks.lowercase ? "✅" : "❌"} Al menos una letra
                    minúscula.
                </li>
                <li
                    className={
                        validationChecks.number
                            ? "text-green-600"
                            : "text-red-600"
                    }
                >
                    {validationChecks.number ? "✅" : "❌"} Al menos un número.
                </li>
                <li
                    className={
                        validationChecks.special
                            ? "text-green-600"
                            : "text-red-600"
                    }
                >
                    {validationChecks.special ? "✅" : "❌"} Al menos un
                    carácter especial.
                </li>
                <li
                    className={
                        validationChecks.match
                            ? "text-green-600"
                            : "text-red-600"
                    }
                >
                    {validationChecks.match ? "✅" : "❌"} Las contraseñas deben
                    coincidir.
                </li>
            </ul>
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
                        "newPassword",
                        handleNewPasswordChange
                    )}

                    {showChecklist && renderValidationChecklist()}

                    {renderPasswordInput(
                        "Confirmar Contraseña",
                        confirmPassword,
                        setConfirmPassword,
                        "confirmPassword",
                        handleConfirmPasswordChange
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
