import type { UUID } from "crypto";

type AppBoerenbridgeRoundInput = {
    id?: UUID;
    roundNumber?: number;
    expectedWins?: number;
    actualWins?: number;
    createdAt?: Date;
    updatedAt?: Date;
};

type AppBoerenbridgePlayerInput = {
    id?: UUID;
    game?: UUID;
    name?: string;
    rounds?: Array<ReturnType<typeof createAppBoerenbridgeRound>>;
    createdAt?: Date;
    updatedAt?: Date;
};

type AppBoerenbridgeGameInput = {
    id?: UUID;
    pointsPerCorrectGuess?: number;
    currentRound?: number;
    createdAt?: Date;
    updatedAt?: Date;
};

export function createAppBoerenbridgeRound(input: AppBoerenbridgeRoundInput = {}) {
    return {
        id: input.id ?? "11111111-1111-4111-8111-111111111111",
        roundNumber: input.roundNumber ?? 1,
        expectedWins: input.expectedWins ?? 0,
        actualWins: input.actualWins ?? 0,
        createdAt: input.createdAt ?? new Date("2026-01-01T00:00:00.000Z"),
        updatedAt: input.updatedAt ?? new Date("2026-01-01T00:00:00.000Z"),
    };
}

export function createAppBoerenbridgePlayer(input: AppBoerenbridgePlayerInput = {}) {
    return {
        id: input.id ?? "22222222-2222-4222-8222-222222222222",
        game: input.game ?? "33333333-3333-4333-8333-333333333333",
        name: input.name ?? "Player",
        rounds: input.rounds ?? [],
        createdAt: input.createdAt ?? new Date("2026-01-01T00:00:00.000Z"),
        updatedAt: input.updatedAt ?? new Date("2026-01-01T00:00:00.000Z"),
    };
}

export function createAppBoerenbridgeGame(input: AppBoerenbridgeGameInput = {}) {
    return {
        id: input.id ?? "44444444-4444-4444-8444-444444444444",
        pointsPerCorrectGuess: input.pointsPerCorrectGuess ?? 2,
        currentRound: input.currentRound ?? 1,
        createdAt: input.createdAt ?? new Date("2026-01-01T00:00:00.000Z"),
        updatedAt: input.updatedAt ?? new Date("2026-01-01T00:00:00.000Z"),
    };
}
