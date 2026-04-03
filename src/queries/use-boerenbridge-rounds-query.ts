import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { UUID } from "crypto";
import QUERY_KEY from "@/constants/query-key";
import { AppBoerenbridgeRoundRow } from "@/models/app/boerenbridge-round/boerenbridge-round-row";
import { getBoerenbridgeRounds } from "@/api/boerenbridge";

export function getBoerenbridgeRoundsQueryOptions(
    scoreboardId: UUID | null,
): UseQueryOptions<Array<AppBoerenbridgeRoundRow>> {
    return {
        queryKey: [QUERY_KEY.BOERENBRIDGE_ROUNDS_FOR_SCOREBOARD, { scoreboardId }],
        queryFn: () => {
            if (scoreboardId == null) {
                throw new Error("scoreboardId is null");
            }

            return getBoerenbridgeRounds(scoreboardId);
        },
        enabled: scoreboardId != null,
    };
}

export default function useBoerenbridgeRoundsQuery(scoreboardId: UUID | null) {
    return useQuery(getBoerenbridgeRoundsQueryOptions(scoreboardId));
}
