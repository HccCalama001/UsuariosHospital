// /components/Card/CardRoleExternos.jsx
import React from "react";

const CardRoleExternos = ({ grupoExterno }) => {
    const { Url, NombreGrupo, imagen, GrupoID } = grupoExterno;

    const handleOpenSystem = () => {
        if (Url && Url !== "No Aplica" && Url !== "Desconocido") {
            window.open(Url, "_blank", "noopener,noreferrer");
        } else {
            console.log("La URL no es válida o no se puede aplicar.");
        }
    };

    return (
        <div
            className="
        flex flex-col items-center justify-between
        bg-white border border-gray-200 rounded-lg shadow-md
        hover:shadow-lg transition-shadow
        w-full max-w-xs sm:max-w-sm
        mx-auto
        p-4
        h-[300px]
      "
        >
            {/* Sección superior: texto ID */}
            <div className="w-full text-sm text-gray-600">
                <span className="font-bold">ID Sistema:</span> {GrupoID}
            </div>

            {/* Imagen circular, centrada */}
            <div className="flex justify-center my-4">
                <div className="w-24 h-24 overflow-hidden rounded-full shadow-md">
                    <img
                        src={imagen || "/images/default.png"}
                        alt={NombreGrupo || "Imagen del sistema"}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Nombre del sistema, centrado */}
            <h3 className="text-lg font-semibold text-teal-800 text-center mb-2">
                Sistema: {NombreGrupo}
            </h3>

            {/* Botón al final */}
            <button
                onClick={handleOpenSystem}
                className="
          w-full bg-teal-600 text-white py-2 px-4 rounded-lg
          hover:bg-teal-700 transition-colors
        "
            >
                Acceder al Sistema
            </button>
        </div>
    );
};

export default CardRoleExternos;
