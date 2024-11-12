import { UUID } from "crypto";
import ScoreboardId from "@/pageComponents/scoreboardId";
import { Language } from "@/app/i18n/settings";
import { Suspense } from "react";
import ScoreboardIdFallback from "@/pageComponents/scoreboardId/Fallback";

export default async function CurrentScoreboardPage({
    params,
}: {
    params: Promise<{ id: UUID; lng: Language }>;
}) {
    const { id, lng } = await params;

    return (
        <Suspense fallback={<ScoreboardIdFallback />}>
            <ScoreboardId id={id} lng={lng} />
        </Suspense>
    );
}
