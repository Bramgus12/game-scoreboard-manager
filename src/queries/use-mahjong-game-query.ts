import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { UUID } from "crypto";
import QUERY_KEY from "@/constants/query-key";
import { AppMahjongGame } from "@/models/app/mahjong/game";
import { getMahjongGame } from "@/api/mahjong";

export function getMahjongGameQueryOptions(
    scoreboardId: UUID | null,
): UseQueryOptions<AppMahjongGame> {
    return {
        queryKey: [QUERY_KEY.MAHJONG_GAME_FOR_SCOREBOARD, { scoreboardId }],
        queryFn: () => {
            if (scoreboardId == null) {
                throw new Error("scoreboardId is null");
            }

            return getMahjongGame(scoreboardId);
        },
        enabled: scoreboardId != null,
    };
}

export default function useMahjongGameQuery(scoreboardId: UUID | null) {
    return useQuery(getMahjongGameQueryOptions(scoreboardId));
}
