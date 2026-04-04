import { UUID } from "crypto";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import QUERY_KEY from "@/constants/query-key";
import {
    getBoerenbridgeGame,
    getBoerenbridgePlayers,
    getBoerenbridgeRounds,
    getBoerenbridgeTotals,
} from "@/server/service/boerenbridge";
import BoerenbridgeTable from "@/page-components/scoreboard/boerenbridge/boerenbridge-table";

type Props = {
    scoreboardId: UUID;
};

export default async function Boerenbridge(props: Props) {
    const { scoreboardId } = props;

    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: [QUERY_KEY.BOERENBRIDGE_GAME_FOR_SCOREBOARD, { scoreboardId }],
            queryFn: () => getBoerenbridgeGame(scoreboardId),
        }),
        queryClient.prefetchQuery({
            queryKey: [
                QUERY_KEY.BOERENBRIDGE_PLAYERS_FOR_SCOREBOARD,
                { scoreboardId },
            ],
            queryFn: () => getBoerenbridgePlayers(scoreboardId),
        }),
        queryClient.prefetchQuery({
            queryKey: [
                QUERY_KEY.BOERENBRIDGE_ROUNDS_FOR_SCOREBOARD,
                { scoreboardId },
            ],
            queryFn: () => getBoerenbridgeRounds(scoreboardId),
        }),
        queryClient.prefetchQuery({
            queryKey: [
                QUERY_KEY.BOERENBRIDGE_TOTALS_FOR_SCOREBOARD,
                { scoreboardId },
            ],
            queryFn: () => getBoerenbridgeTotals(scoreboardId),
        }),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <BoerenbridgeTable scoreboardId={scoreboardId} />
        </HydrationBoundary>
    );
}
