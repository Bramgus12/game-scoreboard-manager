import { Paper, Stack, Typography } from "@mui/material";
import WelcomeMessage from "@/app/welcomeMessage";
import ScoreboardList from "@/app/scoreboardList";
import Header from "@/app/header";
import PaddingBox from "@/app/PaddingBox";

export default function Home() {
    return (
        <Stack>
            <Header />
            <PaddingBox>
                <Stack spacing={2}>
                    <WelcomeMessage />
                    <Paper>
                        <Stack spacing={2}>
                            <Typography variant="h5">Your Recent Games</Typography>
                            <ScoreboardList />
                        </Stack>
                    </Paper>
                </Stack>
            </PaddingBox>
        </Stack>
    );
}
