import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { UUID } from "crypto";
import QUERY_KEY from "@/constants/query-key";
import { getBoerenbridgeRoundNumber } from "@/api/boerenbridge";

export function getBoerenbridgeRoundNumberQueryOptions(
    scoreboardId: UUID | null,
): UseQueryOptions<{ roundNumber: number; maxRound: number; isFinished: boolean }> {
    return {
        queryKey: [
            QUERY_KEY.BOERENBRIDGE_ROUND_NUMBER_FOR_SCOREBOARD,
            { scoreboardId },
        ],
        queryFn: () => {
            if (scoreboardId == null) {
                throw new Error("scoreboardId is null");
            }

            return getBoerenbridgeRoundNumber(scoreboardId);
        },
        enabled: scoreboardId != null,
    };
}

export default function useBoerenbridgeRoundNumberQuery(scoreboardId: UUID | null) {
    return useQuery(getBoerenbridgeRoundNumberQueryOptions(scoreboardId));
}
