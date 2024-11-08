import { UUID } from "crypto";
import { getRoundNumber, getTeams } from "@/app/scoreboard/[id]/actions";
import Round from "@/pageComponents/round";

export default async function RoundPage({
    params,
}: {
    params: Promise<{ id: UUID }>;
}) {
    const scoreboardId = (await params).id;

    const teams = await getTeams(scoreboardId);

    const roundNumber = await getRoundNumber(scoreboardId);

    return (
        <Round scoreboardId={scoreboardId} teams={teams} roundNumber={roundNumber} />
    );
}
