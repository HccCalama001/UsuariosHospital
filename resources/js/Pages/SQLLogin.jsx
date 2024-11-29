import React from "react";
import { useForm } from "@inertiajs/inertia-react";

const SQLLogin = () => {
    const { data, setData, post, errors } = useForm({
        username: "",
        current_password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/sql-authenticate");
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">
            {/* Fondo Decorativo */}
            <div className="absolute inset-0 bg-opacity-20 bg-white mix-blend-overlay"></div>

            {/* Contenedor del Formulario */}
            <div className="relative w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 z-10">
                <h1 className="text-3xl font-extrabold text-center mb-4 text-emerald-700">
                    Bienvenido
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Por favor, ingrese sus credenciales para continuar
                </p>
                <form onSubmit={handleSubmit}>
                    {/* Campo de Nombre de Usuario */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Nombre de Usuario
                        </label>
                        <input
                            type="text"
                            value={data.username}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.username ? "border-red-500" : ""
                            }`}
                            placeholder="Ingrese su usuario"
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.username}
                            </p>
                        )}
                    </div>

                    {/* Campo de Contraseña */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Contraseña Actual
                        </label>
                        <input
                            type="password"
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.current_password ? "border-red-500" : ""
                            }`}
                            placeholder="Ingrese su contraseña actual"
                        />
                        {errors.current_password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.current_password}
                            </p>
                        )}
                    </div>

                    {/* Botón de Enviar */}
                    <button
                        type="submit"
                        className="w-full bg-emerald-600 text-white font-medium py-2 rounded-lg hover:bg-emerald-700 transition duration-200 shadow-md"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SQLLogin;
