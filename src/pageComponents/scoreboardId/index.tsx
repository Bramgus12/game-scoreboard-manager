import { UUID } from "crypto";
import { GAME_TYPE } from "@/constants/gameType";
import KlaverjasGame from "@/pageComponents/klaverjasGame";
import BoerenbridgeGame from "@/pageComponents/boerenbridgeGame";
import { redirect } from "next/navigation";
import { getScoreboardById } from "@/actions/scoreboardActions";

type Props = {
    id: UUID;
};

export default async function ScoreboardId(props: Props) {
    const { id } = props;

    const scoreboard = await getScoreboardById(id);

    switch (scoreboard.gameType) {
        case GAME_TYPE.KLAVERJAS:
            return <KlaverjasGame id={scoreboard.id} />;
        case GAME_TYPE.BOERENBRIDGE:
            return <BoerenbridgeGame id={scoreboard.id} />;
        default:
            redirect(`/`);
    }
}
