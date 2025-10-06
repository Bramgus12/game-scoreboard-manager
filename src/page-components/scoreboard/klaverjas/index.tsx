import { UUID } from "crypto";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import KlaverjasTable from "@/page-components/scoreboard/klaverjas/klaverjas-table";
import { getKlaverjasTotalsQueryOptions } from "@/queries/use-klaverjas-totals-for-scoreboard-query";
import { getKlaverjasTeamsQueryOptions } from "@/queries/use-klaverjas-teams-query";
import { getKlaverjasRoundsForScoreboardQueryOptions } from "@/queries/use-klaverjas-rounds-for-scoreboard-query";

type Props = {
    scoreboardId: UUID;
};

export default async function Klaverjas(props: Props) {
    const { scoreboardId } = props;

    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery(getKlaverjasTotalsQueryOptions(scoreboardId)),
        queryClient.prefetchQuery(getKlaverjasTeamsQueryOptions(scoreboardId)),
        queryClient.prefetchQuery(
            getKlaverjasRoundsForScoreboardQueryOptions(scoreboardId),
        ),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <KlaverjasTable scoreboardId={scoreboardId} />
        </HydrationBoundary>
    );
}
