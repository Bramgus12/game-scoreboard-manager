import ScoreboardItem from "@/pageComponents/root/scoreboardItem";
import { Button, Grid2 } from "@mui/material";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getScoreboardsForUser } from "@/actions/scoreboardActions";

export default async function ScoreboardList() {
    const t = await getTranslations("scoreboardHomePage");

    const data = await getScoreboardsForUser();

    if (data.length === 0) {
        return (
            <Grid2
                container
                direction="column"
                spacing={3}
                alignItems={"center"}
                paddingY={4}
            >
                <Grid2>{t("noScoreboards")}</Grid2>
                <Grid2>
                    <Button
                        component={Link}
                        href={`/scoreboard`}
                        variant="contained"
                    >
                        {t("createGame")}
                    </Button>
                </Grid2>
            </Grid2>
        );
    }

    return data
        .sort(
            (scoreboard1, scoreboard2) =>
                scoreboard2.createdAt.valueOf() - scoreboard1.createdAt.valueOf(),
        )
        .map((scoreboard) => {
            return <ScoreboardItem scoreboard={scoreboard} key={scoreboard.id} />;
        });
}
