import React, { useState } from "react";
import CardSisEscr from "../Card/CardSisEscr";

const PaginatedEscritorio = ({ usuarioSistema }) => {
    // Estado para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Calcular los índices para los elementos de la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = usuarioSistema.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    // Calcular el número total de páginas
    const totalPages = Math.ceil(usuarioSistema.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <section>
            {usuarioSistema?.length ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentItems.map((sistema, index) => (
                            <CardSisEscr key={index} sistema={sistema} />
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
                    No hay sistemas del usuario disponibles.
                </p>
            )}
        </section>
    );
};

export default PaginatedEscritorio;
