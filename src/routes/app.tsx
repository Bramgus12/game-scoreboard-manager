import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Header from "pages/app/Header";
import { supabase } from "utils/auth/useAuth";

export const Route = createFileRoute("/app")({
    component: App,
    beforeLoad: async ({ location }) => {
        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (session == null) {
            throw redirect({
                to: "/auth/login",
                search: { redirect: location.href },
            });
        }
    },
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
