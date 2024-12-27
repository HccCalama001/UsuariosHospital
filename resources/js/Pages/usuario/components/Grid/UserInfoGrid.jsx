import React from "react";
import UserInfoCard from "../Card/UserInfoCard";

// Importar algunos iconos de React Icons (puedes usar otros)
import {
    HiOutlineUser,
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineIdentification,
} from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

const UserInfoGrid = ({ userNew }) => {
    // Si no hay información, mostramos un mensaje
    if (!userNew) {
        return (
            <p className="text-gray-500 italic">
                No hay información general disponible.
            </p>
        );
    }

    // Construimos el nombre completo
    const userFullName = `
    ${userNew.Nombre ?? ""}
    ${userNew.ApellidoPaterno ?? ""}
    ${userNew.ApellidoMaterno ?? ""}
  `.trim();

    // Iniciales (primeras letras de Nombre y ApellidoPaterno)
    const initials = `${userNew.Nombre?.[0] ?? ""}${
        userNew.ApellidoPaterno?.[0] ?? ""
    }`.toUpperCase();

    // Estado (activo / inactivo) con ícono
    const isActiveIcon = userNew.is_active ? <BsToggleOn /> : <BsToggleOff />;
    const isActiveText = userNew.is_active ? "Activo" : "Inactivo";

    return (
        <div>
            {/* Luces radiales de fondo (decoración) */}
            <div className="absolute -z-10 w-96 h-96 bg-[radial-gradient(circle_at_top_left,_#5eead4_0%,_transparent_70%)] top-0 left-0 opacity-60 blur-2xl" />
            <div className="absolute -z-10 w-96 h-96 bg-[radial-gradient(circle_at_bottom_right,_#c084fc_0%,_transparent_70%)] bottom-0 right-0 opacity-50 blur-2xl" />

            {/* Grilla de información */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <UserInfoCard
                    icon={<HiOutlineUser />}
                    title="Nombre Completo"
                    content={userFullName || "Sin información"}
                />
                <UserInfoCard
                    icon={<FaRegUserCircle />}
                    title="Nombre de Usuario"
                    content={userNew.NombreUsuario || "Sin información"}
                />
                <UserInfoCard
                    icon={<HiOutlineIdentification />}
                    title="RUT"
                    content={userNew.Rut || "Sin información"}
                />
                <UserInfoCard
                    icon={<HiOutlineMail />}
                    title="Correo Electrónico"
                    content={userNew.EmailUsuario || "Sin información"}
                />
                <UserInfoCard
                    icon={<HiOutlinePhone />}
                    title="Teléfono"
                    content={userNew.NumeroTelefono || "Sin información"}
                />
                <UserInfoCard
                    icon={isActiveIcon}
                    title="Estado"
                    content={isActiveText}
                />
            </div>
        </div>
    );
};

export default UserInfoGrid;
