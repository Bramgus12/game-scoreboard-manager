import { UUID } from "crypto";
import { getRoundNumber, getTeams } from "@/app/[lng]/scoreboard/[id]/actions";
import Round from "@/pageComponents/round";
import { Language } from "@/app/i18n/settings";

export default async function RoundPage({
    params,
}: {
    params: Promise<{ id: UUID; lng: Language }>;
}) {
    const { id, lng } = await params;

    const teams = await getTeams(id);

    const roundNumber = await getRoundNumber(id);

    return (
        <Round scoreboardId={id} teams={teams} roundNumber={roundNumber} lng={lng} />
    );
}
