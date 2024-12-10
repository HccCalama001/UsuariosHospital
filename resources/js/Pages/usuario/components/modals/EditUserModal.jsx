import React, { useState, useEffect } from "react";
import { FaTimes, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const EditUserModal = ({
    isOpen,
    onClose,
    csrfToken,
    userData,
    userLoginData,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        apellido_paterno: "",
        apellido_materno: "",
        rut: "",
        email: "",
        phone: "",
        userLogin: "",
    });

    const [initialFormData, setInitialFormData] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (userData) {
            const initialData = {
                name: userData.Nombre || "",
                apellido_paterno: userData.ApellidoPaterno || "",
                apellido_materno: userData.ApellidoMaterno || "",
                rut: userData.Rut || "",
                email: userData.EmailUsuario || "",
                phone: userData.NumeroTelefono || "",
                userLogin: userData.NombreUsuario || "",
            };
            setFormData(initialData);
            setInitialFormData(initialData);
        }
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setStatus(null);
        setIsSubmitting(true);

        try {
            const response = await fetch(`/usuario/actualizar-global`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 422) {
                    setErrors(errorData.errors || {});
                } else {
                    setStatus({
                        type: "error",
                        message:
                            errorData.message || "Ocurrió un error inesperado.",
                    });
                }
            } else {
                setStatus({
                    type: "success",
                    message: "Usuario actualizado exitosamente.",
                });
            }
        } catch (error) {
            setStatus({
                type: "error",
                message: "Error de conexión. Inténtelo más tarde.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const hasChanges = () => {
        if (!initialFormData) return false;
        // Verificar si algún campo difiere entre initialFormData y formData
        for (const key in formData) {
            // Ignorar current_password porque siempre vendrá vacío al inicio
            if (key === "current_password") continue;
            if (formData[key] !== initialFormData[key]) {
                return true;
            }
        }
        return false;
    };

    const handleClose = () => {
        onClose();
        // Si la actualización fue exitosa, recargamos la página al cerrar el modal
        if (status && status.type === "success") {
            window.location.reload();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {status ? "Resultado" : "Editar Usuario"}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <FaTimes size={20} />
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
                            onClick={handleClose}
                            className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition"
                        >
                            Cerrar
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        <h3 className="text-lg font-medium text-gray-800">
                            Datos Personales
                        </h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Usuario (No Editable)
                            </label>
                            <input
                                type="text"
                                name="userLogin"
                                value={formData.userLogin}
                                readOnly={true}
                                className={`mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 ${
                                    errors.userLogin
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } focus:ring-2 focus:ring-teal-500 cursor-not-allowed`}
                            />
                            {errors.userLogin && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.userLogin[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Nombre
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`mt-1 w-full px-4 py-2 border rounded-md ${
                                    errors.name
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } focus:ring-2 focus:ring-teal-500`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name[0]}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Apellido Paterno
                                </label>
                                <input
                                    type="text"
                                    name="apellido_paterno"
                                    value={formData.apellido_paterno}
                                    onChange={handleInputChange}
                                    className={`mt-1 w-full px-4 py-2 border rounded-md ${
                                        errors.apellido_paterno
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } focus:ring-2 focus:ring-teal-500`}
                                />
                                {errors.apellido_paterno && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.apellido_paterno[0]}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Apellido Materno
                                </label>
                                <input
                                    type="text"
                                    name="apellido_materno"
                                    value={formData.apellido_materno}
                                    onChange={handleInputChange}
                                    className={`mt-1 w-full px-4 py-2 border rounded-md ${
                                        errors.apellido_materno
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } focus:ring-2 focus:ring-teal-500`}
                                />
                                {errors.apellido_materno && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.apellido_materno[0]}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                RUT
                            </label>
                            <input
                                type="text"
                                name="rut"
                                value={formData.rut}
                                onChange={handleInputChange}
                                className={`mt-1 w-full px-4 py-2 border rounded-md ${
                                    errors.rut
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } focus:ring-2 focus:ring-teal-500`}
                            />
                            {errors.rut && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.rut[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`mt-1 w-full px-4 py-2 border rounded-md ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } focus:ring-2 focus:ring-teal-500`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Número de Teléfono
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`mt-1 w-full px-4 py-2 border rounded-md ${
                                    errors.phone
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } focus:ring-2 focus:ring-teal-500`}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.phone[0]}
                                </p>
                            )}
                        </div>

                        {/* Botones */}
                        <div className="flex justify-end space-x-3 mt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || !hasChanges()}
                                className={`px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition ${
                                    isSubmitting || !hasChanges()
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                {isSubmitting ? "Guardando..." : "Guardar"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditUserModal;
