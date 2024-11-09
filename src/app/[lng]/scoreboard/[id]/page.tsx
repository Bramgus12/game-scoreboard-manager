import { UUID } from "crypto";
import ScoreboardId from "@/pageComponents/scoreboardId";
import { Language } from "@/app/i18n/settings";

export default async function CurrentScoreboardPage({
    params,
}: {
    params: Promise<{ id: UUID; lng: Language }>;
}) {
    const { id, lng } = await params;

    return <ScoreboardId id={id} lng={lng} />;
}
