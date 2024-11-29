import React from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";

const SQLChangePassword = () => {
    const { username } = usePage().props; // Obtener el username desde las props
    const { data, setData, post, errors } = useForm({
        new_password: "",
        new_password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/sql-update-password");
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">
            {/* Fondo Decorativo */}
            <div className="absolute inset-0 bg-opacity-20 bg-white mix-blend-overlay"></div>

            {/* Contenedor del Formulario */}
            <div className="relative w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 z-10">
                <h1 className="text-3xl font-bold text-center mb-6 text-emerald-700">
                    Cambiar Contraseña
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Usuario:{" "}
                    <span className="font-medium text-gray-800">
                        {username}
                    </span>
                </p>
                <form onSubmit={handleSubmit}>
                    {/* Campo de Nueva Contraseña */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            value={data.new_password}
                            onChange={(e) =>
                                setData("new_password", e.target.value)
                            }
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.new_password ? "border-red-500" : ""
                            }`}
                            placeholder="Ingrese su nueva contraseña"
                        />
                        {errors.new_password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.new_password}
                            </p>
                        )}
                    </div>

                    {/* Campo de Confirmar Contraseña */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Confirmar Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            value={data.new_password_confirmation}
                            onChange={(e) =>
                                setData(
                                    "new_password_confirmation",
                                    e.target.value
                                )
                            }
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.new_password_confirmation
                                    ? "border-red-500"
                                    : ""
                            }`}
                            placeholder="Confirme su nueva contraseña"
                        />
                        {errors.new_password_confirmation && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.new_password_confirmation}
                            </p>
                        )}
                    </div>

                    {/* Botón de Cambiar Contraseña */}
                    <button
                        type="submit"
                        className="w-full bg-emerald-600 text-white font-medium py-2 rounded-lg hover:bg-emerald-700 transition duration-200 shadow-md"
                    >
                        Cambiar Contraseña
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SQLChangePassword;
