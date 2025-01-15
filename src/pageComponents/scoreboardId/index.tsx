import { UUID } from "crypto";
import { Language } from "@/app/i18n/settings";
import { apiRoutes } from "@/utils/api/useAPI";
import { GAME_TYPE } from "@/constants/gameType";
import KlaverjasGame from "@/pageComponents/klaverjasGame";
import BoerenbridgeGame from "@/pageComponents/boerenbridgeGame";

type Props = {
    id: UUID;
    lng: Language;
};

export default async function ScoreboardId(props: Props) {
    const { lng, id } = props;

    const {
        scoreboard: { getById: getScoreboardById },
    } = apiRoutes;

    const scoreboard = await getScoreboardById(id);

    switch (scoreboard.gameType) {
        case GAME_TYPE.KLAVERJAS:
            return <KlaverjasGame id={scoreboard.id} lng={lng} />;
        case GAME_TYPE.BOERENBRIDGE:
            return <BoerenbridgeGame id={scoreboard.id} lng={lng} />;
        default:
            return <div>Unsupported game type</div>;
    }
}
