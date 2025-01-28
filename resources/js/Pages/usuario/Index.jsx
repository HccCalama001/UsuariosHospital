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
    FaEnvelope,
    FaCogs, // Puedes cambiar a otro ícono si gustas
} from "react-icons/fa";

// Modales
import ChangePasswordModal from "./components/modals/ChangePasswordModal";
import EditUserModal from "./components/modals/EditUserModal";

// Componentes de contenido
import UserInfoGrid from "./components/Grid/UserInfoGrid";
import PaginatedRoles from "./components/Paginated/PaginatedRoles";
import PaginatedEscritorio from "./components/Paginated/PaginatedEscritorio";
import PaginatedExternos from "./components/Paginated/PaginatedExternos";

/**
 * Botón para pestañas de navegación.
 * @param {object} props
 * @param {string} props.label - Texto de la pestaña.
 * @param {React.ReactNode} [props.icon] - Ícono opcional.
 * @param {string} props.value - Valor o identificador de la pestaña.
 * @param {string} props.activeTab - Pestaña activa.
 * @param {function} props.onClick - Función para manejar el cambio de pestaña.
 */
function TabButton({ label, icon, value, activeTab, onClick }) {
    const isActive = activeTab === value;

    return (
        <button
            type="button"
            onClick={() => onClick(value)}
            className={`flex items-center space-x-2 px-4 py-2 font-semibold rounded-t-md transition-colors
        focus:outline-none focus:ring-2 focus:ring-teal-400
        ${
            isActive
                ? "bg-white text-teal-700 border-l border-r border-t border-gray-200 shadow-sm"
                : "bg-teal-200 text-teal-800 hover:bg-teal-300"
        }`}
            aria-selected={isActive}
        >
            {icon && <span className="text-lg">{icon}</span>}
            <span>{label}</span>
        </button>
    );
}

const UsuarioIndex = () => {
    const { resumen, gruposDelUsuario } = usePage().props;
    const { userNew = {}, userLogin = {} } = resumen || {};

    // Filtra los grupos según su tipo
    const gruposEscritorio = gruposDelUsuario.filter(
        (grupo) => grupo.Tipo === "escritorio"
    );
    const gruposWeb = gruposDelUsuario.filter((grupo) => grupo.Tipo === "web");
    const gruposExternos = gruposDelUsuario.filter(
        (grupo) => grupo.Tipo === "externo"
    );

    // Construye iniciales (primeras letras de Nombre y ApellidoPaterno)
    const initials = `${userNew.Nombre?.[0] || ""}${
        userNew.ApellidoPaterno?.[0] || ""
    }`
        .toUpperCase()
        .trim();

    // Construye el nombre completo
    const userFullName = [
        userNew.Nombre,
        userNew.ApellidoPaterno,
        userNew.ApellidoMaterno,
    ]
        .filter(Boolean)
        .join(" ")
        .trim();

    // Estados para los modales
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Manejo de apertura/cierre de modales
    const handleOpenEditModal = () => setIsEditModalOpen(true);
    const handleCloseEditModal = () => setIsEditModalOpen(false);
    const handleOpenPasswordModal = () => setIsPasswordModalOpen(true);
    const handleClosePasswordModal = () => setIsPasswordModalOpen(false);

    // Estado para la pestaña activa: 'info', 'web', 'desk' o 'externos'
    const [activeTab, setActiveTab] = useState("info");

    /**
     * Renderiza el contenido según la pestaña activa.
     */
    const renderTabContent = () => {
        switch (activeTab) {
            case "info":
                return (
                    <div className="px-6 py-4 animate-fadeIn">
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
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                                        {userFullName || "Usuario sin nombre"}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {userNew.EmailUsuario ||
                                            "Sin correo registrado"}
                                    </p>
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className="flex space-x-3 sm:space-x-4">
                                {/* Botón Editar Usuario */}
                                <button
                                    type="button"
                                    onClick={handleOpenEditModal}
                                    className="px-3 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium 
                    rounded-full shadow-md focus:outline-none 
                    focus:ring-2 focus:ring-teal-400 transition-transform 
                    transform hover:-translate-y-0.5"
                                    title="Editar Información del Usuario"
                                >
                                    <FaUserEdit className="h-5 w-5 sm:h-6 sm:w-6" />
                                </button>

                                {/* Botón Cambiar Contraseña */}
                                <button
                                    type="button"
                                    onClick={handleOpenPasswordModal}
                                    className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium 
                    rounded-full shadow-md focus:outline-none 
                    focus:ring-2 focus:ring-yellow-400 transition-transform 
                    transform hover:-translate-y-0.5"
                                    title="Cambiar Contraseña"
                                >
                                    <FaKey className="h-5 w-5 sm:h-6 sm:w-6" />
                                </button>

                                {/* Botón Abrir Outlook */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        window.open(
                                            "https://outlook.office.com",
                                            "_blank"
                                        )
                                    }
                                    className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium 
                    rounded-full shadow-md focus:outline-none 
                    focus:ring-2 focus:ring-blue-400 transition-transform 
                    transform hover:-translate-y-0.5"
                                    title="Abrir Outlook"
                                >
                                    <FaEnvelope className="h-5 w-5 sm:h-6 sm:w-6" />
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

            // Nueva pestaña: 'externos'
            case "externos":
                return (
                    <div className="px-6 py-4 animate-fadeIn">
                        <PaginatedExternos gruposExternos={gruposExternos} />
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

                {/* Contenedor de pestañas */}
                <div className="border-b border-gray-200 flex space-x-2 bg-teal-200 px-4 pt-2 justify-center relative">
                    <TabButton
                        label="Información General"
                        icon={<FaRegUserCircle />}
                        value="info"
                        activeTab={activeTab}
                        onClick={setActiveTab}
                    />
                    <TabButton
                        label="Sistemas Web"
                        icon={<FaGlobe />}
                        value="web"
                        activeTab={activeTab}
                        onClick={setActiveTab}
                    />
                    <TabButton
                        label="Sistemas Escritorio"
                        icon={<FaDesktop />}
                        value="desk"
                        activeTab={activeTab}
                        onClick={setActiveTab}
                    />
                    {/* Nuevo botón para la pestaña Sistemas Externos */}
                    <TabButton
                        label="Sistemas Externos"
                        icon={<FaCogs />}
                        value="externos"
                        activeTab={activeTab}
                        onClick={setActiveTab}
                    />
                </div>

                {/* Panel de contenido según la pestaña activa */}
                {renderTabContent()}
            </div>

            {/* Modales */}
            <ChangePasswordModal
                isOpen={isPasswordModalOpen}
                onClose={handleClosePasswordModal}
            />
            <EditUserModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                userData={userNew}
                userLoginData={userLogin}
            />
        </App>
    );
};

export default UsuarioIndex;
