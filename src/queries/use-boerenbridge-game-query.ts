import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { UUID } from "crypto";
import QUERY_KEY from "@/constants/query-key";
import { AppBoerenbridgeGame } from "@/models/app/boerenbridge-game/boerenbridge-game";
import { getBoerenbridgeGame } from "@/api/boerenbridge";

export function getBoerenbridgeGameQueryOptions(
    scoreboardId: UUID | null,
): UseQueryOptions<AppBoerenbridgeGame> {
    return {
        queryKey: [QUERY_KEY.BOERENBRIDGE_GAME_FOR_SCOREBOARD, { scoreboardId }],
        queryFn: () => {
            if (scoreboardId == null) {
                throw new Error("scoreboardId is null");
            }

            return getBoerenbridgeGame(scoreboardId);
        },
        enabled: scoreboardId != null,
    };
}

export default function useBoerenbridgeGameQuery(scoreboardId: UUID | null) {
    return useQuery(getBoerenbridgeGameQueryOptions(scoreboardId));
}
