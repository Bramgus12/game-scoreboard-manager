import { Paper, Stack, Typography } from "@mui/material";
import WelcomeMessage from "@/pageComponents/root/welcomeMessage";
import ScoreboardList from "@/pageComponents/root/scoreboardList";
import Header from "@/pageComponents/root/header";
import PaddingBox from "@/pageComponents/root/PaddingBox";
import { translation } from "@/app/i18n";
import { Language } from "@/app/i18n/settings";

export default async function Home(props: { params: Promise<{ lng: Language }> }) {
    const { lng } = await props.params;

    console.log(props);

    const { t } = await translation(lng, "scoreboardHomePage");

    return (
        <Stack>
            <Header lng={lng} />
            <PaddingBox>
                <Stack spacing={2}>
                    <WelcomeMessage lng={lng} />
                    <Paper>
                        <Stack spacing={2}>
                            <Typography variant="h5">{t("recentGames")}</Typography>
                            <ScoreboardList lng={lng} />
                        </Stack>
                    </Paper>
                </Stack>
            </PaddingBox>
        </Stack>
    );
}
