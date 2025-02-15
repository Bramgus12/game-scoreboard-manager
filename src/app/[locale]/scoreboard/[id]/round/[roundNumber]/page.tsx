import Round from "@/pageComponents/round";
import { UUID } from "crypto";
import { redirect } from "next/navigation";
import { getMessages } from "next-intl/server";
import {
    getRoundsForScoreboard,
    getTeamsForScoreboard,
} from "@/actions/klaverjasActions";
import { Language } from "@/i18n/interfaces";

export default async function RoundEditPage({
    params,
}: {
    params: Promise<{ id: UUID; roundNumber: string; locale: Language }>;
}) {
    const { id, roundNumber, locale } = await params;

    await getMessages({ locale });

    const mappedRoundNumber = Number(roundNumber);

    const teams = await getTeamsForScoreboard(id);

    const rounds = await getRoundsForScoreboard(id);

    const round = rounds.find((item) => item.roundNumber === mappedRoundNumber);

    if (round == null) {
        return redirect(`/scoreboard/${id}`);
    }

    return (
        <Round
            scoreboardId={id}
            teams={teams}
            roundNumber={mappedRoundNumber}
            initialState={round}
        />
    );
}
