import { Grid2, Paper, Typography } from "@mui/material";
import { Language } from "@/app/i18n/settings";
import { translation } from "@/app/i18n";
import CreateScoreboard from "@/pageComponents/createScoreboard";

export default async function ScoreboardPage(props: {
    params: Promise<{ lng: Language }>;
}) {
    const { lng } = await props.params;

    const { t } = await translation(lng, "scoreboardCreatePage");

    return (
        <Grid2 container spacing={2}>
            <Grid2>
                <Typography variant="h4">
                    <code>{t("createNewScoreboard")}</code>
                </Typography>
            </Grid2>
            <Grid2 size={12}>
                <Paper>
                    <CreateScoreboard lng={lng} />
                </Paper>
            </Grid2>
        </Grid2>
    );
}
