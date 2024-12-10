import React, { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import App from "../../Layouts/App";
import { FaUserEdit, FaKey } from "react-icons/fa";
import ChangePasswordModal from "./components/modals/ChangePasswordModal";
import EditUserModal from "./components/modals/EditUserModal";
import CardRoleWeb from "./components/Card/CardRoleWeb";
import CardSisEscr from "./components/Card/CardSisEscr";
import UserInfoGrid from "./components/Grid/UserInfoGrid";

const UsuarioIndex = () => {
    const { resumen, csrfToken } = usePage().props;
    const { userNew, userLogin, usuarioSistema } = resumen || {};
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const handleOpenEditModal = () => {
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleChangePassword = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
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
                            <h2 className="text-2xl font-semibold text-white">
                                Información General
                            </h2>
                            <div className="flex space-x-4">
                                {/* Botón Editar Perfil */}
                                <button
                                    onClick={handleOpenEditModal}
                                    className="p-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    title="Editar Información del Usuario"
                                >
                                    <FaUserEdit className="h-6 w-6" />
                                </button>

                                {/* Botón Cambiar Contraseña */}
                                <button
                                    onClick={handleChangePassword}
                                    className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    title="Cambiar Contraseña"
                                >
                                    <FaKey className="h-6 w-6" />
                                </button>
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
                            </div>
                        </div>
                        {userNew ? (
                            <UserInfoGrid userNew={userNew} />
                        ) : (
                            <p className="text-gray-500 italic">
                                No hay información general disponible.
                            </p>
                        )}
                    </section>

                    {/* Roles y Sistemas Web */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Roles y Sistemas Web
                        </h2>
                        {userLogin?.role_user_sistema?.length ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {userLogin.role_user_sistema.map(
                                    (role, index) => (
                                        <CardRoleWeb key={index} role={role} />
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
                                    <CardSisEscr
                                        key={index}
                                        sistema={sistema}
                                    />
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
