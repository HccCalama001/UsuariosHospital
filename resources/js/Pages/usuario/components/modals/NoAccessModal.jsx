// resources/js/Components/NoAccessModal.jsx
import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";

const NoAccessModal = () => {
    const pageProps = usePage().props;
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Preguntamos si pageProps.flash existe y si trae .noAccessMessage
        if (pageProps.flash && pageProps.flash.noAccessMessage) {
            setShowModal(true);
        }
    }, [pageProps]);

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-11/12 max-w-md mx-auto">
                <h2 className="text-xl font-bold text-red-600 mb-4">
                    {flash.noAccessMessage}
                </h2>
                <p className="text-gray-700 mb-4">
                    Por favor, contacte al administrador o revise sus permisos.
                </p>
                <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default NoAccessModal;
