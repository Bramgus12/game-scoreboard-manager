import { UUID } from "crypto";
import { GAME_TYPE } from "@/constants/gameType";
import Klaverjas from "@/page-components/scoreboard/klaverjas";
import Boerenbridge from "@/page-components/scoreboard/boerenbridge";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getScoreboardByIdQueryOptions } from "@/queries/use-scoreboard-by-id-query";

type Props = {
    scoreboardId: UUID;
};

export default async function Scoreboard(props: Props) {
    const { scoreboardId } = props;

    const queryClient = new QueryClient();

    const scoreboard = await queryClient.fetchQuery(
        getScoreboardByIdQueryOptions(scoreboardId),
    );

    switch (scoreboard.gameType) {
        case GAME_TYPE.KLAVERJAS:
            return (
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <Klaverjas scoreboardId={scoreboardId} />
                </HydrationBoundary>
            );
        case GAME_TYPE.BOERENBRIDGE:
            return (
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <Boerenbridge />
                </HydrationBoundary>
            );
        default:
            throw new Error("Unsupported game type");
    }
}
