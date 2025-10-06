import { UUID } from "crypto";
import { GAME_TYPE } from "@/constants/gameType";
import Klaverjas from "@/page-components/scoreboard/klaverjas";
import { getScoreboardById } from "@/actions/scoreboard-actions";

type Props = {
    scoreboardId: UUID;
};

export default async function Scoreboard(props: Props) {
    const { scoreboardId } = props;

    const scoreboard = await getScoreboardById(scoreboardId);

    if (scoreboard?.gameType === GAME_TYPE.KLAVERJAS) {
        return <Klaverjas scoreboardId={scoreboardId} />;
    }

    return <div>{scoreboard?.scoreboardName}</div>;
}
