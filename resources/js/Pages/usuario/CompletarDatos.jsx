import React from "react";
import { useForm } from "@inertiajs/inertia-react";

const CompletarDatos = ({ userLogin, current_password }) => {
    const { data, setData, post, errors } = useForm({
        name: userLogin?.segu_usuario?.Segu_Usr_Nombre || "",
        apellido_paterno:
            userLogin?.segu_usuario?.Segu_Usr_ApellidoPaterno || "",
        apellido_materno:
            userLogin?.segu_usuario?.Segu_Usr_ApellidoMaterno || "",
        rut: userLogin?.segu_usuario?.Segu_Usr_RUT || "",
        email: userLogin?.segu_usuario?.email || "",
        phone: userLogin?.segu_usuario?.phone || "",
        current_password: current_password || "",
        userLogin: userLogin.name || "" || "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post("/guardar-datos");
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">
            {/* Fondo Decorativo */}
            <div className="absolute inset-0 bg-opacity-20 bg-white mix-blend-overlay"></div>

            {/* Contenedor del Formulario */}
            <div className="relative w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 z-10">
                <h1 className="text-3xl font-extrabold text-center mb-4 text-emerald-700">
                    Completar Datos Faltantes
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Por favor, completa los campos requeridos para continuar.
                </p>
                <form onSubmit={handleSubmit}>
                    {/* Campo de Nombre */}
                    <div className="mb-6">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.name ? "border-red-500" : ""
                            }`}
                            placeholder="Ingresa tu nombre"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Campo de Apellido Paterno */}
                    <div className="mb-6">
                        <label
                            htmlFor="apellido_paterno"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Apellido Paterno
                        </label>
                        <input
                            type="text"
                            id="apellido_paterno"
                            value={data.apellido_paterno}
                            onChange={(e) =>
                                setData("apellido_paterno", e.target.value)
                            }
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.apellido_paterno ? "border-red-500" : ""
                            }`}
                            placeholder="Ingresa tu apellido paterno"
                        />
                        {errors.apellido_paterno && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.apellido_paterno}
                            </p>
                        )}
                    </div>

                    {/* Campo de Apellido Materno */}
                    <div className="mb-6">
                        <label
                            htmlFor="apellido_materno"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Apellido Materno
                        </label>
                        <input
                            type="text"
                            id="apellido_materno"
                            value={data.apellido_materno}
                            onChange={(e) =>
                                setData("apellido_materno", e.target.value)
                            }
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.apellido_materno ? "border-red-500" : ""
                            }`}
                            placeholder="Ingresa tu apellido materno"
                        />
                        {errors.apellido_materno && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.apellido_materno}
                            </p>
                        )}
                    </div>

                    {/* Campo de RUT */}
                    <div className="mb-6">
                        <label
                            htmlFor="rut"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            RUT
                        </label>
                        <input
                            type="text"
                            id="rut"
                            value={data.rut}
                            onChange={(e) => setData("rut", e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.rut ? "border-red-500" : ""
                            }`}
                            placeholder="Ingresa tu RUT"
                        />
                        {errors.rut && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.rut}
                            </p>
                        )}
                    </div>

                    {/* Campo de Email */}
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.email ? "border-red-500" : ""
                            }`}
                            placeholder="Ingresa tu correo electrónico"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Campo de Teléfono */}
                    <div className="mb-6">
                        <label
                            htmlFor="phone"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Número de Teléfono
                        </label>
                        <input
                            type="text"
                            id="phone"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.phone ? "border-red-500" : ""
                            }`}
                            placeholder="Ingresa tu número de teléfono"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    <input
                        type="hidden"
                        id="current_password"
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                    />

                    {/* Botón de Guardar */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-emerald-600 text-white font-medium py-2 rounded-lg hover:bg-emerald-700 transition duration-200 shadow-md"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompletarDatos;
