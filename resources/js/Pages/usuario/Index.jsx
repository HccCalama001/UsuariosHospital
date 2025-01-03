import React, { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import App from "../../Layouts/App";

// Íconos
import {
    FaUserEdit,
    FaKey,
    FaRegUserCircle,
    FaGlobe,
    FaDesktop,
} from "react-icons/fa";

// Modales
import ChangePasswordModal from "./components/modals/ChangePasswordModal";
import EditUserModal from "./components/modals/EditUserModal";

// Componentes de contenido
import UserInfoGrid from "./components/Grid/UserInfoGrid";
import PaginatedRoles from "./components/Paginated/PaginatedRoles";
import PaginatedEscritorio from "./components/Paginated/PaginatedEscritorio";

/**
 * Botón que representa una pestaña.
 * @param {object} props
 * @param {string} props.label - Texto mostrado en la pestaña.
 * @param {React.ReactNode} [props.icon] - Ícono opcional para la pestaña.
 * @param {string} props.value - Identificador de la pestaña.
 * @param {string} props.activeTab - Pestaña activa actual.
 * @param {function} props.onClick - Función para manejar el cambio de pestaña.
 */
function TabButton({ label, icon, value, activeTab, onClick }) {
    const isActive = activeTab === value;

    return (
        <button
            onClick={() => onClick(value)}
            className={`flex items-center space-x-2 px-4 py-2 font-semibold rounded-t-md 
                  transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400
                  ${
                      isActive
                          ? // ESTILO DE LA PESTAÑA ACTIVA
                            "bg-white text-teal-700 border-l border-r border-t border-gray-200 shadow-sm"
                          : // ESTILO DE LA PESTAÑA INACTIVA
                            "bg-teal-200 text-teal-800 hover:bg-teal-300"
                  }
                 `}
            aria-selected={isActive}
        >
            {icon && <span className="text-lg">{icon}</span>}
            <span>{label}</span>
        </button>
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

    // Handlers de modales
    const handleOpenEditModal = () => setEditModalOpen(true);
    const handleCloseEditModal = () => setEditModalOpen(false);
    const handleChangePassword = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    // Estado para controlar la pestaña activa. Opciones: 'info', 'web', 'desk'
    const [activeTab, setActiveTab] = useState("info");

    /**
     * Renderiza el contenido según la pestaña activa.
     */
    const renderTabContent = () => {
        switch (activeTab) {
            case "info":
                return (
                    <div
                        className="px-6 py-4 animate-fadeIn"
                        // Con animate-fadeIn, asumiendo que tienes una clase Tailwind plugin o similar
                        // para animaciones. O simplemente usa transition-all si deseas un fade básico.
                    >
                        {/* Encabezado con avatar y datos */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                            {/* Avatar + Nombre + Correo */}
                            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                                <div className="h-16 w-16 bg-gradient-to-br from-teal-400 to-purple-400 p-[2px] rounded-full shadow-lg">
                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-teal-600 text-2xl font-semibold">
                                        {initials || <FaRegUserCircle />}
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight">
                                        {userFullName || "Usuario sin nombre"}
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
                             focus:outline-none focus:ring-2 focus:ring-teal-400 
                             transition-transform transform hover:-translate-y-0.5"
                                    title="Editar Información del Usuario"
                                >
                                    <FaUserEdit className="h-5 w-5 sm:h-6 sm:w-6" />
                                </button>
                                <button
                                    onClick={handleChangePassword}
                                    className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-full shadow-md
                             focus:outline-none focus:ring-2 focus:ring-yellow-400 
                             transition-transform transform hover:-translate-y-0.5"
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
                );

            case "web":
                return (
                    <div className="px-6 py-4 animate-fadeIn">
                        <PaginatedRoles gruposWeb={gruposWeb} />
                    </div>
                );

            case "desk":
                return (
                    <div className="px-6 py-4 animate-fadeIn">
                        <PaginatedEscritorio
                            gruposEscritorio={gruposEscritorio}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <App>
            {/* Contenedor principal */}
            <div className="max-w-7xl mx-auto mt-10 bg-white shadow-2xl rounded-lg overflow-hidden">
                {/* Encabezado con gradiente y título */}
                <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-teal-400 text-white text-center py-10 shadow-md">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                            Panel de Usuario
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl font-light mt-2 opacity-90">
                            Gestiona tu información y accesos en el sistema
                        </p>
                    </div>
                </div>

                {/** Contenedor de pestañas */}
                <div className="border-b border-gray-200 flex space-x-2 bg-teal-200 px-4 pt-2 justify-center relative">
                    {/** Pestaña: Información General */}
                    <TabButton
                        label="Información General"
                        icon={<FaRegUserCircle />}
                        value="info"
                        activeTab={activeTab}
                        onClick={setActiveTab}
                    />
                    {/** Pestaña: Sistemas Web */}
                    <TabButton
                        label="Sistemas Web"
                        icon={<FaGlobe />}
                        value="web"
                        activeTab={activeTab}
                        onClick={setActiveTab}
                    />
                    {/** Pestaña: Sistemas de Escritorio */}
                    <TabButton
                        label="Sistemas Escritorio"
                        icon={<FaDesktop />}
                        value="desk"
                        activeTab={activeTab}
                        onClick={setActiveTab}
                    />
                </div>

                {/** Panel de contenido según la pestaña activa */}
                {renderTabContent()}
            </div>

            {/** Modales */}
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
