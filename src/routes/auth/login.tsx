import { createFileRoute } from "@tanstack/react-router";
import Login from "pages/auth.login";

export const Route = createFileRoute("/auth/login")({
    component: LoginPage,
});

function LoginPage() {
    return <Login />;
}
