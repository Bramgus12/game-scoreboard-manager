import { Paper, Stack, Typography } from "@mui/material";
import WelcomeMessage from "pages/app/WelcomeMessage";
import ScoreboardList from "pages/app/ScoreboardList";

export default function App() {
    return (
        <Stack spacing={2}>
            <WelcomeMessage />
            <Paper>
                <Stack spacing={2}>
                    <Typography variant="h5">Recent games</Typography>
                    <ScoreboardList />
                </Stack>
            </Paper>
        </Stack>
    );
}
