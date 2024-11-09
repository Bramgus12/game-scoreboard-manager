import Round from "@/pageComponents/round";
import { UUID } from "crypto";
import { getRounds, getTeams } from "@/app/[lng]/scoreboard/[id]/actions";
import { redirect } from "next/navigation";
import { Language } from "@/app/i18n/settings";

export default async function RoundEditPage({
    params,
}: {
    params: Promise<{ id: UUID; roundNumber: string; lng: Language }>;
}) {
    const { id, roundNumber, lng } = await params;

    const mappedRoundNumber = Number(roundNumber);

    const teams = await getTeams(id);

    const rounds = await getRounds(id);

    const round = rounds.find((item) => item.roundNumber === mappedRoundNumber);

    if (round == null) {
        return redirect(`/scoreboard/${id}`);
    }

    return (
        <Round
            lng={lng}
            scoreboardId={id}
            teams={teams}
            roundNumber={mappedRoundNumber}
            initialState={round}
        />
    );
}
