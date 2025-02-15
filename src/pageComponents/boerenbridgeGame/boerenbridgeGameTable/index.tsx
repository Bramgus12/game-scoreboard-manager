import { UUID } from "crypto";
import BoerenbridgeTableComponent from "@/pageComponents/boerenbridgeGame/boerenbridgeGameTable/TableComponent";
import { getBoerenbridgeGame, getPlayers } from "@/actions/boerenbridgeActions";

export type Round = Record<string, { guess: number; points: number }> & {
    roundNumber: number;
};

export default async function BoerenbridgeGameTable(props: { scoreboardId: UUID }) {
    const { scoreboardId } = props;

    const game = await getBoerenbridgeGame(scoreboardId);
    const players = await getPlayers(scoreboardId, game.id);

    return <BoerenbridgeTableComponent players={players} game={game} />;
}
