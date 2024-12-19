import React from "react";

const CardRoleWeb = ({ role }) => {
    const handleButtonClick = () => {
        // Acción al hacer clic en el botón (puedes personalizarlo)
        console.log(`Acceso al sistema: ${role.sistema_name}`);
        // O redireccionar, por ejemplo:
        // window.location.href = `/sistema/${role.sistema_id}`;
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <h3 className="text-lg font-semibold text-teal-800 mb-2">
                Sistema: {role.sistema_name}
            </h3>
            <div className="text-sm text-gray-600 mb-4">
                <p>
                    <span className="font-bold">ID Sistema:</span>{" "}
                    {role.sistema_id}
                </p>
                <p>
                    <span className="font-bold">Permisos:</span>{" "}
                    {role.role_name}
                </p>
            </div>
            <button
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
                onClick={handleButtonClick}
            >
                Dirigirse a Sistema
            </button>
        </div>
    );
};

export default CardRoleWeb;
