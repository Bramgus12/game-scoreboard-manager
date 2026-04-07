import { beforeEach, describe, expect, it, mock } from "bun:test";

const getRoundsForScoreboardMock = mock(
    async (): Promise<Array<{ roundNumber: number }>> => [],
);
const createKlaverjasRoundsForBothTeamsMock = mock(async () => undefined);
const updateKlaverjasRoundsForBothTeamsMock = mock(async () => undefined);
const parseUuidMock = mock((value: string) => value);

mock.module("@/server/service/klaverjas", () => ({
    getRoundsForScoreboard: getRoundsForScoreboardMock,
    createKlaverjasRoundsForBothTeams: createKlaverjasRoundsForBothTeamsMock,
    updateKlaverjasRoundsForBothTeams: updateKlaverjasRoundsForBothTeamsMock,
}));

mock.module("@/server/service/scoreboard", () => ({
    getScoreboardsForUser: mock(async () => []),
    createScoreboard: mock(async () => ({})),
    getScoreboardById: mock(async () => ({})),
    deleteScoreboardById: mock(async () => undefined),
}));

mock.module("@/lib/uuid", () => ({
    parseUuid: parseUuidMock,
    isUuid: (value: string) => value.length > 0,
}));

const routeModule =
    await import("@/app/api/scoreboards/[id]/klaverjas/rounds/route");

describe("/api/scoreboards/[id]/klaverjas/rounds route", () => {
    beforeEach(() => {
        getRoundsForScoreboardMock.mockReset();
        createKlaverjasRoundsForBothTeamsMock.mockReset();
        updateKlaverjasRoundsForBothTeamsMock.mockReset();
        parseUuidMock.mockReset();
        getRoundsForScoreboardMock.mockImplementation(async () => []);
        createKlaverjasRoundsForBothTeamsMock.mockImplementation(
            async () => undefined,
        );
        updateKlaverjasRoundsForBothTeamsMock.mockImplementation(
            async () => undefined,
        );
        parseUuidMock.mockImplementation((value: string) => value);
    });

    it("returns rounds for GET", async () => {
        const rounds = [
            {
                roundNumber: 1,
            },
        ];

        getRoundsForScoreboardMock.mockImplementation(async () => rounds);

        const response = await routeModule.GET(new Request("http://localhost"), {
            params: Promise.resolve({
                id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
            }),
        });

        expect(response.status).toBe(200);
        await expect(response.json()).resolves.toEqual(rounds);
    });

    it("creates rounds for both teams on POST", async () => {
        const request = new Request("http://localhost", {
            method: "POST",
            body: JSON.stringify({
                teamUsRound: {
                    roundNumber: 1,
                    points: 82,
                    fame: 20,
                    isPit: false,
                    isWet: false,
                    isGoing: false,
                },
                teamThemRound: {
                    roundNumber: 1,
                    points: 80,
                    fame: 0,
                    isPit: false,
                    isWet: false,
                    isGoing: false,
                },
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await routeModule.POST(request, {
            params: Promise.resolve({
                id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
            }),
        });

        expect(response.status).toBe(204);
        expect(createKlaverjasRoundsForBothTeamsMock).toHaveBeenCalledTimes(1);
    });

    it("returns 500 when parseUuid fails on GET", async () => {
        parseUuidMock.mockImplementationOnce(() => {
            throw new Error("Invalid UUID format");
        });

        const response = await routeModule.GET(new Request("http://localhost"), {
            params: Promise.resolve({
                id: "not-a-uuid",
            }),
        });

        expect(response.status).toBe(500);
        await expect(response.text()).resolves.toBe("Invalid UUID format");
    });

    it("returns 500 when create rounds throws", async () => {
        createKlaverjasRoundsForBothTeamsMock.mockImplementationOnce(async () => {
            throw new Error("Failed to create rounds");
        });

        const request = new Request("http://localhost", {
            method: "POST",
            body: JSON.stringify({
                teamUsRound: {
                    roundNumber: 1,
                    points: 82,
                    fame: 20,
                    isPit: false,
                    isWet: false,
                    isGoing: false,
                },
                teamThemRound: {
                    roundNumber: 1,
                    points: 80,
                    fame: 0,
                    isPit: false,
                    isWet: false,
                    isGoing: false,
                },
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await routeModule.POST(request, {
            params: Promise.resolve({
                id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
            }),
        });

        expect(response.status).toBe(500);
        await expect(response.text()).resolves.toBe("Failed to create rounds");
    });

    it("returns 500 when update throws", async () => {
        updateKlaverjasRoundsForBothTeamsMock.mockImplementation(async () => {
            throw new Error("Failed to update round");
        });

        const request = new Request("http://localhost", {
            method: "PUT",
            body: JSON.stringify({
                teamUsRound: {
                    id: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
                    roundNumber: 1,
                    points: 82,
                    fame: 20,
                    isPit: false,
                    isWet: false,
                    isGoing: false,
                },
                teamThemRound: {
                    id: "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
                    roundNumber: 1,
                    points: 80,
                    fame: 0,
                    isPit: false,
                    isWet: false,
                    isGoing: false,
                },
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await routeModule.PUT(request, {
            params: Promise.resolve({
                id: "eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee",
            }),
        });

        expect(response.status).toBe(500);
        await expect(response.text()).resolves.toBe("Failed to update round");
    });
});
