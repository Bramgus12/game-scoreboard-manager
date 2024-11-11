import ScoreboardItem from "@/pageComponents/root/scoreboardItem";
import { getScoreboards } from "@/app/[lng]/actions";
import { Language } from "@/app/i18n/settings";
import { Button, Grid2 } from "@mui/material";
import { translation } from "@/app/i18n";
import Link from "next/link";

export default async function ScoreboardList(props: { lng: Language }) {
    const { lng } = props;

    const { t } = await translation(lng, "scoreboardHomePage");

    const data = await getScoreboards();

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
                        href={`/${lng}/scoreboard`}
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
            return (
                <ScoreboardItem
                    scoreboard={scoreboard}
                    key={scoreboard.id}
                    lng={lng}
                />
            );
        });
}
