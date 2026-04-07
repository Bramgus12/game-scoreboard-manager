import { beforeEach, describe, expect, it, mock } from "bun:test";
import { GAME_TYPE } from "@/constants/gameType";
import { createAppUser } from "@/test/fixtures/user";
import { createDomainScoreboard } from "@/test/fixtures/scoreboard";

const createScoreboardMock = mock(
    async (): Promise<ReturnType<typeof createDomainScoreboard>> =>
        createDomainScoreboard(),
);
const findScoreboardMock = mock(
    async (): Promise<ReturnType<typeof createDomainScoreboard> | null> =>
        createDomainScoreboard(),
);

const transactionScoreboardCreateMock = mock(
    async (): Promise<ReturnType<typeof createDomainScoreboard>> =>
        createDomainScoreboard(),
);
const transactionGameCreateMock = mock(async () => ({}));
const transactionPlayerCreateManyMock = mock(
    async (query: { data: Array<unknown> }): Promise<{ count: number }> => ({
        count: query.data.length,
    }),
);
const queryRawUnsafeMock = mock(
    async (): Promise<Array<Record<string, unknown>>> => [
        {
            klaverjas_game_count: 2,
            klaverjas_pit_count: 5,
            klaverjas_avg_points_per_team: "76.5",
            klaverjas_avg_nat_per_game: "1.25",
            boerenbridge_game_count: 1,
            boerenbridge_correct_count: "9",
            boerenbridge_wrong_count: "4",
            boerenbridge_avg_points_per_player_per_game: "12.75",
        },
    ],
);

const prismaMock = {
    scoreboard: {
        create: createScoreboardMock,
        findFirst: findScoreboardMock,
        findMany: mock(
            async () => new Array<ReturnType<typeof createDomainScoreboard>>(),
        ),
        delete: mock(async () => undefined),
    },
    $transaction: mock(async (callback: (transaction: unknown) => unknown) =>
        callback({
            scoreboard: {
                create: transactionScoreboardCreateMock,
            },
            boerenbridge_game: {
                create: transactionGameCreateMock,
            },
            boerenbridge_player: {
                createMany: transactionPlayerCreateManyMock,
            },
        }),
    ),
    $queryRawUnsafe: queryRawUnsafeMock,
};

const getDatabaseUserMock = mock(async () => createAppUser());

mock.module("@/utils/prisma", () => ({
    default: prismaMock,
}));

mock.module("@/server/repository/user", () => ({
    getDatabaseUser: getDatabaseUserMock,
}));

const scoreboardRepository = await import("@/server/repository/scoreboard");

function getLastCallArguments(fn: { mock: { calls: Array<Array<unknown>> } }) {
    const calls = fn.mock.calls;

    return calls[calls.length - 1];
}

