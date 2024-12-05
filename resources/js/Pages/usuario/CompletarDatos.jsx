import React, { useState } from "react";
import Cookies from "js-cookie"; // Para manejar cookies

const CompletarDatos = ({ userLogin, current_password, csrfToken }) => {
    const seguUsuario = userLogin?.userLogin?.segu_usuario || {}; // Validar existencia de segu_usuario
    const [formData, setFormData] = useState({
        name: seguUsuario?.Segu_Usr_Nombre || "",
        apellido_paterno: seguUsuario?.Segu_Usr_ApellidoPaterno || "",
        apellido_materno: seguUsuario?.Segu_Usr_ApellidoMaterno || "",
        rut: seguUsuario?.Segu_Usr_RUT || "",
        email: userLogin?.email || "",
        phone: userLogin?.phone || "",
        current_password: current_password || "",
        userLogin: userLogin?.userLogin?.name || "",
    });

    const [errors, setErrors] = useState({});
    const [globalError, setGlobalError] = useState(""); // Para manejar errores globales
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jwtToken = Cookies.get("auth_token");
        if (!jwtToken) {
            console.error("Token de autenticación no encontrado.");
            setGlobalError(
                "Token no encontrado. Por favor, inicie sesión nuevamente."
            );
            return;
        }

        setIsSubmitting(true);
        setErrors({});
        setGlobalError("");

        try {
            const response = await fetch("guardar-datos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                    Authorization: `Bearer ${jwtToken}`,
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();

                if (response.status === 422) {
                    setErrors(errorData.errors || {});
                } else {
                    setGlobalError(
                        errorData.message || "Ocurrió un error inesperado."
                    );
                }
            } else {
                const responseData = await response.json();
                alert(responseData.message); // Mensaje de éxito
                setFormData({
                    name: "",
                    apellido_paterno: "",
                    apellido_materno: "",
                    rut: "",
                    email: "",
                    phone: "",
                    current_password: "",
                    userLogin: "",
                }); // Reiniciar el formulario
            }
        } catch (error) {
            console.error("Error inesperado:", error.message);
            setGlobalError(
                "Error de conexión. Por favor, inténtelo más tarde."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">
            <div className="relative w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 z-10">
                <h1 className="text-3xl font-extrabold text-center mb-4 text-emerald-700">
                    Completar Datos Faltantes
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Por favor, completa los campos requeridos para continuar.
                </p>
                {globalError && (
                    <div className="mb-4 text-red-500 text-center">
                        {globalError}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    {/* Campo de Nombre */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.name ? "border-red-500" : ""
                            }`}
                            placeholder="Ingresa tu nombre"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name[0]}
                            </p>
                        )}
                    </div>

                    {/* Campo de Apellido Paterno */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Apellido Paterno
                        </label>
                        <input
                            type="text"
                            name="apellido_paterno"
                            value={formData.apellido_paterno}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.apellido_paterno ? "border-red-500" : ""
                            }`}
                            placeholder="Ingresa tu apellido paterno"
                        />
                        {errors.apellido_paterno && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.apellido_paterno[0]}
                            </p>
                        )}
                    </div>

                    {/* Campo de Apellido Materno */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Apellido Materno
                        </label>
                        <input
                            type="text"
                            name="apellido_materno"
                            value={formData.apellido_materno}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.apellido_materno ? "border-red-500" : ""
                            }`}
                            placeholder="Ingresa tu apellido materno"
                        />
                        {errors.apellido_materno && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.apellido_materno[0]}
                            </p>
                        )}
                    </div>

                    {/* Campo de RUT */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            RUT
                        </label>
                        <input
                            type="text"
                            name="rut"
                            value={formData.rut}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.rut ? "border-red-500" : ""
                            }`}
                            placeholder="Ingresa tu RUT"
                        />
                        {errors.rut && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.rut[0]}
                            </p>
                        )}
                    </div>

                    {/* Campo de Email */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.email ? "border-red-500" : ""
                            }`}
                            placeholder="Ingresa tu correo electrónico"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email[0]}
                            </p>
                        )}
                    </div>

                    {/* Campo de Teléfono */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.phone ? "border-red-500" : ""
                            }`}
                            placeholder="Ingresa tu teléfono"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone[0]}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-emerald-600 text-white font-medium py-2 rounded-lg hover:bg-emerald-700 transition duration-200 shadow-md ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {isSubmitting ? "Enviando..." : "Guardar"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompletarDatos;
