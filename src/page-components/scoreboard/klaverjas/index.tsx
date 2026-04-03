import { UUID } from "crypto";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import KlaverjasTable from "@/page-components/scoreboard/klaverjas/klaverjas-table";
import {
    getRoundsForScoreboard,
    getTeamsForScoreboard,
    getTotals,
} from "@/server/service/klaverjas";
import QUERY_KEY from "@/constants/query-key";

type Props = {
    scoreboardId: UUID;
};

export default async function Klaverjas(props: Props) {
    const { scoreboardId } = props;

    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: [QUERY_KEY.KLAVERJAS_TOTALS_FOR_SCOREBOARD, { scoreboardId }],
            queryFn: () => getTotals(scoreboardId),
        }),
        queryClient.prefetchQuery({
            queryKey: [QUERY_KEY.KLAVERJAS_TEAMS_FOR_SCOREBOARD, { scoreboardId }],
            queryFn: () => getTeamsForScoreboard(scoreboardId),
        }),
        queryClient.prefetchQuery({
            queryKey: [QUERY_KEY.KLAVERJAS_ROUNDS_FOR_SCOREBOARD, { scoreboardId }],
            queryFn: () => getRoundsForScoreboard(scoreboardId),
        }),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <KlaverjasTable scoreboardId={scoreboardId} />
        </HydrationBoundary>
    );
}
