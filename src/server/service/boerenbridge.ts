import { UUID } from "crypto";
import { domainToAppBoerenbridgeGame } from "@/mappers/boerenbridge-game";
import { AppBoerenbridgeGame } from "@/models/app/boerenbridge-game/boerenbridge-game";
import { AppCreateBoerenbridgePlayer } from "@/models/app/boerenbridge-player/create-boerenbridge-player";
import { AppBoerenbridgePlayer } from "@/models/app/boerenbridge-player/boerenbridge-player";
import {
    getBoerenbridgeGameForScoreboard,
    setCurrentRoundForScoreboard,
} from "@/server/repository/boerenbridge-game";
import {
    createPlayersForGame,
    getPlayersForScoreboard,
} from "@/server/repository/boerenbridge-player";
import {
    createRoundEntriesForPlayers,
    updateRoundEntriesForPlayers,
} from "@/server/repository/boerenbridge-round";
import { parseUuid } from "@/lib/uuid";

export type AppBoerenbridgeRoundEntryInput = {
    playerId: UUID;
    expectedWins: number;
    actualWins: number;
};

export type AppBoerenbridgeRoundRow = {
    roundNumber: number;
    entries: Array<AppBoerenbridgeRoundEntryInput>;
};

export type AppBoerenbridgeTotal = {
    playerId: UUID;
    playerName: string;
    total: number;
    rank: number;
};

export type AppBoerenbridgeRoundState = {
    roundNumber: number;
    maxRound: number;
    isFinished: boolean;
};

function toRoundRows(players: Array<AppBoerenbridgePlayer>) {
    const roundMap = new Map<number, Array<AppBoerenbridgeRoundEntryInput>>();

    players.forEach((player) => {
        player.rounds.forEach((round) => {
            const existingEntries = roundMap.get(round.roundNumber) ?? [];

            existingEntries.push({
                playerId: player.id,
                expectedWins: round.expectedWins,
                actualWins: round.actualWins,
            });

            roundMap.set(round.roundNumber, existingEntries);
        });
    });

    return [...roundMap.entries()]
        .sort((a, b) => a[0] - b[0])
        .map<AppBoerenbridgeRoundRow>(([roundNumber, entries]) => ({
            roundNumber,
            entries,
        }));
}

function toScore(
    pointsPerWonCardOnCorrectGuess: number,
    expectedWins: number,
    actualWins: number,
) {
    if (expectedWins === actualWins) {
        return 10 + actualWins * pointsPerWonCardOnCorrectGuess;
    }

    return -Math.abs(expectedWins - actualWins) * pointsPerWonCardOnCorrectGuess;
}

function getMaxRoundForPlayerCount(playerCount: number) {
    if (playerCount <= 0) {
        return 1;
    }

    return Math.floor(52 / playerCount);
}

function getRoundForTurn(turn: number, maxRound: number) {
    if (turn <= maxRound) {
        return turn;
    }

    return 2 * maxRound - turn + 1;
}

function validateRoundEntries(
    roundNumber: number,
    entries: Array<AppBoerenbridgeRoundEntryInput>,
) {
    entries.forEach((entry) => {
        if (entry.expectedWins < 0 || entry.expectedWins > roundNumber) {
            throw new Error("Expected wins must be between 0 and current round");
        }

        if (entry.actualWins < 0 || entry.actualWins > roundNumber) {
            throw new Error("Actual wins must be between 0 and current round");
        }
    });

    const expectedWinsTotal = entries.reduce(
        (accumulator, entry) => accumulator + entry.expectedWins,
        0,
    );

    if (expectedWinsTotal === roundNumber) {
        throw new Error("Total expected wins cannot equal the current round");
    }

    const actualWinsTotal = entries.reduce(
        (accumulator, entry) => accumulator + entry.actualWins,
        0,
    );

    if (actualWinsTotal !== roundNumber) {
        throw new Error("Total actual wins must equal the current round");
    }
}

