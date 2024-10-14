import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Box, Button, Grid2, Typography } from "@mui/material";

export const Route = createRootRoute({
    component: () => (
        <>
            <Box sx={{ height: "100vh" }}>
                <Outlet />
            </Box>
            {import.meta.env.PROD ? null : <TanStackRouterDevtools />}
        </>
    ),
    notFoundComponent: () => {
        return (
            <Grid2
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
                spacing={3}
                sx={{ height: "100%" }}
            >
                <Grid2>
                    <Typography variant="h2" fontWeight={700}>
                        404
                    </Typography>
                </Grid2>
                <Grid2>
                    <Typography variant="h4" fontWeight={700}>
                        Page not found
                    </Typography>
                </Grid2>
                <Grid2>
                    <Button variant="contained" component={Link} to="/app">
                        Go to the Home page
                    </Button>
                </Grid2>
            </Grid2>
        );
    },
});
