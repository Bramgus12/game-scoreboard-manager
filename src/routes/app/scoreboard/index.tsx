import { Box } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import CreateScoreBoard from "pages/app.scoreboard";

export const Route = createFileRoute("/app/scoreboard/")({
    component: ScoreBoardPage,
});

function ScoreBoardPage() {
    return (
        <Box sx={{ padding: (theme) => theme.spacing(5, 10) }}>
            <CreateScoreBoard />
        </Box>
    );
}
