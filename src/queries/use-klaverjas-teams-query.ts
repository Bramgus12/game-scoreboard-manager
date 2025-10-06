import QUERY_KEY from "@/constants/query-key";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { UUID } from "crypto";
import { getTeamsForScoreboard } from "@/actions/klaverjas-actions";
import { AppKlaverjasTeam } from "@/models/app/klaverjas-team/klaverjas-team";

export function getKlaverjasTeamsQueryOptions(
    scoreboardId: UUID,
): UseQueryOptions<{ us: AppKlaverjasTeam; them: AppKlaverjasTeam } | null> {
    return {
        queryFn: () => getTeamsForScoreboard(scoreboardId),
        queryKey: [QUERY_KEY.KLAVERJAS_TEAMS_FOR_SCOREBOARD, { scoreboardId }],
    };
}

export default function useKlaverjasTeamsQuery(scoreboardId: UUID) {
    return useQuery(getKlaverjasTeamsQueryOptions(scoreboardId));
}
