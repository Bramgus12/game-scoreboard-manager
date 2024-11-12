import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import WelcomeMessage from "@/pageComponents/root/welcomeMessage";
import ScoreboardList from "@/pageComponents/root/scoreboardList";
import Header from "@/pageComponents/root/header";
import PaddingBox from "@/pageComponents/root/PaddingBox";
import { translation } from "@/app/i18n";
import { Language } from "@/app/i18n/settings";
import { Suspense } from "react";
import RootFallback from "@/pageComponents/root/Fallback";

export default async function Home(props: { params: Promise<{ lng: Language }> }) {
    const { lng } = await props.params;

    const { t } = await translation(lng, "scoreboardHomePage");

    return (
        <Stack>
            <Header lng={lng} />
            <PaddingBox>
                <Stack spacing={2}>
                    <Suspense
                        fallback={
                            <Skeleton
                                variant="rounded"
                                sx={{ height: 35, width: "60%" }}
                            />
                        }
                    >
                        <WelcomeMessage lng={lng} />
                    </Suspense>
                    <Paper>
                        <Stack spacing={2}>
                            <Typography variant="h5">{t("recentGames")}</Typography>
                            <Suspense fallback={<RootFallback />}>
                                <ScoreboardList lng={lng} />
                            </Suspense>
                        </Stack>
                    </Paper>
                </Stack>
            </PaddingBox>
        </Stack>
    );
}
