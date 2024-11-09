import { Grid2, Paper, Typography } from "@mui/material";
import CreateScoreboard from "@/pageComponents/createScoreboard";
import { Language } from "@/app/i18n/settings";
import { translation } from "@/app/i18n";

export default async function ScoreboardPage(props: { lng: Promise<Language> }) {
    const lng = await props.lng;

    const { t } = await translation(lng, "scoreboardCreatePage");

    return (
        <Grid2 container spacing={2}>
            <Grid2>
                <Typography variant="h4">{t("createNewScoreboard")}</Typography>
            </Grid2>
            <Grid2 size={12}>
                <Paper>
                    <CreateScoreboard lng={lng} />
                </Paper>
            </Grid2>
        </Grid2>
    );
}
