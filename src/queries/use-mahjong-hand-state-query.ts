import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { UUID } from "crypto";
import QUERY_KEY from "@/constants/query-key";
import { AppMahjongHandState } from "@/models/app/mahjong/hand-state";
import { getMahjongHandState } from "@/api/mahjong";

export function getMahjongHandStateQueryOptions(
    scoreboardId: UUID | null,
): UseQueryOptions<AppMahjongHandState> {
    return {
        queryKey: [QUERY_KEY.MAHJONG_HAND_STATE_FOR_SCOREBOARD, { scoreboardId }],
        queryFn: () => {
            if (scoreboardId == null) {
                throw new Error("scoreboardId is null");
            }

            return getMahjongHandState(scoreboardId);
        },
        enabled: scoreboardId != null,
    };
}

export default function useMahjongHandStateQuery(scoreboardId: UUID | null) {
    return useQuery(getMahjongHandStateQueryOptions(scoreboardId));
}
