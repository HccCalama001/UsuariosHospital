import React, { useState } from "react";
import {
    FaHome,
    FaSignOutAlt,
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaBars,
    FaTimes,
} from "react-icons/fa";

/**
 * Layout principal con:
 * - Header fijo con menú desktop/mobile
 * - Footer con borde diagonal en lugar de ola
 * - Responsividad y transiciones sutiles
 */
const App = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    // Cierra sesión eliminando la cookie y redireccionando
    const handleLogout = () => {
        document.cookie =
            "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "auth/login";
    };

    // Alterna el menú móvil
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-poppins relative w-full">
            {/* HEADER fijo */}
            <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg">
                <div className="flex items-center justify-between px-6 py-4">
                    {/* LOGO / TÍTULO */}
                    <a href="/usuario" className="flex items-center space-x-2">
                        <span className="text-2xl font-extrabold tracking-wide">
                            Panel de Usuario
                        </span>
                    </a>

                    {/* Navegación Desktop */}
                    <nav className="hidden md:flex space-x-8 items-center">
                        <a
                            href="/usuario"
                            className="flex items-center hover:text-gray-200 transition-colors"
                        >
                            <FaHome className="w-5 h-5 mr-2" />
                            Inicio
                        </a>
                        <button
                            onClick={handleLogout}
                            className="flex items-center hover:text-gray-200 transition-colors"
                        >
                            <FaSignOutAlt className="w-5 h-5 mr-2" />
                            Salir
                        </button>
                    </nav>

                    {/* Botón para abrir/cerrar el menú móvil */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-white hover:text-gray-200 transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {menuOpen ? (
                            <FaTimes className="w-6 h-6" />
                        ) : (
                            <FaBars className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Menú móvil (solo se muestra si menuOpen es true) */}
                {menuOpen && (
                    <div className="md:hidden bg-teal-700">
                        <nav className="flex flex-col space-y-4 px-6 py-4">
                            <a
                                href="/usuario"
                                className="flex items-center hover:text-gray-200 transition-colors"
                            >
                                <FaHome className="w-5 h-5 mr-2" />
                                Inicio
                            </a>
                            <button
                                onClick={handleLogout}
                                className="flex items-center hover:text-gray-200 transition-colors"
                            >
                                <FaSignOutAlt className="w-5 h-5 mr-2" />
                                Salir
                            </button>
                        </nav>
                    </div>
                )}
            </header>

            {/* Espaciador para no tapar el contenido con el Header fijo */}
            <div className="h-16" />
            {/**
             * MAIN:
             *  - flex-grow: ocupa el espacio vertical sobrante
             *  - relative + z-10: mantiene el contenido sobre posibles capas del footer
             *  - pb-16: deja un margen al final antes del footer
             */}
            <main className="flex-grow relative z-10 pb-16">{children}</main>

            {/* FOOTER con borde diagonal (sin ola) */}
            <footer className="relative bg-gradient-to-r from-teal-700 to-teal-600 text-gray-200 w-full">
                {/* Capa diagonal suave en la parte superior */}
                <div
                    className="absolute top-0 left-0 w-full h-8 
               bg-white bg-opacity-10
               transform translate-y-[-80%]
               pointer-events-none"
                    style={{
                        clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
                    }}
                />

                {/* Contenido principal del footer */}
                <div className="relative z-10 px-6 pt-8 pb-6 text-center">
                    <p className="text-sm">
                        © {new Date().getFullYear()}{" "}
                        <span className="font-semibold text-white">
                            Sistema Hospitalario
                        </span>
                        . Todos los derechos reservados.
                    </p>

                    {/* Redes Sociales */}
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
