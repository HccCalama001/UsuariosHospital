import React from "react";

const VerifyCode = ({ errors }) => {
    const [code, setCode] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica de envío del código
        console.log("Código enviado:", code);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 font-poppins">
            <div className="bg-white shadow-xl rounded-xl p-10 max-w-lg w-full">
                <h1 className="text-4xl font-bold text-teal-600 text-center mb-8">
                    Verificar Código
                </h1>

                {errors?.general && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        <p>{errors.general}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Código de Verificación
                        </label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            placeholder="Ingrese el código"
                            required
                        />
                        {errors?.code && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.code}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-teal-600 text-white font-medium rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-200"
                    >
                        Verificar Código
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyCode;
