import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { UUID } from "crypto";
import QUERY_KEY from "@/constants/query-key";
import { AppMahjongPlayer } from "@/models/app/mahjong/player";
import { getMahjongPlayers } from "@/api/mahjong";

export function getMahjongPlayersQueryOptions(
    scoreboardId: UUID | null,
): UseQueryOptions<Array<AppMahjongPlayer>> {
    return {
        queryKey: [QUERY_KEY.MAHJONG_PLAYERS_FOR_SCOREBOARD, { scoreboardId }],
        queryFn: () => {
            if (scoreboardId == null) {
                throw new Error("scoreboardId is null");
            }

            return getMahjongPlayers(scoreboardId);
        },
        enabled: scoreboardId != null,
    };
}

export default function useMahjongPlayersQuery(scoreboardId: UUID | null) {
    return useQuery(getMahjongPlayersQueryOptions(scoreboardId));
}
