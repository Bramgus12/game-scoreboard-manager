import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getScoreboardByIdQueryOptions } from "@/queries/use-scoreboard-by-id-query";
import { UUID } from "crypto";
import Scoreboard from "@/page-components/scoreboard";

type Props = {
    params: Promise<{ id: UUID }>;
};

export default async function ScoreboardPage(props: Props) {
    const { params } = props;
    const { id } = await params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(getScoreboardByIdQueryOptions(id));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Scoreboard scoreboardId={id} />
        </HydrationBoundary>
    );
}
