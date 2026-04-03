import { UUID } from "crypto";
import { getJson, postJson, putJson } from "@/api/client";
import { AppBoerenbridgeGame } from "@/models/app/boerenbridge-game/boerenbridge-game";
import { AppBoerenbridgePlayer } from "@/models/app/boerenbridge-player/boerenbridge-player";
import { CreateBoerenbridgeRoundForm } from "@/validation/create-boerenbridge-round-schema";
import { AppBoerenbridgeRoundRow } from "@/models/app/boerenbridge-round/boerenbridge-round-row";
import { AppBoerenbridgeTotal } from "@/models/app/boerenbridge-player/boerenbridge-total";
import { CreateBoerenbridgePlayersForm } from "@/validation/create-boerenbridge-players-schema";

function toGame(game: AppBoerenbridgeGame): AppBoerenbridgeGame {
    return {
        ...game,
        createdAt: new Date(game.createdAt),
        updatedAt: new Date(game.updatedAt),
    };
}

function toPlayers(
    players: Array<AppBoerenbridgePlayer>,
): Array<AppBoerenbridgePlayer> {
    return players.map((player) => ({
        ...player,
        createdAt: new Date(player.createdAt),
        updatedAt: new Date(player.updatedAt),
        rounds: player.rounds.map((round) => ({
            ...round,
            createdAt: new Date(round.createdAt),
            updatedAt: new Date(round.updatedAt),
        })),
    }));
}

export async function getBoerenbridgeGame(
    scoreboardId: UUID,
): Promise<AppBoerenbridgeGame> {
    const game = await getJson<AppBoerenbridgeGame>(
        `/scoreboards/${scoreboardId}/boerenbridge/game`,
    );

    return toGame(game);
}

export async function getBoerenbridgePlayers(
    scoreboardId: UUID,
): Promise<Array<AppBoerenbridgePlayer>> {
    const players = await getJson<Array<AppBoerenbridgePlayer>>(
        `/scoreboards/${scoreboardId}/boerenbridge/players`,
    );

    return toPlayers(players);
}

export async function initializeBoerenbridgePlayers(
    scoreboardId: UUID,
    data: CreateBoerenbridgePlayersForm,
): Promise<Array<AppBoerenbridgePlayer>> {
    const response = await postJson<
        CreateBoerenbridgePlayersForm,
        { players: Array<AppBoerenbridgePlayer> }
    >(`/scoreboards/${scoreboardId}/boerenbridge/initialize`, data);

    return toPlayers(response.players);
}

export async function getBoerenbridgeRounds(
    scoreboardId: UUID,
): Promise<Array<AppBoerenbridgeRoundRow>> {
    return getJson<Array<AppBoerenbridgeRoundRow>>(
        `/scoreboards/${scoreboardId}/boerenbridge/rounds`,
    );
}

export async function createBoerenbridgeRound(
    scoreboardId: UUID,
    payload: CreateBoerenbridgeRoundForm,
) {
    await postJson<CreateBoerenbridgeRoundForm, void>(
        `/scoreboards/${scoreboardId}/boerenbridge/rounds`,
        payload,
    );
}

export async function updateBoerenbridgeRound(
    scoreboardId: UUID,
    payload: CreateBoerenbridgeRoundForm,
) {
    await putJson<CreateBoerenbridgeRoundForm>(
        `/scoreboards/${scoreboardId}/boerenbridge/rounds`,
        payload,
    );
}

export async function getBoerenbridgeTotals(
    scoreboardId: UUID,
): Promise<Array<AppBoerenbridgeTotal>> {
    return getJson<Array<AppBoerenbridgeTotal>>(
        `/scoreboards/${scoreboardId}/boerenbridge/totals`,
    );
}

export async function getBoerenbridgeRoundNumber(
    scoreboardId: UUID,
): Promise<{ roundNumber: number; maxRound: number; isFinished: boolean }> {
    return getJson<{ roundNumber: number; maxRound: number; isFinished: boolean }>(
        `/scoreboards/${scoreboardId}/boerenbridge/round-number`,
    );
}
