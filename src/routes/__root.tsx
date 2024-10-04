import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Box } from "@mui/material";

export const Route = createRootRoute({
    component: () => (
        <>
            <Box sx={{ height: "100vh" }}>
                <Outlet />
            </Box>
            <TanStackRouterDevtools />
        </>
    ),
});
