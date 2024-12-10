import React from "react";
import { FaHome } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";

const ErrorPage = ({ message = "La ruta solicitada no fue encontrada." }) => {
    const handleGoHome = () => {
        Inertia.get("/");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                    Oops! Página no encontrada
                </h2>
                <p className="text-gray-600 mt-2">{message}</p>
                <button
                    onClick={handleGoHome}
                    className="mt-6 px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
                >
                    <FaHome className="inline-block mr-2" />
                    Volver al Inicio
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
