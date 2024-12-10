import React from "react";

const CardRoleWeb = ({ role }) => {
    return (
        <div className="bg-teal-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <p className="font-medium text-gray-700">
                <span className="font-bold">Rol:</span> {role.role_nombre}
            </p>
            <p className="font-medium text-gray-700">
                <span className="font-bold">ID Sistema:</span>{" "}
                {role.sistemas_id}
            </p>
            <p className="text-gray-600 text-sm mt-2">{role.descripcion}</p>
        </div>
    );
};

export default CardRoleWeb;
