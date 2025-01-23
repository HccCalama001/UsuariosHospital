import React, { useState } from "react";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { logoutUser } from "../services/authService"; // Importa el servicio

const App = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-poppins relative w-full">
            <header
                className="fixed top-0 w-full z-50 bg-teal-600 text-white shadow-lg"
                role="banner"
            >
                <div className="flex items-center justify-between px-6 py-4">
                    <a
                        href="/usuario"
                        className="flex items-center space-x-2 group"
                        aria-label="Ir al Panel de Usuario"
                    >
                        <span className="text-2xl font-bold tracking-wide transition-colors group-hover:text-gray-50">
                            Panel de Usuario
                        </span>
                    </a>

                    <nav
                        className="hidden md:flex items-center space-x-6"
                        aria-label="Menú principal"
                    >
                        <button
                            onClick={logoutUser} // Llama al servicio aquí
                            className="relative flex items-center group hover:text-gray-200 transition-colors"
                        >
                            <FaSignOutAlt className="w-5 h-5" />
                            <span className="ml-2 hidden lg:inline text-sm font-medium">
                                Salir
                            </span>
                        </button>
                    </nav>

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

                {menuOpen && (
                    <div
                        className="md:hidden bg-teal-700 shadow-lg transition-all"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menú móvil"
                    >
                        <nav className="flex flex-col space-y-4 px-6 py-4">
                            <button
                                onClick={logoutUser} // Llama al servicio aquí
                                className="flex items-center space-x-2 py-1 hover:text-gray-200 transition-colors"
                            >
                                <FaSignOutAlt className="w-5 h-5" />
                                <span>Salir</span>
                            </button>
                        </nav>
                    </div>
                )}
            </header>

            <div className="h-16" />
            <main className="flex-grow relative z-10 pb-16">{children}</main>
        </div>
    );
};

export default App;
