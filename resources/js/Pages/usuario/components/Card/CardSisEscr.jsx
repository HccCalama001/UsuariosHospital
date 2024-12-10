import React from "react";

const CardSisEscr = ({ sistema }) => {
    return (
        <div className="bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <p className="font-medium text-gray-700">
                <span className="font-bold">Sistema:</span>{" "}
                {sistema.sistemaSalud}
            </p>
            <p className="font-medium text-gray-700">
                <span className="font-bold">ID Sistema:</span>{" "}
                {sistema.TAB_ID_Sistema}
            </p>
        </div>
    );
};

export default CardSisEscr;
