import { beforeEach, describe, expect, it, mock } from "bun:test";

const getScoreboardsStatsForUserMock = mock(async () => ({
    klaverjas: {
        gameCount: 2,
        pitCount: 3,
        averagePointsPerTeam: 84.5,
        averageNatTimesPerGame: 1.5,
    },
    boerenbridge: {
        gameCount: 1,
        correctGuessCount: 7,
        wrongGuessCount: 4,
        averagePointsPerPlayerPerGame: 18.25,
    },
}));

mock.module("@/server/service/scoreboard", () => ({
    getScoreboardsStatsForUser: getScoreboardsStatsForUserMock,
}));

const routeModule = await import("@/app/api/scoreboards/stats/route");

describe("/api/scoreboards/stats route", () => {
    beforeEach(() => {
        getScoreboardsStatsForUserMock.mockReset();
        getScoreboardsStatsForUserMock.mockImplementation(async () => ({
            klaverjas: {
                gameCount: 2,
                pitCount: 3,
                averagePointsPerTeam: 84.5,
                averageNatTimesPerGame: 1.5,
            },
            boerenbridge: {
                gameCount: 1,
                correctGuessCount: 7,
                wrongGuessCount: 4,
                averagePointsPerPlayerPerGame: 18.25,
            },
        }));
    });

    it("returns aggregated stats for both game types", async () => {
        const response = await routeModule.GET();

        expect(response.status).toBe(200);

        const body = await response.json();

        expect(body).toEqual({
            klaverjas: {
                gameCount: 2,
                pitCount: 3,
                averagePointsPerTeam: 84.5,
                averageNatTimesPerGame: 1.5,
            },
            boerenbridge: {
                gameCount: 1,
                correctGuessCount: 7,
                wrongGuessCount: 4,
                averagePointsPerPlayerPerGame: 18.25,
            },
        });
    });

    it("returns 500 when stats fetch fails", async () => {
        getScoreboardsStatsForUserMock.mockImplementation(async () => {
            throw new Error("Failed to fetch scoreboards stats");
        });

        const response = await routeModule.GET();

        expect(response.status).toBe(500);
        await expect(response.text()).resolves.toBe("Failed to fetch scoreboards stats");
    });
});
