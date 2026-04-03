import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Games from "@/page-components/root/games";
import { getScoreboardsForUser } from "@/server/service/scoreboard";
import QUERY_KEY from "@/constants/query-key";

export default async function Home() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.SCOREBOARDS_FOR_USER],
        queryFn: getScoreboardsForUser,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Games />
        </HydrationBoundary>
    );
}
