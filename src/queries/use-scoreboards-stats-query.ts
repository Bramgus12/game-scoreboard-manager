import { AppScoreboardsStats } from "@/models/app/scoreboard/scoreboard-stats";
import QUERY_KEY from "@/constants/query-key";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getScoreboardsStatsForUser } from "@/api/scoreboard";

export function getScoreboardsStatsQueryOptions(): UseQueryOptions<AppScoreboardsStats> {
    return {
        queryFn: getScoreboardsStatsForUser,
        queryKey: [QUERY_KEY.SCOREBOARDS_STATS_FOR_USER],
    };
}

export default function useScoreboardsStatsQuery() {
    return useQuery(getScoreboardsStatsQueryOptions());
}
