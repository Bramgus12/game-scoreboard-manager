import { UUID } from "crypto";
import ScoreboardId from "@/pageComponents/scoreboardId";

export default async function CurrentScoreboardPage({
    params,
}: {
    params: Promise<{ id: UUID }>;
}) {
    const { id } = await params;

    return <ScoreboardId id={id} />;
}
