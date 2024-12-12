import React, { useState } from "react";
import { guardarDatos } from "../../services/apiService";
import Cookies from "js-cookie"; // Para manejar cookies

const CompletarDatos = ({ userLogin, current_password, csrfToken }) => {
    const seguUsuario = userLogin?.userLogin?.segu_usuario || {};
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
    const [globalError, setGlobalError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        setGlobalError("");

        try {
            const responseData = await guardarDatos(formData, csrfToken);

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
            // Redirigir al inicio de sesión con un mensaje de éxito
            window.location.href = `/auth/login?success=${encodeURIComponent(
                "Usuario actualizado con éxito."
            )}`;
        } catch (error) {
            if (error.errors) {
                setErrors(error.errors);
            } else {
                setGlobalError(error.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 font-poppins">
            <div className="bg-white shadow-xl rounded-xl p-10 max-w-lg w-full">
                <h1 className="text-4xl font-bold text-teal-600 text-center mb-8">
                    Completar Datos Faltantes
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Por favor, completa los campos requeridos para continuar.
                </p>

                {globalError && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
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
                            className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                                errors.name
                                    ? "border-red-500"
                                    : "border-gray-300"
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
                            className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                                errors.apellido_paterno
                                    ? "border-red-500"
                                    : "border-gray-300"
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
                            className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                                errors.apellido_materno
                                    ? "border-red-500"
                                    : "border-gray-300"
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
                            className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                                errors.rut
                                    ? "border-red-500"
                                    : "border-gray-300"
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
                            className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
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
                            className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                                errors.phone
                                    ? "border-red-500"
                                    : "border-gray-300"
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
                        className={`w-full py-3 px-4 bg-teal-600 text-white font-medium rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-200 ${
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
