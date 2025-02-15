import { UUID } from "crypto";
import ScoreboardId from "@/pageComponents/scoreboardId";
import { Suspense } from "react";
import ScoreboardIdFallback from "@/pageComponents/klaverjasGame/Fallback";
import { Language } from "@/i18n/interfaces";
import { getMessages } from "next-intl/server";

export default async function CurrentScoreboardPage({
    params,
}: {
    params: Promise<{ id: UUID; locale: Language }>;
}) {
    const { id, locale } = await params;

    await getMessages({ locale });

    return (
        <Suspense fallback={<ScoreboardIdFallback />}>
            <ScoreboardId id={id} />
        </Suspense>
    );
}
