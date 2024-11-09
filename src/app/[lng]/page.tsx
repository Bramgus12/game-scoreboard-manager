import { Paper, Stack, Typography } from "@mui/material";
import WelcomeMessage from "@/app/[lng]/welcomeMessage";
import ScoreboardList from "@/app/[lng]/scoreboardList";
import Header from "@/app/[lng]/header";
import PaddingBox from "@/app/[lng]/PaddingBox";
import { translation } from "@/app/i18n";
import { Language } from "@/app/i18n/settings";

export default async function Home(props: { params: Promise<{ lng: Language }> }) {
    const { lng } = await props.params;

    const { t } = await translation(lng, "scoreboardHomePage");

    return (
        <Stack>
            <Header />
            <PaddingBox>
                <Stack spacing={2}>
                    <WelcomeMessage lng={lng} />
                    <Paper>
                        <Stack spacing={2}>
                            <Typography variant="h5">{t("recentGames")}</Typography>
                            <ScoreboardList />
                        </Stack>
                    </Paper>
                </Stack>
            </PaddingBox>
        </Stack>
    );
}
