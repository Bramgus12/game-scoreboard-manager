import { Box, Grid2, Paper, Typography } from "@mui/material";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import "./auth.css";
import { useAuth } from "utils/auth/useAuth";

export const Route = createFileRoute("/auth")({
    component: AuthPage,
});

function AuthPage() {
    useAuth();

    return (
        <Grid2
            container
            justifyContent="flex-start"
            sx={{ height: "calc(100vh - 5px)" }}
        >
            <Grid2 width={400}>
                <Paper
                    sx={(theme) => ({
                        padding: 3,
                        borderRight: `1px solid ${theme.palette.primary.main}`,
                        borderRadius: 0,
                        height: "100%",
                        backgroundColor: theme.palette.background.default,
                    })}
                    elevation={0}
                >
                    <Typography variant="h4">
                        <code>Game Scoreboard manager</code>
                    </Typography>
                    <Outlet />
                </Paper>
            </Grid2>
            <Grid2 size="grow">
                <Box className="magicpattern" />
            </Grid2>
        </Grid2>
    );
}
