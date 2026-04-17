import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { UUID } from "crypto";
import QUERY_KEY from "@/constants/query-key";
import { AppMahjongPlayerTotal } from "@/models/app/mahjong/total";
import { getMahjongTotals } from "@/api/mahjong";

export function getMahjongTotalsQueryOptions(
    scoreboardId: UUID | null,
): UseQueryOptions<Array<AppMahjongPlayerTotal>> {
    return {
        queryKey: [QUERY_KEY.MAHJONG_TOTALS_FOR_SCOREBOARD, { scoreboardId }],
        queryFn: () => {
            if (scoreboardId == null) {
                throw new Error("scoreboardId is null");
            }

            return getMahjongTotals(scoreboardId);
        },
        enabled: scoreboardId != null,
    };
}

export default function useMahjongTotalsQuery(scoreboardId: UUID | null) {
    return useQuery(getMahjongTotalsQueryOptions(scoreboardId));
}
