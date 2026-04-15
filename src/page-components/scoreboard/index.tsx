import { UUID } from "crypto";
import { GAME_TYPE } from "@/constants/gameType";
import Klaverjas from "@/page-components/scoreboard/klaverjas";
import Boerenbridge from "@/page-components/scoreboard/boerenbridge";
import Mahjong from "@/page-components/scoreboard/mahjong";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getScoreboardById } from "@/server/service/scoreboard";
import QUERY_KEY from "@/constants/query-key";

type Props = {
    scoreboardId: UUID;
};

export default async function Scoreboard(props: Props) {
    const { scoreboardId } = props;

    const queryClient = new QueryClient();

    const scoreboard = await queryClient.fetchQuery({
        queryKey: [QUERY_KEY.SCOREBOARD_BY_ID, { id: scoreboardId }],
        queryFn: () => getScoreboardById(scoreboardId),
    });

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
                    <Boerenbridge scoreboardId={scoreboardId} />
                </HydrationBoundary>
            );
        case GAME_TYPE.MAHJONG:
            return (
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <Mahjong scoreboardId={scoreboardId} />
                </HydrationBoundary>
            );
        default:
            throw new Error("Unsupported game type");
    }
}
