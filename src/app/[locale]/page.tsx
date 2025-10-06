import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Games from "@/page-components/root/games";
import { getScoreboardsQueryOptions } from "@/queries/use-scoreboards-query";

export default async function Home() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(getScoreboardsQueryOptions());

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Games />
        </HydrationBoundary>
    );
}
