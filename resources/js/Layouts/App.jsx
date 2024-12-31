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
 * Componente principal que envuelve toda la aplicación.
 * Incluye:
 * - Header fijo con menú (versión desktop y mobile).
 * - Footer con borde diagonal.
 * - Responsividad y transiciones sutiles.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido interior de la aplicación.
 */
const App = ({ children }) => {
    /**
     * Estado que controla la apertura o cierre del menú en dispositivos móviles.
     */
    const [menuOpen, setMenuOpen] = useState(false);

    /**
     * Función para cerrar sesión:
     * - Elimina la cookie de autenticación.
     * - Redirecciona a la pantalla de login.
     */
    const handleLogout = () => {
        document.cookie =
            "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "auth/login";
    };

    /**
     * Alterna la visibilidad del menú móvil.
     */
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-poppins relative w-full">
            {/** HEADER fijo */}
            <header
                className="fixed top-0 w-full z-50 bg-teal-600 text-white shadow-lg"
                role="banner"
            >
                <div className="flex items-center justify-between px-6 py-4">
                    {/** LOGO / TÍTULO */}
                    <a
                        href="/usuario"
                        className="flex items-center space-x-2 group"
                        aria-label="Ir al Panel de Usuario"
                    >
                        <span className="text-2xl font-bold tracking-wide transition-colors group-hover:text-gray-50">
                            Panel de Usuario
                        </span>
                    </a>

                    {/** Navegación Desktop con Íconos y Separadores */}
                    <nav
                        className="hidden md:flex items-center space-x-6"
                        aria-label="Menú principal"
                    >
                        <a
                            href="/usuario"
                            className="relative flex items-center group 
                       hover:text-gray-200 transition-colors"
                        >
                            {/** Tooltip opcional; se muestra al hover si lo deseas */}
                            <div
                                className="absolute left-1/2 -translate-x-1/2 bottom-[-2.5rem] 
                        px-2 py-1 text-xs text-white bg-black bg-opacity-70 rounded-md opacity-0
                        group-hover:opacity-100 pointer-events-none transition-opacity
                        hidden lg:block"
                            >
                                Ir al Panel
                            </div>
                        </a>

                        {/** Separador vertical sutil */}
                        <div className="w-px h-5 bg-white/40" />

                        <button
                            onClick={handleLogout}
                            className="relative flex items-center group 
                       hover:text-gray-200 transition-colors"
                        >
                            <FaSignOutAlt className="w-5 h-5" />
                            <span className="ml-2 hidden lg:inline text-sm font-medium">
                                Salir
                            </span>

                            {/** Tooltip opcional */}
                            <div
                                className="absolute left-1/2 -translate-x-1/2 bottom-[-2.5rem] 
                        px-2 py-1 text-xs text-white bg-black bg-opacity-70 rounded-md opacity-0
                        group-hover:opacity-100 pointer-events-none transition-opacity
                        hidden lg:block"
                            >
                                Cerrar Sesión
                            </div>
                        </button>
                    </nav>

                    {/** Botón menú móvil */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-white hover:text-gray-200 focus:outline-none 
                     focus:ring-2 focus:ring-teal-300 transition-colors"
                        aria-label="Abrir o cerrar menú móvil"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? (
                            <FaTimes className="w-6 h-6" />
                        ) : (
                            <FaBars className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/** Menú móvil */}
                {menuOpen && (
                    <div
                        className="md:hidden bg-teal-700 shadow-lg transition-all"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menú móvil"
                    >
                        <nav
                            className="flex flex-col space-y-4 px-6 py-4"
                            aria-label="Menú móvil"
                        >
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 py-1 hover:text-gray-200 transition-colors"
                            >
                                <FaSignOutAlt className="w-5 h-5" />
                                <span>Salir</span>
                            </button>
                        </nav>
                    </div>
                )}
            </header>

            {/** Espaciador para no tapar el contenido con el Header fijo */}
            <div className="h-16" />

            {/** MAIN:
             * - flex-grow: ocupa el espacio vertical restante.
             * - relative + z-10: mantiene el contenido sobre capas del footer.
             * - pb-16: deja un margen al final antes del footer.
             */}
            <main className="flex-grow relative z-10 pb-16">{children}</main>
            <footer
                className="relative bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 text-gray-200 w-full mt-8 overflow-hidden"
                role="contentinfo"
            >
                {/** Onda superior con SVG */}
                <div className="absolute top-0 left-0 w-full leading-[0]">
                    <svg
                        className="block w-full h-8 text-teal-700 transition-transform duration-300 transform hover:scale-[1.005]"
                        viewBox="0 0 120 28"
                        preserveAspectRatio="none"
                    >
                        {/** Fondo base para la onda */}
                        <path d="M0 0h120v28H0z" fill="currentColor" />

                        {/** Onda interior con opacidad */}
                        <path
                            d="M0 18c30-10 58 10 120-10v20H0z"
                            fill="#ffffff14" // Ajusta la opacidad cambiando este valor
                        />
                    </svg>
                </div>

                {/** Contenido principal del footer */}
                <div className="relative z-10 px-6 pt-10 pb-8 text-center">
                    <p className="text-sm mb-2">
                        © {new Date().getFullYear()}{" "}
                        <span className="font-semibold text-white">
                            Sistema Hospitalario
                        </span>
                        . Todos los derechos reservados.
                    </p>

                    {/** Redes Sociales */}
                    <div className="flex justify-center space-x-6 mt-4">
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white transition duration-200 transform hover:scale-110"
                            aria-label="Facebook"
                        >
                            <FaFacebook className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white transition duration-200 transform hover:scale-110"
                            aria-label="Twitter"
                        >
                            <FaTwitter className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white transition duration-200 transform hover:scale-110"
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
