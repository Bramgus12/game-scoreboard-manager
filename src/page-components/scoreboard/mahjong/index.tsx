import { UUID } from "crypto";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import QUERY_KEY from "@/constants/query-key";
import {
    getMahjongGame,
    getMahjongHands,
    getMahjongHandState,
    getMahjongPlayers,
    getMahjongTotals,
} from "@/server/service/mahjong";
import MahjongTable from "@/page-components/scoreboard/mahjong/mahjong-table";

type Props = {
    scoreboardId: UUID;
};

export default async function Mahjong(props: Props) {
    const { scoreboardId } = props;

    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: [QUERY_KEY.MAHJONG_GAME_FOR_SCOREBOARD, { scoreboardId }],
            queryFn: () => getMahjongGame(scoreboardId),
        }),
        queryClient.prefetchQuery({
            queryKey: [QUERY_KEY.MAHJONG_PLAYERS_FOR_SCOREBOARD, { scoreboardId }],
            queryFn: () => getMahjongPlayers(scoreboardId),
        }),
        queryClient.prefetchQuery({
            queryKey: [QUERY_KEY.MAHJONG_HANDS_FOR_SCOREBOARD, { scoreboardId }],
            queryFn: () => getMahjongHands(scoreboardId),
        }),
        queryClient.prefetchQuery({
            queryKey: [QUERY_KEY.MAHJONG_TOTALS_FOR_SCOREBOARD, { scoreboardId }],
            queryFn: () => getMahjongTotals(scoreboardId),
        }),
        queryClient.prefetchQuery({
            queryKey: [
                QUERY_KEY.MAHJONG_HAND_STATE_FOR_SCOREBOARD,
                { scoreboardId },
            ],
            queryFn: () => getMahjongHandState(scoreboardId),
        }),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <MahjongTable scoreboardId={scoreboardId} />
        </HydrationBoundary>
    );
}
