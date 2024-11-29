import React from "react";

const AppLayout = ({ children }) => {
    return (
        <div>
            <header>Mi Aplicación</header>
            <main>{children}</main>
        </div>
    );
};

export default AppLayout;
