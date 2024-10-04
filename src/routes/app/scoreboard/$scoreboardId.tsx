import { Box } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import EditScoreboard from "pages/app.scoreboard.$scoreboardId";

export const Route = createFileRoute("/app/scoreboard/$scoreboardId")({
    component: CurrentGamePage,
});

function CurrentGamePage() {
    return (
        <Box sx={{ padding: (theme) => theme.spacing(5, 10) }}>
            <EditScoreboard />
        </Box>
    );
}
