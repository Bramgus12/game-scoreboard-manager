import { Grid2, Paper, Typography } from "@mui/material";
import CreateScoreboard from "@/pageComponents/createScoreboard";
import { getMessages, getTranslations } from "next-intl/server";
import { Language } from "@/i18n/interfaces";

export default async function ScoreboardPage(props: {
    params: Promise<{ locale: Language }>;
}) {
    const { locale } = await props.params;

    await getMessages({ locale });

    const t = await getTranslations("scoreboardCreatePage");

    return (
        <Grid2 container spacing={2}>
            <Grid2>
                <Typography variant="h4">
                    <code>{t("createNewScoreboard")}</code>
                </Typography>
            </Grid2>
            <Grid2 size={12}>
                <Paper>
                    <CreateScoreboard />
                </Paper>
            </Grid2>
        </Grid2>
    );
}
