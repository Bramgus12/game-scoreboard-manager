import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import QUERY_KEY from "@/constants/query-key";
import { UUID } from "crypto";
import { getTotals } from "@/server/service/klaverjas";

export function getKlaverjasTotalsQueryOptions(
    scoreboardId: UUID | null,
): UseQueryOptions<{ us: number; them: number }> {
    return {
        queryKey: [QUERY_KEY.KLAVERJAS_TOTALS_FOR_SCOREBOARD, { scoreboardId }],
        queryFn: () => {
            if (scoreboardId == null) {
                throw new Error("scoreboardId is null");
            }

            return getTotals(scoreboardId);
        },
    };
}

export default function useKlaverjasTotalsForScoreboardQuery(
    scoreboardId: UUID | null,
) {
    return useQuery(getKlaverjasTotalsQueryOptions(scoreboardId));
}
