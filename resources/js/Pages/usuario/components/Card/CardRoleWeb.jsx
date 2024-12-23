import React from "react";

const CardRoleWeb = ({ gruposWeb }) => {
    const handleButtonClick = () => {
        // Si la URL no es "Desconocido" o "No Aplica", redirigimos
        if (
            gruposWeb.Url &&
            gruposWeb.Url !== "No Aplica" &&
            gruposWeb.Url !== "Desconocido"
        ) {
            // Abre la URL en otra pestaña/ventana
            window.open(gruposWeb.Url, "_blank");
        } else {
            console.log("La URL no es válida o no se puede aplicar.");
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <h3 className="text-lg font-semibold text-teal-800 mb-2">
                Sistema: {gruposWeb.NombreGrupo}
            </h3>
            <div className="text-sm text-gray-600 mb-4">
                <p>
                    <span className="font-bold">ID Sistema:</span>{" "}
                    {gruposWeb.NombreGrupo}
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
