import React from "react";
import {
    FaHome,
    FaUserAlt,
    FaSignOutAlt,
    FaFacebook,
    FaTwitter,
    FaInstagram,
} from "react-icons/fa";

const App = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Barra de Navegación */}
            <header className="bg-teal-600 text-white shadow">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Título del Panel */}
                    <h1 className="text-2xl font-semibold flex items-center">
                        <span className="mr-2 text-3xl">🌟</span>
                        Panel de Usuario
                    </h1>

                    {/* Menú de Navegación */}
                    <nav>
                        <ul className="flex space-x-6 items-center">
                            <li>
                                <a
                                    href="/"
                                    className="flex items-center hover:text-gray-200 transition"
                                >
                                    <FaHome className="w-5 h-5 mr-2" />
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/logout"
                                    className="flex items-center hover:text-gray-200 transition"
                                >
                                    <FaSignOutAlt className="w-5 h-5 mr-2" />
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="flex-grow">
                <div className="container mx-auto px-6 py-12">{children}</div>
            </main>

            {/* Pie de Página */}
            <footer className="bg-gray-900 text-gray-400 py-6">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm">
                        © {new Date().getFullYear()}{" "}
                        <span className="text-white font-medium">
                            Sistema Hospitalario
                        </span>
                        . Todos los derechos reservados.
                    </p>
                    <div className="mt-4 flex justify-center space-x-6">
                        <a
                            href="#"
                            className="text-gray-400 hover:text-white transition"
                            aria-label="Facebook"
                        >
                            <FaFacebook className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-white transition"
                            aria-label="Twitter"
                        >
                            <FaTwitter className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-white transition"
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
