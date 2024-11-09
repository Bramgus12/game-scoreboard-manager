import ScoreboardItem from "@/app/[lng]/scoreboardItem";
import { getScoreboards } from "@/app/[lng]/actions";

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
