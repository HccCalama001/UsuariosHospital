import React from "react";
import { FaHome } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";

const ErrorPage = ({ message = "La ruta solicitada no fue encontrada." }) => {
    const handleGoHome = () => {
        Inertia.get("/");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
            <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg text-center">
                <h1 className="text-9xl font-extrabold text-red-500">404</h1>
                <h2 className="text-3xl font-semibold text-gray-800 mt-6">
                    ¡Oops! Página no encontrada
                </h2>
                <p className="text-gray-600 mt-4 text-sm">{message}</p>
                <button
                    onClick={handleGoHome}
                    className="mt-8 px-6 py-3 bg-teal-600 text-white text-lg font-medium rounded-full shadow-md hover:bg-teal-700 hover:shadow-lg transition"
                >
                    <FaHome className="inline-block mr-2" />
                    Volver al Inicio
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