function validateRoundState(
    roundState: AppBoerenbridgeRoundState,
    submittedRoundNumber: number,
) {
    if (roundState.isFinished) {
        throw new Error("Boerenbridge game is already finished");
    }

    if (roundState.roundNumber !== submittedRoundNumber) {
        throw new Error("Round number does not match current game round");
    }
}

export async function initializeBoerenbridgePlayers(
    scoreboardId: UUID,
    players: Array<AppCreateBoerenbridgePlayer>,
) {
    const game = await getBoerenbridgeGameForScoreboard(scoreboardId);

    if (game == null) {
        throw new Error("Boerenbridge game not found");
    }

    const existingPlayers = await getPlayersForScoreboard(scoreboardId);

    if (existingPlayers.length > 0) {
        throw new Error("Boerenbridge players already initialized");
    }

    await createPlayersForGame(parseUuid(game.id), players);

    return getPlayersForScoreboard(scoreboardId);
}

export async function getBoerenbridgeGame(
    scoreboardId: UUID,
): Promise<AppBoerenbridgeGame> {
    const game = await getBoerenbridgeGameForScoreboard(scoreboardId);

    if (game == null) {
        throw new Error("Boerenbridge game not found");
    }

    return domainToAppBoerenbridgeGame(game);
}

export async function getBoerenbridgePlayers(scoreboardId: UUID) {
    return getPlayersForScoreboard(scoreboardId);
}

export async function getBoerenbridgeRounds(scoreboardId: UUID) {
    const players = await getBoerenbridgePlayers(scoreboardId);

    return toRoundRows(players);
}

export async function getBoerenbridgeTotals(
    scoreboardId: UUID,
): Promise<Array<AppBoerenbridgeTotal>> {
    const [game, players] = await Promise.all([
        getBoerenbridgeGame(scoreboardId),
        getBoerenbridgePlayers(scoreboardId),
    ]);

    if (players.length === 0) {
        return [];
    }

    const totals = players.map((player) => {
        const total = player.rounds.reduce((accumulator, round) => {
            return (
                accumulator +
                toScore(
                    game.pointsPerCorrectGuess,
                    round.expectedWins,
                    round.actualWins,
                )
            );
        }, 0);

        return {
            playerId: player.id,
            playerName: player.name,
            total,
            rank: 0,
        };
    });

    const sorted = [...totals].sort((a, b) => b.total - a.total);

    return sorted.map((item, index) => ({
        ...item,
        rank: index + 1,
    }));
}

export async function getBoerenbridgeRoundNumber(
    scoreboardId: UUID,
): Promise<AppBoerenbridgeRoundState> {
    const [players, rounds] = await Promise.all([
        getBoerenbridgePlayers(scoreboardId),
        getBoerenbridgeRounds(scoreboardId),
    ]);

    const maxRound = getMaxRoundForPlayerCount(players.length);
    const totalTurns = maxRound * 2;
    const nextTurn = rounds.length + 1;

    if (nextTurn > totalTurns) {
        return {
            roundNumber: 1,
            maxRound,
            isFinished: true,
        };
    }

    return {
        roundNumber: getRoundForTurn(nextTurn, maxRound),
        maxRound,
        isFinished: false,
    };
}

export async function createBoerenbridgeRound(
    scoreboardId: UUID,
    roundNumber: number,
    entries: Array<AppBoerenbridgeRoundEntryInput>,
) {
    const roundState = await getBoerenbridgeRoundNumber(scoreboardId);

    validateRoundState(roundState, roundNumber);
    validateRoundEntries(roundNumber, entries);

    await createRoundEntriesForPlayers(scoreboardId, roundNumber, entries);
    const nextRoundState = await getBoerenbridgeRoundNumber(scoreboardId);

    if (!nextRoundState.isFinished) {
        await setCurrentRoundForScoreboard(scoreboardId, nextRoundState.roundNumber);
    }
}

export async function updateBoerenbridgeRound(
    scoreboardId: UUID,
    roundNumber: number,
    entries: Array<AppBoerenbridgeRoundEntryInput>,
) {
    validateRoundEntries(roundNumber, entries);
    await updateRoundEntriesForPlayers(scoreboardId, roundNumber, entries);
}
