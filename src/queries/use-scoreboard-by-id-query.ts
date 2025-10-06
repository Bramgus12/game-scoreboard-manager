import { AppScoreboard } from "@/models/app/scoreboard/scoreboard";
import { getScoreboardById } from "@/actions/scoreboard-actions";
import QUERY_KEY from "@/constants/query-key";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { UUID } from "crypto";

export function getScoreboardByIdQueryOptions(
    id: UUID,
): UseQueryOptions<AppScoreboard> {
    return {
        queryFn: () => getScoreboardById(id),
        queryKey: [QUERY_KEY.SCOREBOARD_BY_ID],
    };
}

export default function useScoreboardByIdQuery(id: UUID) {
    return useQuery(getScoreboardByIdQueryOptions(id));
}
