import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Games from "@/page-components/root/games";
import {
    getScoreboardsForUser,
    getScoreboardsStatsForUser,
} from "@/server/service/scoreboard";
import QUERY_KEY from "@/constants/query-key";

export default async function ScoreboardsPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.SCOREBOARDS_FOR_USER],
        queryFn: getScoreboardsForUser,
    });
    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.SCOREBOARDS_STATS_FOR_USER],
        queryFn: getScoreboardsStatsForUser,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Games />
        </HydrationBoundary>
    );
}
