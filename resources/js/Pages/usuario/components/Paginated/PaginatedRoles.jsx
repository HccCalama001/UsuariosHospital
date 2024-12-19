import React, { useState } from "react";
import CardRoleWeb from "../Card/CardRoleWeb";

const PaginatedRoles = ({ usuarioSistemaWeb }) => {
    // Estado para la página actual
    const [currentPage, setCurrentPage] = useState(1);

    // Número de elementos por página
    const itemsPerPage = 6;

    // Calcular los índices para la paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Obtener los elementos de la página actual
    const currentItems = usuarioSistemaWeb.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    // Calcular el número total de páginas
    const totalPages = Math.ceil(usuarioSistemaWeb.length / itemsPerPage);

    // Función para cambiar de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <section>
            {usuarioSistemaWeb.length ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentItems.map((role, index) => (
                            <CardRoleWeb key={index} role={role} />
                        ))}
                    </div>
                    <div className="flex justify-center items-center mt-6 space-x-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 border rounded ${
                                    currentPage === index + 1
                                        ? "bg-teal-600 text-white"
                                        : "bg-gray-200 text-gray-800"
                                }`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-gray-500 italic">
                    No hay roles ni sistemas asociados.
                </p>
            )}
        </section>
    );
};

export default PaginatedRoles;
