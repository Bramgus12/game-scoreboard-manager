import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { UUID } from "crypto";
import QUERY_KEY from "@/constants/query-key";
import { AppMahjongHand } from "@/models/app/mahjong/hand";
import { getMahjongHands } from "@/api/mahjong";

export function getMahjongHandsQueryOptions(
    scoreboardId: UUID | null,
): UseQueryOptions<Array<AppMahjongHand>> {
    return {
        queryKey: [QUERY_KEY.MAHJONG_HANDS_FOR_SCOREBOARD, { scoreboardId }],
        queryFn: () => {
            if (scoreboardId == null) {
                throw new Error("scoreboardId is null");
            }

            return getMahjongHands(scoreboardId);
        },
        enabled: scoreboardId != null,
    };
}

export default function useMahjongHandsQuery(scoreboardId: UUID | null) {
    return useQuery(getMahjongHandsQueryOptions(scoreboardId));
}
