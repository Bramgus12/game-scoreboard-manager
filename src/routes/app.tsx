import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "pages/app/Header";

export const Route = createFileRoute("/app")({
    component: App,
});

function App() {
    const theme = useTheme();

    const mdDown = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Stack>
            <Header />
            <Box sx={{ padding: theme.spacing(mdDown ? 2 : 5, mdDown ? 2 : 10) }}>
                <Outlet />
            </Box>
        </Stack>
    );
}