describe("scoreboard repository", () => {
    beforeEach(() => {
        getDatabaseUserMock.mockReset();
        createScoreboardMock.mockReset();
        findScoreboardMock.mockReset();
        transactionScoreboardCreateMock.mockReset();
        transactionGameCreateMock.mockReset();
        transactionPlayerCreateManyMock.mockReset();
        queryRawUnsafeMock.mockReset();
        prismaMock.scoreboard.findMany.mockReset();
        prismaMock.scoreboard.delete.mockReset();

        getDatabaseUserMock.mockImplementation(async () => createAppUser());
        createScoreboardMock.mockImplementation(async () =>
            createDomainScoreboard(),
        );
        findScoreboardMock.mockImplementation(async () => createDomainScoreboard());
        transactionScoreboardCreateMock.mockImplementation(async () =>
            createDomainScoreboard(),
        );
        transactionGameCreateMock.mockImplementation(async () => ({}));
        transactionPlayerCreateManyMock.mockImplementation(async () => ({
            count: 0,
        }));
        queryRawUnsafeMock.mockImplementation(async () => [
            {
                klaverjas_game_count: 2,
                klaverjas_pit_count: 5,
                klaverjas_avg_points_per_team: "76.5",
                klaverjas_avg_nat_per_game: "1.25",
                boerenbridge_game_count: 1,
                boerenbridge_correct_count: "9",
                boerenbridge_wrong_count: "4",
                boerenbridge_avg_points_per_player_per_game: "12.75",
            },
        ]);
        prismaMock.scoreboard.findMany.mockImplementation(async () => []);
        prismaMock.scoreboard.delete.mockImplementation(async () => undefined);
    });

    it("creates a scoreboard for the authenticated user", async () => {
        const user = createAppUser({
            id: "44444444-4444-4444-8444-444444444444",
        });
        const domainScoreboard = createDomainScoreboard({
            id: "55555555-5555-4555-8555-555555555555",
            user_id: user.id,
            game_type: GAME_TYPE.KLAVERJAS,
            scoreboard_name: "Weekend Match",
        });

        getDatabaseUserMock.mockImplementation(async () => user);
        createScoreboardMock.mockImplementation(async () => domainScoreboard);

        const createdScoreboard = await scoreboardRepository.createScoreboard({
            gameType: GAME_TYPE.KLAVERJAS,
            scoreboardName: "Weekend Match",
        });

        expect(createdScoreboard).toEqual(domainScoreboard);

        const [query] = getLastCallArguments(createScoreboardMock);

        expect(query).toMatchObject({
            data: {
                user_id: user.id,
                game_type: GAME_TYPE.KLAVERJAS,
                scoreboard_name: "Weekend Match",
            },
        });
    });

    it("throws when scoreboard lookup does not find the scoreboard", async () => {
        findScoreboardMock.mockImplementation(async () => null);

        const action = scoreboardRepository.getScoreboardById(
            "66666666-6666-4666-8666-666666666666",
        );

        await expect(action).rejects.toThrow("Scoreboard not found");
    });

    it("returns scoreboard when lookup finds a record", async () => {
        const scoreboardId = "67676767-6767-4676-8676-676767676767";
        const scoreboard = createDomainScoreboard({
            id: scoreboardId,
        });

        findScoreboardMock.mockImplementation(async () => scoreboard);

        const result = await scoreboardRepository.getScoreboardById(scoreboardId);

        expect(result).toEqual(scoreboard);
    });

    it("returns scoreboards for authenticated user", async () => {
        const user = createAppUser({
            id: "68686868-6868-4868-8868-686868686868",
        });
        const scoreboards = [
            createDomainScoreboard({
                id: "69696969-6969-4969-8969-696969696969",
                user_id: user.id,
            }),
        ];

        getDatabaseUserMock.mockImplementation(async () => user);
        prismaMock.scoreboard.findMany.mockImplementation(async () => scoreboards);

        const result = await scoreboardRepository.getScoreboardsForUser();

        expect(result).toEqual(scoreboards);
        expect(prismaMock.scoreboard.findMany).toHaveBeenCalledWith({
            where: { user_id: user.id },
        });
    });

    it("deletes scoreboard by id when owned by the user", async () => {
        const scoreboard = createDomainScoreboard({
            id: "70707070-7070-4070-8070-707070707070",
        });
        findScoreboardMock.mockImplementation(async () => scoreboard);

        await scoreboardRepository.deleteScoreboardById(
            "70707070-7070-4070-8070-707070707070",
        );

        expect(prismaMock.scoreboard.delete).toHaveBeenCalledWith({
            where: { id: scoreboard.id },
        });
    });

    it("throws when deleting a missing scoreboard", async () => {
        findScoreboardMock.mockImplementation(async () => null);

        const action = scoreboardRepository.deleteScoreboardById(
            "71717171-7171-4171-8171-717171717171",
        );

        await expect(action).rejects.toThrow("Scoreboard not found");
        expect(prismaMock.scoreboard.delete).not.toHaveBeenCalled();
    });

    it("creates boerenbridge scoreboard, game and players in one transaction", async () => {
        const scoreboard = createDomainScoreboard({
            id: "77777777-7777-4777-8777-777777777777",
            game_type: GAME_TYPE.BOERENBRIDGE,
            scoreboard_name: "Boerenbridge Night",
        });

        transactionScoreboardCreateMock.mockImplementation(async () => scoreboard);
        transactionPlayerCreateManyMock.mockImplementation(async (query) => {
            return {
                count: query.data.length,
            };
        });

        const result =
            await scoreboardRepository.createBoerenbridgeScoreboardWithGame({
                scoreboardName: "Boerenbridge Night",
                pointsPerCorrectGuess: 3,
                players: [{ name: "Alice" }, { name: "Bob" }],
            });

        expect(result).toEqual(scoreboard);

        const [gameQuery] = getLastCallArguments(transactionGameCreateMock);

        expect(gameQuery).toMatchObject({
            data: {
                points_per_correct_guess: 3,
            },
        });

        const [playersQuery] = getLastCallArguments(transactionPlayerCreateManyMock);

        expect(playersQuery).toMatchObject({
            data: [
                expect.objectContaining({ name: "Alice" }),
                expect.objectContaining({ name: "Bob" }),
            ],
        });
    });

    it("returns parsed SQL stats for both game types", async () => {
        const stats = await scoreboardRepository.getScoreboardsStatsForUser();

        expect(stats).toEqual({
            klaverjas: {
                gameCount: 2,
                pitCount: 5,
                averagePointsPerTeam: 76.5,
                averageNatTimesPerGame: 1.25,
            },
            boerenbridge: {
                gameCount: 1,
                correctGuessCount: 9,
                wrongGuessCount: 4,
                averagePointsPerPlayerPerGame: 12.75,
            },
        });

        expect(queryRawUnsafeMock).toHaveBeenCalledTimes(1);
    });

    it("returns zeroed stats when SQL query returns no row", async () => {
        queryRawUnsafeMock.mockImplementation(async () => []);

        const stats = await scoreboardRepository.getScoreboardsStatsForUser();

        expect(stats).toEqual({
            klaverjas: {
                gameCount: 0,
                pitCount: 0,
                averagePointsPerTeam: 0,
                averageNatTimesPerGame: 0,
            },
            boerenbridge: {
                gameCount: 0,
                correctGuessCount: 0,
                wrongGuessCount: 0,
                averagePointsPerPlayerPerGame: 0,
            },
        });
    });

    it("parses bigint SQL aggregates to numbers", async () => {
        queryRawUnsafeMock.mockImplementation(async () => [
            {
                klaverjas_game_count: 2n,
                klaverjas_pit_count: 5n,
                klaverjas_avg_points_per_team: 76.5,
                klaverjas_avg_nat_per_game: 1.25,
                boerenbridge_game_count: 1n,
                boerenbridge_correct_count: 9n,
                boerenbridge_wrong_count: 4n,
                boerenbridge_avg_points_per_player_per_game: 12.75,
            },
        ]);

        const stats = await scoreboardRepository.getScoreboardsStatsForUser();

        expect(stats.klaverjas.gameCount).toBe(2);
        expect(stats.klaverjas.pitCount).toBe(5);
        expect(stats.boerenbridge.gameCount).toBe(1);
        expect(stats.boerenbridge.correctGuessCount).toBe(9);
        expect(stats.boerenbridge.wrongGuessCount).toBe(4);
    });

    it("maps invalid numeric strings to zero", async () => {
        queryRawUnsafeMock.mockImplementation(async () => [
            {
                klaverjas_game_count: "abc",
                klaverjas_pit_count: "5",
                klaverjas_avg_points_per_team: "76.5",
                klaverjas_avg_nat_per_game: "1.25",
                boerenbridge_game_count: "1",
                boerenbridge_correct_count: "9",
                boerenbridge_wrong_count: "4",
                boerenbridge_avg_points_per_player_per_game: "12.75",
            },
        ]);

        const stats = await scoreboardRepository.getScoreboardsStatsForUser();

        expect(stats.klaverjas.gameCount).toBe(0);
        expect(stats.klaverjas.pitCount).toBe(5);
    });

    it("maps toString numeric objects to numbers", async () => {
        queryRawUnsafeMock.mockImplementation(async () => [
            {
                klaverjas_game_count: { toString: () => "2" },
                klaverjas_pit_count: { toString: () => "5" },
                klaverjas_avg_points_per_team: { toString: () => "76.5" },
                klaverjas_avg_nat_per_game: { toString: () => "1.25" },
                boerenbridge_game_count: { toString: () => "1" },
                boerenbridge_correct_count: { toString: () => "9" },
                boerenbridge_wrong_count: { toString: () => "4" },
                boerenbridge_avg_points_per_player_per_game: {
                    toString: () => "12.75",
                },
            },
        ]);

        const stats = await scoreboardRepository.getScoreboardsStatsForUser();

        expect(stats).toEqual({
            klaverjas: {
                gameCount: 2,
                pitCount: 5,
                averagePointsPerTeam: 76.5,
                averageNatTimesPerGame: 1.25,
            },
            boerenbridge: {
                gameCount: 1,
                correctGuessCount: 9,
                wrongGuessCount: 4,
                averagePointsPerPlayerPerGame: 12.75,
            },
        });
    });

    it("maps invalid toString objects to zero", async () => {
        queryRawUnsafeMock.mockImplementation(async () => [
            {
                klaverjas_game_count: { toString: () => "NaN" },
                klaverjas_pit_count: { toString: () => "5" },
                klaverjas_avg_points_per_team: { toString: () => "76.5" },
                klaverjas_avg_nat_per_game: { toString: () => "1.25" },
                boerenbridge_game_count: { toString: () => "1" },
                boerenbridge_correct_count: { toString: () => "9" },
                boerenbridge_wrong_count: { toString: () => "4" },
                boerenbridge_avg_points_per_player_per_game: {
                    toString: () => "12.75",
                },
            },
        ]);

        const stats = await scoreboardRepository.getScoreboardsStatsForUser();

        expect(stats.klaverjas.gameCount).toBe(0);
        expect(stats.klaverjas.pitCount).toBe(5);
    });
});
