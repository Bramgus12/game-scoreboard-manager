import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import ScoreboardList from "@/pageComponents/root/scoreboardList";
import PaddingBox from "@/pageComponents/root/PaddingBox";
import { Suspense } from "react";
import RootFallback from "@/pageComponents/root/Fallback";
import { getMessages, getTranslations } from "next-intl/server";
import { Language } from "@/i18n/interfaces";
import Header from "@/pageComponents/root/header";
import WelcomeMessage from "@/pageComponents/root/welcomeMessage";

export default async function Home(props: {
    params: Promise<{ locale: Language }>;
}) {
    const { locale } = await props.params;

    await getMessages({ locale });

    const t = await getTranslations("scoreboardHomePage");

    return (
        <Stack>
            <Header />
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
                        <WelcomeMessage />
                    </Suspense>
                    <Paper>
                        <Stack spacing={2}>
                            <Typography variant="h5">{t("recentGames")}</Typography>
                            <Suspense fallback={<RootFallback />}>
                                <ScoreboardList />
                            </Suspense>
                        </Stack>
                    </Paper>
                </Stack>
            </PaddingBox>
        </Stack>
    );
}
