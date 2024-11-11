import { UUID } from "crypto";
import { useQuery } from "@tanstack/react-query";
import { getTeamsQueryKey } from "@/utils/api/queries/queryKeys";
import { getTeams } from "@/app/[lng]/scoreboard/[id]/actions";

export default function useTeamsQuery(scoreboardId: UUID | null) {
    return useQuery({
        queryKey: getTeamsQueryKey(scoreboardId),
        queryFn: () => {
            if (scoreboardId == null) {
                throw new Error("scoreboardId is required");
            }
            return getTeams(scoreboardId);
        },
        enabled: scoreboardId != null,
    });
}
