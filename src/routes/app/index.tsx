import { createFileRoute, redirect } from "@tanstack/react-router";
import App from "pages/app";
import { Box, useTheme } from "@mui/material";
import { supabase } from "utils/auth/useAuth";

export const Route = createFileRoute("/app/")({
    component: HomePage,
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

function HomePage() {
    const theme = useTheme();

    return (
        <Box sx={{ padding: theme.spacing(5, 10) }}>
            <App />
        </Box>
    );
}
