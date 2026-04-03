import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { UUID } from "crypto";
import QUERY_KEY from "@/constants/query-key";
import { AppBoerenbridgePlayer } from "@/models/app/boerenbridge-player/boerenbridge-player";
import { getBoerenbridgePlayers } from "@/api/boerenbridge";

export function getBoerenbridgePlayersQueryOptions(
    scoreboardId: UUID | null,
): UseQueryOptions<Array<AppBoerenbridgePlayer>> {
    return {
        queryKey: [QUERY_KEY.BOERENBRIDGE_PLAYERS_FOR_SCOREBOARD, { scoreboardId }],
        queryFn: () => {
            if (scoreboardId == null) {
                throw new Error("scoreboardId is null");
            }

            return getBoerenbridgePlayers(scoreboardId);
        },
        enabled: scoreboardId != null,
    };
}

export default function useBoerenbridgePlayersQuery(scoreboardId: UUID | null) {
    return useQuery(getBoerenbridgePlayersQueryOptions(scoreboardId));
}
