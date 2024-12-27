import React, { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import App from "../../Layouts/App";

// Íconos para botones
import { FaUserEdit, FaKey, FaRegUserCircle } from "react-icons/fa";

// Tus modales
import ChangePasswordModal from "./components/modals/ChangePasswordModal";
import EditUserModal from "./components/modals/EditUserModal";

// Tus componentes de contenido
import UserInfoGrid from "./components/Grid/UserInfoGrid";
import PaginatedRoles from "./components/Paginated/PaginatedRoles";
import PaginatedEscritorio from "./components/Paginated/PaginatedEscritorio";

/**
 * Componente reutilizable para un Item de Acordeón.
 * - Recibe `title`, `defaultOpen` (por defecto false), y `children`.
 * - Maneja su propio estado (abierto/cerrado).
 */
function AccordionItem({ title, defaultOpen = false, children }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const toggle = () => setIsOpen((prev) => !prev);

    return (
        <div className="border-b border-gray-300">
            {/* Encabezado del acordeón: Título + ícono (+/-) */}
            <button
                type="button"
                onClick={toggle}
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
            >
                <h2 className="text-xl sm:text-2xl font-semibold text-teal-800">
                    {title}
                </h2>
                <span className="text-2xl ml-3 text-teal-700 transition-colors">
                    {isOpen ? "−" : "+"}
                </span>
            </button>

            {/* Contenido que se muestra solo si isOpen es true */}
            {isOpen && (
                <div className="pb-4 transition-all duration-300 ease-in-out">
                    {children}
                </div>
            )}
        </div>
    );
}

const UsuarioIndex = () => {
    const { resumen, csrfToken, gruposDelUsuario } = usePage().props;
    const { userNew = {}, userLogin = {} } = resumen || {};

    // Filtra los grupos según su tipo
    const gruposEscritorio = gruposDelUsuario.filter(
        (g) => g.Tipo === "escritorio"
    );
    const gruposWeb = gruposDelUsuario.filter((g) => g.Tipo === "web");

    // Construye iniciales (primeras letras de Nombre y ApellidoPaterno)
    const initials = `${userNew.Nombre?.[0] ?? ""}${
        userNew.ApellidoPaterno?.[0] ?? ""
    }`
        .toUpperCase()
        .trim();

    // Construye el nombre completo
    const userFullName = `
    ${userNew.Nombre ?? ""}
    ${userNew.ApellidoPaterno ?? ""}
    ${userNew.ApellidoMaterno ?? ""}
  `.trim();

    // Estados para los modales
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    // Handlers para abrir/cerrar modales
    const handleOpenEditModal = () => setEditModalOpen(true);
    const handleCloseEditModal = () => setEditModalOpen(false);
    const handleChangePassword = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    return (
        <App>
            {/* Contenedor principal */}
            <div className="max-w-7xl mx-auto mt-10 bg-gray-50 shadow-lg rounded-lg overflow-hidden">
                {/* Encabezado con gradiente y título */}
                <div className="bg-gradient-to-r from-teal-600 to-teal-400 text-white text-center py-10 shadow-md">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                            Panel de Usuario
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl font-light mt-2 opacity-90">
                            Gestiona tu información y accesos en el sistema
                        </p>
                    </div>
                </div>

                {/* Contenido principal con acordeones */}
                <div className="p-6 sm:p-8 lg:p-10 space-y-8">
                    {/* Acordeón 1: Información General */}
                    <AccordionItem
                        title="Información General"
                        defaultOpen={true}
                    >
                        <div className="mb-6">
                            {/* Encabezado con avatar y datos */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                                {/* Avatar + Nombre + Correo */}
                                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                                    {/* Avatar circular (si no hay iniciales, muestra ícono) */}
                                    <div className="h-16 w-16 bg-gradient-to-br from-teal-400 to-purple-400 p-[2px] rounded-full shadow-lg">
                                        <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-teal-600 text-2xl font-semibold">
                                            {initials || <FaRegUserCircle />}
                                        </div>
                                    </div>

                                    {/* Información principal: nombre completo + correo */}
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight">
                                            {userFullName ||
                                                "Usuario sin nombre"}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {userNew.EmailUsuario ||
                                                "Sin correo registrado"}
                                        </p>
                                    </div>
                                </div>

                                {/* Botones (Editar Perfil, Cambiar Contraseña) */}
                                <div className="flex space-x-3 sm:space-x-4">
                                    <button
                                        onClick={handleOpenEditModal}
                                        className="px-3 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-full shadow-md
                     focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors"
                                        title="Editar Información del Usuario"
                                    >
                                        <FaUserEdit className="h-5 w-5 sm:h-6 sm:w-6" />
                                    </button>
                                    <button
                                        onClick={handleChangePassword}
                                        className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-full shadow-md
                     focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                                        title="Cambiar Contraseña"
                                    >
                                        <FaKey className="h-5 w-5 sm:h-6 sm:w-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Detalle de información de usuario */}
                            {Object.keys(userNew).length > 0 ? (
                                <UserInfoGrid userNew={userNew} />
                            ) : (
                                <p className="text-gray-500 italic">
                                    No hay información general disponible.
                                </p>
                            )}
                        </div>
                    </AccordionItem>

                    {/* Acordeón 2: Sistemas Web */}
                    <AccordionItem title="Sistemas Web">
                        <div className="mb-4">
                            <PaginatedRoles gruposWeb={gruposWeb} />
                        </div>
                    </AccordionItem>

                    {/* Acordeón 3: Sistemas de Escritorio */}
                    <AccordionItem title="Sistemas de Escritorio">
                        <div className="mb-4">
                            <PaginatedEscritorio
                                gruposEscritorio={gruposEscritorio}
                            />
                        </div>
                    </AccordionItem>
                </div>
            </div>

            {/* Modales */}
            <ChangePasswordModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                csrfToken={csrfToken}
            />
            <EditUserModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                csrfToken={csrfToken}
                userData={userNew}
                userLoginData={userLogin}
            />
        </App>
    );
};

export default UsuarioIndex;
