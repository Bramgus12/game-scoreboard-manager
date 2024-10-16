import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
    component: Wildcard,
});

function Wildcard() {
    const navigate = useNavigate({ from: "/$" });

    void navigate({ to: "/app" });
}
