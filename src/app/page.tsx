"use client";

import { Box, Paper, Stack, Theme, Typography, useMediaQuery } from "@mui/material";
import WelcomeMessage from "@/app/welcomeMessage";
import ScoreboardList from "@/app/scoreboardList";
import theme from "@/theme";
import Header from "@/app/header";

export default function Home() {
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

    return (
        <Stack>
            <Header />
            <Box
                sx={{
                    padding: theme.spacing(mdDown ? 2 : 5, mdDown ? 2 : 10),
                }}
            >
                <Stack spacing={2}>
                    <WelcomeMessage />
                    <Paper>
                        <Stack spacing={2}>
                            <Typography variant="h5">Your Recent Games</Typography>
                            <ScoreboardList />
                        </Stack>
                    </Paper>
                </Stack>
            </Box>
        </Stack>
    );
}
