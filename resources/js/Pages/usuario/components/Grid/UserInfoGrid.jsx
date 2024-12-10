import React from "react";
import UserInfoCard from "../Card/UserInfoCard";

const UserInfoGrid = ({ userNew }) => {
    if (!userNew) {
        return (
            <p className="text-gray-500 italic">
                No hay información general disponible.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <UserInfoCard
                title="Nombre Completo"
                content={`${userNew.Nombre} ${userNew.ApellidoPaterno} ${userNew.ApellidoMaterno}`}
            />
            <UserInfoCard
                title="Nombre de Usuario"
                content={userNew.NombreUsuario}
            />
            <UserInfoCard title="RUT" content={userNew.Rut} />
            <UserInfoCard
                title="Correo Electrónico"
                content={userNew.EmailUsuario}
            />
            <UserInfoCard title="Teléfono" content={userNew.NumeroTelefono} />
            <UserInfoCard
                title="Estado"
                content={userNew.is_active ? "Activo" : "Inactivo"}
            />
            <UserInfoCard
                title="Fecha de Creación"
                content={new Date(userNew.created_at).toLocaleDateString()}
            />
        </div>
    );
};

export default UserInfoGrid;
