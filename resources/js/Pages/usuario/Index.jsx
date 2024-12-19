import React, { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import App from "../../Layouts/App";
import { FaUserEdit, FaKey } from "react-icons/fa";
import ChangePasswordModal from "./components/modals/ChangePasswordModal";
import EditUserModal from "./components/modals/EditUserModal";
import CardRoleWeb from "./components/Card/CardRoleWeb";
import CardSisEscr from "./components/Card/CardSisEscr";
import UserInfoGrid from "./components/Grid/UserInfoGrid";
import PaginatedRoles from "./components/Paginated/PaginatedRoles";
import PaginatedEscritorio from "./components/Paginated/PaginatedEscritorio";

const UsuarioIndex = () => {
    const { resumen, csrfToken } = usePage().props;
    const { userNew, userLogin, usuarioSistema, usuarioSistemaWeb } =
        resumen || {};
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
            <div className="max-w-7xl mx-auto mt-10 bg-gray-50 shadow-lg rounded-lg overflow-hidden">
                {/* Encabezado */}
                <div className="bg-gradient-to-r from-teal-600 to-teal-400 text-white text-center py-10 shadow-md">
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
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-teal-800">
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

                    {/* Sistemas Web */}
                    <section>
                        <h2 className="text-2xl font-semibold text-teal-800 mb-4">
                            Sistemas Web
                        </h2>
                        <PaginatedRoles usuarioSistemaWeb={usuarioSistemaWeb} />
                    </section>

                    {/* Sistemas de Escritorio */}
                    <section>
                        <h2 className="text-2xl font-semibold text-teal-800 mb-4">
                            Sistemas de Escritorio
                        </h2>
                        <PaginatedEscritorio usuarioSistema={usuarioSistema} />
                    </section>
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
