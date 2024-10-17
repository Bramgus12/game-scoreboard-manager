import { createFileRoute } from "@tanstack/react-router";
import App from "pages/app";

export const Route = createFileRoute("/app/")({
    component: HomePage,
});

function HomePage() {
    return <App />;
}
