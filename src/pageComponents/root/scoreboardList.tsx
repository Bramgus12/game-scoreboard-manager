import ScoreboardItem from "@/pageComponents/root/scoreboardItem";
import { getScoreboards } from "@/app/[lng]/actions";
import { Language } from "@/app/i18n/settings";

export default async function ScoreboardList(props: { lng: Language }) {
    const { lng } = props;

    const data = await getScoreboards();

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
