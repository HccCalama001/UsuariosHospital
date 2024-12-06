import React, { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import App from "../../Layouts/App";
import { Inertia } from "@inertiajs/inertia";
import { FaUserEdit, FaKey } from "react-icons/fa";
import ChangePasswordModal from "./components/modals/ChangePasswordModal";

const UsuarioIndex = () => {
    const { resumen, csrfToken } = usePage().props;
    const { userNew, userLogin, usuarioSistema } = resumen || {};
    const [isModalOpen, setModalOpen] = useState(false);

    const handleEditProfile = () => {
        Inertia.get("/editar-datos");
    };

    const handleChangePassword = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleLogout = () => {
        Inertia.get("/logout");
    };

    return (
        <App>
            <div className="max-w-7xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Encabezado */}
                <div className="bg-teal-600 text-white text-center py-8 shadow-md">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
                            Panel de Usuario
                        </h1>
                        <p className="text-lg font-light mt-2 opacity-90">
                            Gestiona tu información y accesos en el sistema
                        </p>
                    </div>
                </div>

                <div className="p-8 space-y-12">
                    {/* Información General */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Información General
                            </h2>
                            <div className="flex space-x-4">
                                {/* Botón Editar Perfil */}
                                <button
                                    onClick={handleEditProfile}
                                    className="p-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-full shadow transition"
                                    title="Editar Perfil"
                                >
                                    <FaUserEdit className="h-6 w-6" />
                                </button>

                                {/* Botón Cambiar Contraseña */}
                                <button
                                    onClick={handleChangePassword}
                                    className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-full shadow transition"
                                    title="Cambiar Contraseña"
                                >
                                    <FaKey className="h-6 w-6" />
                                </button>
                                <ChangePasswordModal
                                    isOpen={isModalOpen}
                                    onClose={handleCloseModal}
                                    csrfToken={csrfToken}
                                />
                            </div>
                        </div>
                        {userNew ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-600">
                                        Nombre Completo
                                    </h3>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {userNew.Nombre}{" "}
                                        {userNew.ApellidoPaterno}{" "}
                                        {userNew.ApellidoMaterno}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-600">
                                        Nombre de Usuario
                                    </h3>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {userNew.NombreUsuario}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-600">
                                        RUT
                                    </h3>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {userNew.Rut}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-600">
                                        Correo Electrónico
                                    </h3>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {userNew.EmailUsuario}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-600">
                                        Teléfono
                                    </h3>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {userNew.NumeroTelefono}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-600">
                                        Estado
                                    </h3>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {userNew.is_active
                                            ? "Activo"
                                            : "Inactivo"}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-600">
                                        Fecha de Creación
                                    </h3>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {new Date(
                                            userNew.created_at
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">
                                No hay información general disponible.
                            </p>
                        )}
                    </section>

                    {/* Roles y Sistemas */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Roles y Sistemas Web
                        </h2>
                        {userLogin?.role_user_sistema?.length ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {userLogin.role_user_sistema.map(
                                    (role, index) => (
                                        <div
                                            key={index}
                                            className="bg-teal-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <p className="font-medium text-gray-700">
                                                <span className="font-bold">
                                                    Rol:
                                                </span>{" "}
                                                {role.role_nombre}
                                            </p>
                                            <p className="font-medium text-gray-700">
                                                <span className="font-bold">
                                                    ID Sistema:
                                                </span>{" "}
                                                {role.sistemas_id}
                                            </p>
                                            <p className="text-gray-600 text-sm mt-2">
                                                {role.descripcion}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">
                                No hay roles ni sistemas asociados.
                            </p>
                        )}
                    </section>

                    {/* Sistemas del Usuario */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Sistemas de Escritorio
                        </h2>
                        {usuarioSistema?.length ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {usuarioSistema.map((sistema, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <p className="font-medium text-gray-700">
                                            <span className="font-bold">
                                                Sistema:
                                            </span>{" "}
                                            {sistema.sistemaSalud}
                                        </p>
                                        <p className="font-medium text-gray-700">
                                            <span className="font-bold">
                                                ID Sistema:
                                            </span>{" "}
                                            {sistema.TAB_ID_Sistema}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">
                                No hay sistemas del usuario disponibles.
                            </p>
                        )}
                    </section>
                </div>
            </div>
        </App>
    );
};

export default UsuarioIndex;
