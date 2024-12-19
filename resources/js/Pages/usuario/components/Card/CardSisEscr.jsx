import React from "react";

const CardSisEscr = ({ sistema }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <h3 className="text-lg font-semibold text-teal-800 mb-2">
                Sistema: {sistema.sistemaSalud}
            </h3>
            <div className="text-sm text-gray-600">
                <p>
                    <span className="font-bold">ID Sistema:</span>{" "}
                    {sistema.TAB_ID_Sistema.trim()}
                </p>
            </div>
        </div>
    );
};

export default CardSisEscr;
