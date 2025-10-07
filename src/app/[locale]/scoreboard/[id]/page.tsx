import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getScoreboardByIdQueryOptions } from "@/queries/use-scoreboard-by-id-query";
import { UUID } from "crypto";
import Scoreboard from "@/page-components/scoreboard";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ id: UUID }>;
};

export default async function ScoreboardPage(props: Props) {
    const { params } = props;
    const { id } = await params;

    const queryClient = new QueryClient();

    try {
        await queryClient.fetchQuery(getScoreboardByIdQueryOptions(id));
    } catch {
        notFound();
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Scoreboard scoreboardId={id} />
        </HydrationBoundary>
    );
}
