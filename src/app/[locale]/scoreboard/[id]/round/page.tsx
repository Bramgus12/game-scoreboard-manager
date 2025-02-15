import { UUID } from "crypto";
import Round from "@/pageComponents/round";
import { Language } from "@/i18n/interfaces";
import { getMessages } from "next-intl/server";
import { getRoundNumber, getTeamsForScoreboard } from "@/actions/klaverjasActions";

export default async function RoundPage({
    params,
}: {
    params: Promise<{ id: UUID; locale: Language }>;
}) {
    const { id, locale } = await params;

    await getMessages({ locale });

    const teams = await getTeamsForScoreboard(id);

    const roundNumber = await getRoundNumber(id);

    return <Round scoreboardId={id} teams={teams} roundNumber={roundNumber} />;
}
