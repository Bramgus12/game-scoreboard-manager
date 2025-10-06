import { AppScoreboard } from "@/models/app/scoreboard/scoreboard";
import { getScoreboardsForUser } from "@/actions/scoreboard-actions";
import QUERY_KEY from "@/constants/query-key";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function getScoreboardsQueryOptions(): UseQueryOptions<Array<AppScoreboard>> {
    return {
        queryFn: getScoreboardsForUser,
        queryKey: [QUERY_KEY.SCOREBOARDS_FOR_USER],
    };
}

export default function useScoreboardsQuery() {
    return useQuery(getScoreboardsQueryOptions());
}
