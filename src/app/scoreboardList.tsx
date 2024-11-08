import ScoreboardItem from "@/app/scoreboardItem";
import { getScoreboards } from "@/app/actions";

export default async function ScoreboardList() {
    const data = await getScoreboards();

    return data
        .sort(
            (scoreboard1, scoreboard2) =>
                scoreboard2.createdAt.valueOf() - scoreboard1.createdAt.valueOf(),
        )
        .map((scoreboard) => {
            return <ScoreboardItem scoreboard={scoreboard} key={scoreboard.id} />;
        });
}
