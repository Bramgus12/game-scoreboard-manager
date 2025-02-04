import { apiRoutes } from "@/utils/api/useAPI";
import { UUID } from "crypto";
import { Language } from "@/app/i18n/settings";
import BoerenbridgeTableComponent from "@/pageComponents/boerenbridgeGame/boerenbridgeGameTable/TableComponent";

export type Round = Record<string, { guess: number; points: number }> & {
    roundNumber: number;
};

export default async function BoerenbridgeGameTable(props: {
    scoreboardId: UUID;
    lng: Language;
}) {
    const { scoreboardId } = props;

    const {
        boerenbridgePlayer: { get: getPlayers },
        boerenbridgeGame: { get: getBoerenbridgeGame },
    } = apiRoutes;

    const game = await getBoerenbridgeGame(scoreboardId);
    const players = await getPlayers(scoreboardId, game.id);

    return <BoerenbridgeTableComponent players={players} game={game} />;
}
