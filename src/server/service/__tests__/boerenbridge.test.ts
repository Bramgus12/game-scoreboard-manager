import { beforeEach, describe, expect, it, mock } from "bun:test";
import {
    createAppBoerenbridgeGame,
    createAppBoerenbridgePlayer,
    createAppBoerenbridgeRound,
} from "@/test/fixtures/boerenbridge";
import type { AppCreateBoerenbridgePlayer } from "@/models/app/boerenbridge-player/create-boerenbridge-player";

type DomainBoerenbridgeGame = {
    id: string;
    points_per_correct_guess: number;
    current_round: number;
    created_at: Date;
    updated_at: Date;
};

const getBoerenbridgeGameForScoreboardMock = mock<
    (scoreboardId: string) => Promise<DomainBoerenbridgeGame | null>
>(async () => ({
    id: "44444444-4444-4444-8444-444444444444",
    points_per_correct_guess: 2,
    current_round: 1,
    created_at: new Date("2026-01-01T00:00:00.000Z"),
    updated_at: new Date("2026-01-01T00:00:00.000Z"),
}));
const setCurrentRoundForScoreboardMock = mock(async () => undefined);

const createPlayersForGameMock = mock(async () => undefined);
const getPlayersForScoreboardMock = mock(
    async () => new Array<ReturnType<typeof createAppBoerenbridgePlayer>>(),
);

const createRoundEntriesForPlayersMock = mock(async () => undefined);
const updateRoundEntriesForPlayersMock = mock(async () => undefined);

mock.module("@/server/repository/boerenbridge-game", () => ({
    getBoerenbridgeGameForScoreboard: getBoerenbridgeGameForScoreboardMock,
    setCurrentRoundForScoreboard: setCurrentRoundForScoreboardMock,
}));

mock.module("@/server/repository/boerenbridge-player", () => ({
    createPlayersForGame: createPlayersForGameMock,
    getPlayersForScoreboard: getPlayersForScoreboardMock,
}));

mock.module("@/server/repository/boerenbridge-round", () => ({
    createRoundEntriesForPlayers: createRoundEntriesForPlayersMock,
    updateRoundEntriesForPlayers: updateRoundEntriesForPlayersMock,
}));

const boerenbridgeService = await import("@/server/service/boerenbridge");

