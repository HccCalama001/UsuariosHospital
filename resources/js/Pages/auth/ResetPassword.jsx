import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const ResetPassword = ({ token, csrfToken }) => {
    const [form, setForm] = useState({
        token,
        new_password: "",
        new_password_confirmation: "",
    });

    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/reset-password", form, {
            onSuccess: () =>
                setStatus("Contraseña restablecida correctamente."),
            onError: () => setStatus("Error al restablecer la contraseña."),
        });
    };

    return (
        <div className="reset-password">
            <h1>Restablecer Contraseña</h1>
            {status && <p className="status">{status}</p>}
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="_token" value={csrfToken} />
                <input
                    type="password"
                    name="new_password"
                    placeholder="Nueva contraseña"
                    value={form.new_password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="new_password_confirmation"
                    placeholder="Confirmar contraseña"
                    value={form.new_password_confirmation}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Restablecer Contraseña</button>
            </form>
        </div>
    );
};

export default ResetPassword;
