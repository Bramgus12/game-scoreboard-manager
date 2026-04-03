import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { UUID } from "crypto";
import Scoreboard from "@/page-components/scoreboard";
import { notFound } from "next/navigation";
import { getScoreboardById } from "@/server/service/scoreboard";
import QUERY_KEY from "@/constants/query-key";

type Props = {
    params: Promise<{ id: UUID }>;
};

export default async function ScoreboardPage(props: Props) {
    const { params } = props;
    const { id } = await params;

    const queryClient = new QueryClient();

    try {
        await queryClient.fetchQuery({
            queryKey: [QUERY_KEY.SCOREBOARD_BY_ID, { id }],
            queryFn: () => getScoreboardById(id),
        });
    } catch {
        notFound();
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Scoreboard scoreboardId={id} />
        </HydrationBoundary>
    );
}
