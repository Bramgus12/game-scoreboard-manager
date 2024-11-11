import { useQuery } from "@tanstack/react-query";
import { getRoundQueryKey } from "@/utils/api/queries/queryKeys";
import { UUID } from "crypto";
import { getRoundsByTeam } from "@/app/[lng]/scoreboard/[id]/actions";

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
