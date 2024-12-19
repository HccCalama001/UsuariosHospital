import React from "react";
import {
    FaHome,
    FaSignOutAlt,
    FaFacebook,
    FaTwitter,
    FaInstagram,
} from "react-icons/fa";

const App = ({ children }) => {
    const handleLogout = () => {
        // Eliminar el token de las cookies
        document.cookie =
            "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Redirigir a la página de inicio de sesión
        window.location.href = "/login";
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 font-poppins">
            {/* Barra de Navegación */}
            <header className="bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow fixed top-0 w-full z-50">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Título del Panel */}
                    <h1 className="text-2xl font-bold flex items-center">
                        Panel de Usuario
                    </h1>

                    {/* Menú de Navegación */}
                    <nav>
                        <ul className="flex space-x-6 items-center">
                            <li>
                                <a
                                    href="/usuario"
                                    className="flex items-center hover:text-gray-200 transition duration-200"
                                >
                                    <FaHome className="w-5 h-5 mr-2" />
                                    Inicio
                                </a>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center hover:text-gray-200 transition duration-200"
                                >
                                    <FaSignOutAlt className="w-5 h-5 mr-2" />
                                    Salir
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Espaciador para el header fijo */}
            <div className="h-16"></div>

            {/* Contenido Principal */}
            <main className="flex-grow">
                <div className="container mx-auto px-6 py-12">{children}</div>
            </main>

            {/* Pie de Página */}
            <footer className="bg-teal-700 text-gray-200 py-6">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm">
                        © {new Date().getFullYear()}{" "}
                        <span className="text-white font-semibold">
                            Sistema Hospitalario
                        </span>
                        . Todos los derechos reservados.
                    </p>
                    <div className="mt-4 flex justify-center space-x-6">
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white transition duration-200"
                            aria-label="Facebook"
                        >
                            <FaFacebook className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white transition duration-200"
                            aria-label="Twitter"
                        >
                            <FaTwitter className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white transition duration-200"
                            aria-label="Instagram"
                        >
                            <FaInstagram className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
