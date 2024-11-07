import { useQuery } from "@tanstack/react-query";
import { getRoundQueryKey } from "@/utils/api/queries/queryKeys";
import { getRoundsByTeam } from "@/app/scoreboard/[id]/actions";
import { UUID } from "crypto";

export function useRoundQuery(scoreboardId: UUID | null, teamId: UUID | null) {
    return useQuery({
        queryKey: getRoundQueryKey(scoreboardId, teamId),
        queryFn: () => {
            if (scoreboardId == null) {
                throw new Error("scoreboardId is required");
            }
            if (teamId == null) {
                throw new Error("teamId is required");
            }
            return getRoundsByTeam(scoreboardId, teamId);
        },
        enabled: scoreboardId != null && teamId != null,
    });
}
