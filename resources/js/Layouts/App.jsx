import React from "react";

const App = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Barra de Navegación */}
            <header className="bg-teal-600 text-white shadow">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Título del Panel */}
                    <h1 className="text-2xl font-semibold flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-7 h-7 mr-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.428 15.341A8 8 0 113.512 9.503m16.437 5.838A8.003 8.003 0 0112 20.5V14m0 6.5a8.001 8.001 0 003.427-15.341"
                            />
                        </svg>
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
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-5 h-5 mr-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 10l9-9m0 0l9 9m-9-9v18"
                                        />
                                    </svg>
                                    Inicio
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/perfil"
                                    className="flex items-center hover:text-gray-200 transition"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-5 h-5 mr-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 13.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a8.25 8.25 0 0115 0"
                                        />
                                    </svg>
                                    Perfil
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/logout"
                                    className="flex items-center hover:text-gray-200 transition"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-5 h-5 mr-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-8.25-6H21m0 0l-3-3m3 3l-3 3"
                                        />
                                    </svg>
                                    Cerrar Sesión
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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M22.675 0h-21.35C.592 0 0 .593 0 1.326v21.348C0 23.407.592 24 1.326 24h11.495v-9.294H9.692v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.661-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.919c-1.505 0-1.797.716-1.797 1.765v2.314h3.587l-.467 3.622h-3.12V24h6.116c.734 0 1.326-.592 1.326-1.326V1.326C24 .593 23.408 0 22.675 0z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-white transition"
                            aria-label="Twitter"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M24 4.557a9.834 9.834 0 01-2.828.775A4.933 4.933 0 0023.337 3.2a9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.37 4.482A13.938 13.938 0 011.671 3.149a4.91 4.91 0 001.524 6.557A4.888 4.888 0 01.96 9.392v.062a4.921 4.921 0 003.946 4.827 4.902 4.902 0 01-2.212.084 4.928 4.928 0 004.6 3.419 9.866 9.866 0 01-6.102 2.105c-.396 0-.788-.023-1.175-.069a13.937 13.937 0 007.548 2.209c9.058 0 14.012-7.503 14.012-14.01 0-.213-.005-.426-.014-.637A10.005 10.005 0 0024 4.557z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-white transition"
                            aria-label="Instagram"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.34 3.608 1.316.975.976 1.254 2.242 1.316 3.608.058 1.265.07 1.645.07 4.849 0 3.204-.012 3.584-.07 4.849-.062 1.366-.34 2.633-1.316 3.608-.976.976-2.242 1.254-3.608 1.316-1.265.058-1.645.07-4.849.07-3.204 0-3.584-.012-4.849-.07-1.366-.062-2.633-.34-3.608-1.316-.976-.976-1.254-2.242-1.316-3.608C2.175 15.584 2.163 15.204 2.163 12c0-3.204.012-3.584.07-4.849.062-1.366.34-2.633 1.316-3.608.976-.976 2.242-1.254 3.608-1.316C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.735 0 8.332.014 7.052.072 5.772.129 4.575.444 3.603 1.417c-.972.972-1.288 2.169-1.345 3.449C2.013 5.967 2 6.369 2 10.638c0 4.27.013 4.671.059 5.952.057 1.28.373 2.477 1.345 3.449.972.972 2.169 1.288 3.449 1.345 1.28.057 1.683.059 5.952.059 4.27 0 4.671-.013 5.952-.059 1.28-.057 2.477-.373 3.449-1.345.972-.972 1.288-2.169 1.345-3.449.046-1.281.059-1.682.059-5.952 0-4.27-.013-4.671-.059-5.952-.057-1.28-.373-2.477-1.345-3.449-.972-.972-2.169-1.288-3.449-1.345-1.281-.046-1.682-.059-5.952-.059zM12 5.838a6.162 6.162 0 106.162 6.162A6.162 6.162 0 0012 5.838zm0 10.162a4 4 0 114-4 4 4 0 01-4 4zm6.406-10.845a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
