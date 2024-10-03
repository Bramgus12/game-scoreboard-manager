import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import ScoreboardList from "./components/ScoreboardList";
import WelcomeMessage from "./components/WelcomeMessage";

export default function HomePage() {
    const theme = useTheme();

    return (
        <Box sx={{ padding: theme.spacing(5, 10) }}>
            <Stack spacing={2}>
                <WelcomeMessage />
                <Paper>
                    <Stack spacing={2}>
                        <Typography variant="h5">Recent games</Typography>
                        <ScoreboardList />
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    );
}
