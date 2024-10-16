import { Paper, Stack, Typography } from "@mui/material";
import WelcomeMessage from "pages/app/WelcomeMessage";
import ScoreboardList from "pages/app/ScoreboardList";
import { useTranslation } from "react-i18next";

export default function App() {
    const { t } = useTranslation("scoreboardHomePage");

    return (
        <Stack spacing={2}>
            <WelcomeMessage />
            <Paper>
                <Stack spacing={2}>
                    <Typography variant="h5">{t("recentGames")}</Typography>
                    <ScoreboardList />
                </Stack>
            </Paper>
        </Stack>
    );
}
