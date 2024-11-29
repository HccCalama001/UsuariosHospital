import React from "react";
import { createRoot } from "react-dom/client";
import { InertiaApp } from "@inertiajs/inertia-react";

const app = document.getElementById("app");
const root = createRoot(app);

root.render(
    <InertiaApp
        initialPage={JSON.parse(app.dataset.page)}
        resolveComponent={(name) =>
            import(`./Pages/${name}`).then((module) => module.default)
        }
    />
);
