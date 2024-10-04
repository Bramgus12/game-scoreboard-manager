import { Stack } from "@mui/material";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "pages/app/Header";

export const Route = createFileRoute("/app")({
    component: App,
});

function App() {
    return (
        <Stack>
            <Header />
            <Outlet />
        </Stack>
    );
}
