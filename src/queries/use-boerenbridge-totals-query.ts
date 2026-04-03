import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { UUID } from "crypto";
import QUERY_KEY from "@/constants/query-key";
import { AppBoerenbridgeTotal } from "@/models/app/boerenbridge-player/boerenbridge-total";
import { getBoerenbridgeTotals } from "@/api/boerenbridge";

export function getBoerenbridgeTotalsQueryOptions(
    scoreboardId: UUID | null,
): UseQueryOptions<Array<AppBoerenbridgeTotal>> {
    return {
        queryKey: [QUERY_KEY.BOERENBRIDGE_TOTALS_FOR_SCOREBOARD, { scoreboardId }],
        queryFn: () => {
            if (scoreboardId == null) {
                throw new Error("scoreboardId is null");
            }

            return getBoerenbridgeTotals(scoreboardId);
        },
        enabled: scoreboardId != null,
    };
}

export default function useBoerenbridgeTotalsQuery(scoreboardId: UUID | null) {
    return useQuery(getBoerenbridgeTotalsQueryOptions(scoreboardId));
}
