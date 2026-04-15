import { UUID } from "crypto";
import { AppMahjongGame } from "@/models/app/mahjong/game";
import { AppMahjongPlayer } from "@/models/app/mahjong/player";
import { AppMahjongHand } from "@/models/app/mahjong/hand";
import { AppMahjongHandState } from "@/models/app/mahjong/hand-state";
import { AppMahjongPlayerTotal } from "@/models/app/mahjong/total";
import { MAHJONG_WIN_TYPE } from "@/constants/mahjong";
import { getMahjongGameForScoreboard } from "@/server/repository/mahjong-game";
import { getMahjongPlayersForScoreboard } from "@/server/repository/mahjong-player";
import {
    createMahjongHand as repoCreateMahjongHand,
    getMahjongHandsForScoreboard,
} from "@/server/repository/mahjong-hand";
import {
    calculateMahjongHandDeltas,
    getCurrentWindsByPlayer,
    getPrevailingWindForHand,
} from "@/lib/mahjong-settlement";
import { CreateMahjongHandForm } from "@/validation/create-mahjong-hand-schema";

function requirePlayerCount(players: Array<AppMahjongPlayer>) {
    if (players.length !== 4) {
        throw new Error("Mahjong requires exactly 4 players");
    }
}

function assertPlayerBelongsToGame(
    players: Array<AppMahjongPlayer>,
    playerId: UUID,
) {
    if (!players.some((player) => player.id === playerId)) {
        throw new Error("Player does not belong to this mahjong game");
    }
}

function validateCreateHand(
    payload: CreateMahjongHandForm,
    players: Array<AppMahjongPlayer>,
    game: AppMahjongGame,
) {
    const { winType, winnerPlayerId, discardedByPlayerId } = payload;

    if (payload.winnerPoints > game.pointsLimit) {
        throw new Error("Winner points exceed game points limit");
    }

    if (winType === MAHJONG_WIN_TYPE.REMISE) {
        if (winnerPlayerId != null || discardedByPlayerId != null) {
            throw new Error("Remise hand cannot have winner or discarder");
        }

        if (payload.winnerPoints !== 0) {
            throw new Error("Remise hand must have 0 winner points");
        }

        return;
    }

    if (winnerPlayerId == null) {
        throw new Error("Winning hand must include a winner");
    }

    assertPlayerBelongsToGame(players, winnerPlayerId);

    if (winType === MAHJONG_WIN_TYPE.SELF_DRAW) {
        if (discardedByPlayerId != null) {
            throw new Error("Self draw hand cannot include a discarder");
        }

        return;
    }

    if (discardedByPlayerId == null) {
        throw new Error("Discard hand requires discarded by player");
    }

    assertPlayerBelongsToGame(players, discardedByPlayerId);

    if (discardedByPlayerId === winnerPlayerId) {
        throw new Error("Winner and discarder cannot be the same player");
    }
}

export async function getMahjongGame(scoreboardId: UUID): Promise<AppMahjongGame> {
    const game = await getMahjongGameForScoreboard(scoreboardId);

    if (game == null) {
        throw new Error("Mahjong game not found");
    }

    return game;
}

export async function getMahjongPlayers(
    scoreboardId: UUID,
): Promise<Array<AppMahjongPlayer>> {
    return getMahjongPlayersForScoreboard(scoreboardId);
}

export async function getMahjongHands(
    scoreboardId: UUID,
): Promise<Array<AppMahjongHand>> {
    return getMahjongHandsForScoreboard(scoreboardId);
}

export async function getMahjongHandState(
    scoreboardId: UUID,
): Promise<AppMahjongHandState> {
    const [game, players, hands] = await Promise.all([
        getMahjongGame(scoreboardId),
        getMahjongPlayers(scoreboardId),
        getMahjongHands(scoreboardId),
    ]);

    requirePlayerCount(players);

    const nextHandNumber = hands.length + 1;
    const isFinished = nextHandNumber > game.handLimit;
    const effectiveHandNumber = isFinished ? game.handLimit : nextHandNumber;

    return {
        nextHandNumber,
        isFinished,
        prevailingWind: getPrevailingWindForHand(effectiveHandNumber),
        currentWindsByPlayerId: getCurrentWindsByPlayer(
            players,
            effectiveHandNumber,
        ),
    };
}

export async function createMahjongHand(
    scoreboardId: UUID,
    payload: CreateMahjongHandForm,
) {
    const [game, players, hands] = await Promise.all([
        getMahjongGame(scoreboardId),
        getMahjongPlayers(scoreboardId),
        getMahjongHands(scoreboardId),
    ]);

    requirePlayerCount(players);

    const nextHandNumber = hands.length + 1;

    if (nextHandNumber > game.handLimit) {
        throw new Error("Mahjong game already finished");
    }

    validateCreateHand(payload, players, game);

    await repoCreateMahjongHand({
        scoreboardId,
        handNumber: nextHandNumber,
        prevailingWind: getPrevailingWindForHand(nextHandNumber),
        winType: payload.winType,
        winnerPlayerId: payload.winnerPlayerId,
        discardedByPlayerId: payload.discardedByPlayerId,
        winnerPoints:
            payload.winType === MAHJONG_WIN_TYPE.REMISE ? 0 : payload.winnerPoints,
        isLimitHand:
            payload.winType === MAHJONG_WIN_TYPE.REMISE
                ? false
                : payload.isLimitHand,
    });
}

export async function getMahjongTotals(
    scoreboardId: UUID,
): Promise<Array<AppMahjongPlayerTotal>> {
    const [players, hands] = await Promise.all([
        getMahjongPlayers(scoreboardId),
        getMahjongHands(scoreboardId),
    ]);

    requirePlayerCount(players);

    const totalsByPlayerId: Record<string, number> = {};

    players.forEach((player) => {
        totalsByPlayerId[player.id] = 0;
    });

    hands.forEach((hand) => {
        const deltas = calculateMahjongHandDeltas(hand, players);

        players.forEach((player) => {
            totalsByPlayerId[player.id] += deltas[player.id] ?? 0;
        });
    });

    return players.map((player) => ({
        playerId: player.id,
        playerName: player.name,
        total: totalsByPlayerId[player.id] ?? 0,
    }));
}