describe("boerenbridge service", () => {
    const createFinishedGamePlayers = () => {
        return new Array(26).fill(null).map((_, index) =>
            createAppBoerenbridgePlayer({
                id: `${String(index + 1).padStart(2, "0")}000000-0000-4000-8000-000000000000`,
                rounds:
                    index === 0
                        ? [
                              createAppBoerenbridgeRound({ roundNumber: 1 }),
                              createAppBoerenbridgeRound({ roundNumber: 2 }),
                              createAppBoerenbridgeRound({ roundNumber: 3 }),
                              createAppBoerenbridgeRound({ roundNumber: 4 }),
                              createAppBoerenbridgeRound({ roundNumber: 5 }),
                          ]
                        : [createAppBoerenbridgeRound({ roundNumber: 1 })],
            }),
        );
    };

    beforeEach(() => {
        getBoerenbridgeGameForScoreboardMock.mockReset();
        setCurrentRoundForScoreboardMock.mockReset();
        createPlayersForGameMock.mockReset();
        getPlayersForScoreboardMock.mockReset();
        createRoundEntriesForPlayersMock.mockReset();
        updateRoundEntriesForPlayersMock.mockReset();
        getBoerenbridgeGameForScoreboardMock.mockImplementation(async () => ({
            id: "44444444-4444-4444-8444-444444444444",
            points_per_correct_guess: 2,
            current_round: 1,
            created_at: new Date("2026-01-01T00:00:00.000Z"),
            updated_at: new Date("2026-01-01T00:00:00.000Z"),
        }));
        setCurrentRoundForScoreboardMock.mockImplementation(async () => undefined);
        createPlayersForGameMock.mockImplementation(async () => undefined);
        getPlayersForScoreboardMock.mockImplementation(async () => []);
        createRoundEntriesForPlayersMock.mockImplementation(async () => undefined);
        updateRoundEntriesForPlayersMock.mockImplementation(async () => undefined);
    });

    it("initializes players when game exists and no players are present", async () => {
        const game = createAppBoerenbridgeGame({
            id: "99999999-9999-4999-8999-999999999999",
        });
        const createdPlayers = [
            createAppBoerenbridgePlayer({ name: "Alice" }),
            createAppBoerenbridgePlayer({ name: "Bob" }),
        ];

        getBoerenbridgeGameForScoreboardMock.mockImplementation(async () => ({
            id: game.id,
            points_per_correct_guess: game.pointsPerCorrectGuess,
            current_round: game.currentRound,
            created_at: game.createdAt,
            updated_at: game.updatedAt,
        }));
        getPlayersForScoreboardMock
            .mockImplementationOnce(async () => [])
            .mockImplementationOnce(async () => createdPlayers);

        const payload: Array<AppCreateBoerenbridgePlayer> = [
            { name: "Alice" },
            { name: "Bob" },
        ];

        const result = await boerenbridgeService.initializeBoerenbridgePlayers(
            "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
            payload,
        );

        expect(result).toEqual(createdPlayers);

        expect(createPlayersForGameMock).toHaveBeenCalledWith(game.id, payload);
    });

    it("rejects round creation when expected wins total equals round number", async () => {
        const action = boerenbridgeService.createBoerenbridgeRound(
            "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
            1,
            [
                {
                    playerId: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
                    expectedWins: 1,
                    actualWins: 1,
                },
                {
                    playerId: "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
                    expectedWins: 0,
                    actualWins: 1,
                },
            ],
        );

        await expect(action).rejects.toThrow(
            "Total expected wins cannot equal the current round",
        );

        expect(createRoundEntriesForPlayersMock).not.toHaveBeenCalled();
    });

    it("rejects round creation when actual wins total does not equal round number", async () => {
        const action = boerenbridgeService.createBoerenbridgeRound(
            "eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee",
            1,
            [
                {
                    playerId: "ffffffff-ffff-4fff-8fff-ffffffffffff",
                    expectedWins: 0,
                    actualWins: 0,
                },
                {
                    playerId: "01010101-0101-4101-8101-010101010101",
                    expectedWins: 0,
                    actualWins: 0,
                },
            ],
        );

        await expect(action).rejects.toThrow(
            "Total actual wins must equal the current round",
        );

        expect(createRoundEntriesForPlayersMock).not.toHaveBeenCalled();
    });

    it("creates round and updates current round when game is not finished", async () => {
        const players = [
            createAppBoerenbridgePlayer({
                id: "12121212-1212-4121-8121-121212121212",
            }),
            createAppBoerenbridgePlayer({
                id: "13131313-1313-4131-8131-131313131313",
            }),
            createAppBoerenbridgePlayer({
                id: "14141414-1414-4141-8141-141414141414",
            }),
            createAppBoerenbridgePlayer({
                id: "15151515-1515-4151-8151-151515151515",
            }),
        ];

        getPlayersForScoreboardMock.mockImplementation(async () =>
            players.map((player) => ({
                ...player,
                rounds: [
                    createAppBoerenbridgeRound({
                        roundNumber: 1,
                        expectedWins: 0,
                        actualWins: 0,
                    }),
                ],
            })),
        );

        await boerenbridgeService.createBoerenbridgeRound(
            "16161616-1616-4161-8161-161616161616",
            2,
            [
                {
                    playerId: players[0].id,
                    expectedWins: 0,
                    actualWins: 0,
                },
                {
                    playerId: players[1].id,
                    expectedWins: 1,
                    actualWins: 1,
                },
                {
                    playerId: players[2].id,
                    expectedWins: 0,
                    actualWins: 1,
                },
                {
                    playerId: players[3].id,
                    expectedWins: 0,
                    actualWins: 0,
                },
            ],
        );

        expect(createRoundEntriesForPlayersMock).toHaveBeenCalledTimes(1);
        expect(setCurrentRoundForScoreboardMock).toHaveBeenCalledTimes(1);
        expect(setCurrentRoundForScoreboardMock).toHaveBeenCalledWith(
            "16161616-1616-4161-8161-161616161616",
            2,
        );
    });

    it("calculates totals ranked descending with boerenbridge scoring", async () => {
        getBoerenbridgeGameForScoreboardMock.mockImplementation(async () => ({
            id: "44444444-4444-4444-8444-444444444444",
            points_per_correct_guess: 2,
            current_round: 1,
            created_at: new Date("2026-01-01T00:00:00.000Z"),
            updated_at: new Date("2026-01-01T00:00:00.000Z"),
        }));

        getPlayersForScoreboardMock.mockImplementation(async () => [
            createAppBoerenbridgePlayer({
                id: "17171717-1717-4171-8171-171717171717",
                name: "Alice",
                rounds: [
                    createAppBoerenbridgeRound({
                        roundNumber: 1,
                        expectedWins: 1,
                        actualWins: 1,
                    }),
                ],
            }),
            createAppBoerenbridgePlayer({
                id: "18181818-1818-4181-8181-181818181818",
                name: "Bob",
                rounds: [
                    createAppBoerenbridgeRound({
                        roundNumber: 1,
                        expectedWins: 0,
                        actualWins: 1,
                    }),
                ],
            }),
        ]);

        const totals = await boerenbridgeService.getBoerenbridgeTotals(
            "19191919-1919-4191-8191-191919191919",
        );

        expect(totals).toEqual([
            {
                playerId: "17171717-1717-4171-8171-171717171717",
                playerName: "Alice",
                total: 12,
                rank: 1,
            },
            {
                playerId: "18181818-1818-4181-8181-181818181818",
                playerName: "Bob",
                total: -2,
                rank: 2,
            },
        ]);
    });

    it("returns empty totals when no players exist", async () => {
        getPlayersForScoreboardMock.mockImplementation(async () => []);

        const totals = await boerenbridgeService.getBoerenbridgeTotals(
            "23232323-2323-4232-8232-232323232323",
        );

        expect(totals).toEqual([]);
    });

    it("throws when game is missing for getBoerenbridgeGame", async () => {
        getBoerenbridgeGameForScoreboardMock.mockImplementation(async () => null);

        const action = boerenbridgeService.getBoerenbridgeGame(
            "24242424-2424-4242-8242-242424242424",
        );

        await expect(action).rejects.toThrow("Boerenbridge game not found");
    });

    it("throws when initializing players and game is missing", async () => {
        getBoerenbridgeGameForScoreboardMock.mockImplementation(async () => null);

        const action = boerenbridgeService.initializeBoerenbridgePlayers(
            "25252525-2525-4252-8252-252525252525",
            [{ name: "Alice" }],
        );

        await expect(action).rejects.toThrow("Boerenbridge game not found");
    });

    it("throws when initializing players and players already exist", async () => {
        getPlayersForScoreboardMock.mockImplementation(async () => [
            createAppBoerenbridgePlayer(),
        ]);

        const action = boerenbridgeService.initializeBoerenbridgePlayers(
            "26262626-2626-4262-8262-262626262626",
            [{ name: "Alice" }],
        );

        await expect(action).rejects.toThrow(
            "Boerenbridge players already initialized",
        );
    });

    it("marks game finished when rounds exceed total turns", async () => {
        getPlayersForScoreboardMock.mockImplementation(async () =>
            createFinishedGamePlayers(),
        );

        const state = await boerenbridgeService.getBoerenbridgeRoundNumber(
            "53535353-5353-4353-8353-535353535353",
        );

        expect(state).toEqual({
            roundNumber: 1,
            maxRound: 2,
            isFinished: true,
        });
    });

    it("throws when creating a round for a finished game", async () => {
        getPlayersForScoreboardMock.mockImplementation(async () =>
            createFinishedGamePlayers(),
        );

        const action = boerenbridgeService.createBoerenbridgeRound(
            "54545454-5454-4454-8454-545454545454",
            1,
            [
                {
                    playerId: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
                    expectedWins: 0,
                    actualWins: 1,
                },
            ],
        );

        await expect(action).rejects.toThrow(
            "Boerenbridge game is already finished",
        );
    });

    it("throws when submitted round number does not match current game round", async () => {
        getPlayersForScoreboardMock.mockImplementation(async () => [
            createAppBoerenbridgePlayer({
                rounds: [createAppBoerenbridgeRound({ roundNumber: 1 })],
            }),
            createAppBoerenbridgePlayer({
                id: "56565656-5656-4656-8656-565656565656",
                rounds: [createAppBoerenbridgeRound({ roundNumber: 1 })],
            }),
        ]);

        const action = boerenbridgeService.createBoerenbridgeRound(
            "57575757-5757-4757-8757-575757575757",
            1,
            [
                {
                    playerId: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
                    expectedWins: 0,
                    actualWins: 1,
                },
                {
                    playerId: "56565656-5656-4656-8656-565656565656",
                    expectedWins: 0,
                    actualWins: 0,
                },
            ],
        );

        await expect(action).rejects.toThrow(
            "Round number does not match current game round",
        );
    });

    it("returns descending round number after reaching max round", async () => {
        const players = new Array(26).fill(null).map((_, index) =>
            createAppBoerenbridgePlayer({
                id: `${String(index + 1).padStart(2, "0")}000000-0000-4000-8000-000000000000`,
                rounds:
                    index === 0
                        ? [
                              createAppBoerenbridgeRound({ roundNumber: 1 }),
                              createAppBoerenbridgeRound({ roundNumber: 2 }),
                          ]
                        : [],
            }),
        );

        getPlayersForScoreboardMock.mockImplementation(async () => players);

        const state = await boerenbridgeService.getBoerenbridgeRoundNumber(
            "60000000-0000-4000-8000-000000000000",
        );

        expect(state).toEqual({
            roundNumber: 2,
            maxRound: 2,
            isFinished: false,
        });
    });

    it("throws when expected wins are outside the current round range", async () => {
        const action = boerenbridgeService.createBoerenbridgeRound(
            "61000000-0000-4000-8000-000000000000",
            1,
            [
                {
                    playerId: "62000000-0000-4000-8000-000000000000",
                    expectedWins: 2,
                    actualWins: 1,
                },
            ],
        );

        await expect(action).rejects.toThrow(
            "Expected wins must be between 0 and current round",
        );
    });

    it("throws when actual wins are outside the current round range", async () => {
        const action = boerenbridgeService.createBoerenbridgeRound(
            "63000000-0000-4000-8000-000000000000",
            1,
            [
                {
                    playerId: "64000000-0000-4000-8000-000000000000",
                    expectedWins: 0,
                    actualWins: 2,
                },
            ],
        );

        await expect(action).rejects.toThrow(
            "Actual wins must be between 0 and current round",
        );
    });

    it("updates existing round entries", async () => {
        await boerenbridgeService.updateBoerenbridgeRound(
            "58585858-5858-4858-8858-585858585858",
            1,
            [
                {
                    playerId: "59595959-5959-4959-8959-595959595959",
                    expectedWins: 0,
                    actualWins: 1,
                },
            ],
        );

        expect(updateRoundEntriesForPlayersMock).toHaveBeenCalledWith(
            "58585858-5858-4858-8858-585858585858",
            1,
            [
                {
                    playerId: "59595959-5959-4959-8959-595959595959",
                    expectedWins: 0,
                    actualWins: 1,
                },
            ],
        );
    });
});
