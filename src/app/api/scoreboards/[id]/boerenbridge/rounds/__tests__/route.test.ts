import { beforeEach, describe, expect, it, mock } from "bun:test";

const getBoerenbridgeRoundsMock = mock(
    async (): Promise<Array<{ roundNumber: number; entries: Array<unknown> }>> => [],
);
const createBoerenbridgeRoundMock = mock(async () => undefined);
const updateBoerenbridgeRoundMock = mock(async () => undefined);

const logApiErrorMock = mock(() => undefined);
const parseUuidMock = mock((value: string) => value);

const currentUserMock = mock<() => Promise<{ id: string } | null>>(async () => ({
    id: "clerk_user_123",
}));
const posthogCaptureMock = mock(() => undefined);
const getPosthogClientMock = mock(() => ({ capture: posthogCaptureMock }));

mock.module("@/server/service/boerenbridge", () => ({
    getBoerenbridgeRounds: getBoerenbridgeRoundsMock,
    createBoerenbridgeRound: createBoerenbridgeRoundMock,
    updateBoerenbridgeRound: updateBoerenbridgeRoundMock,
}));

mock.module("@/server/service/scoreboard", () => ({
    getScoreboardsForUser: mock(async () => []),
    createScoreboard: mock(async () => ({})),
    getScoreboardById: mock(async () => ({})),
    deleteScoreboardById: mock(async () => undefined),
}));

mock.module("@/app/api/_utils/route-error", () => ({
    logApiError: logApiErrorMock,
}));

mock.module("@/lib/uuid", () => ({
    parseUuid: parseUuidMock,
    isUuid: (value: string) => value.length > 0,
}));

mock.module("@clerk/nextjs/server", () => ({
    currentUser: currentUserMock,
}));

mock.module("@/lib/posthog-server", () => ({
    getPostHogClient: getPosthogClientMock,
}));

const routeModule =
    await import("@/app/api/scoreboards/[id]/boerenbridge/rounds/route");

describe("/api/scoreboards/[id]/boerenbridge/rounds route", () => {
    beforeEach(() => {
        getBoerenbridgeRoundsMock.mockReset();
        createBoerenbridgeRoundMock.mockReset();
        updateBoerenbridgeRoundMock.mockReset();
        logApiErrorMock.mockReset();
        parseUuidMock.mockReset();
        currentUserMock.mockReset();
        posthogCaptureMock.mockReset();
        getPosthogClientMock.mockReset();

        getBoerenbridgeRoundsMock.mockImplementation(async () => []);
        createBoerenbridgeRoundMock.mockImplementation(async () => undefined);
        updateBoerenbridgeRoundMock.mockImplementation(async () => undefined);
        logApiErrorMock.mockImplementation(() => undefined);
        parseUuidMock.mockImplementation((value: string) => value);
        currentUserMock.mockImplementation(async () => ({ id: "clerk_user_123" }));
        getPosthogClientMock.mockImplementation(() => ({
            capture: posthogCaptureMock,
        }));
        posthogCaptureMock.mockImplementation(() => undefined);
    });

    it("returns rounds for GET", async () => {
        const rounds = [
            {
                roundNumber: 1,
                entries: [],
            },
        ];

        getBoerenbridgeRoundsMock.mockImplementation(async () => rounds);

        const response = await routeModule.GET(new Request("http://localhost"), {
            params: Promise.resolve({
                id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
            }),
        });

        expect(response.status).toBe(200);
        await expect(response.json()).resolves.toEqual(rounds);
    });

    it("creates round and tracks event on POST", async () => {
        const request = new Request("http://localhost", {
            method: "POST",
            body: JSON.stringify({
                roundNumber: 1,
                entries: [
                    {
                        playerId: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
                        expectedWins: 0,
                        actualWins: 1,
                    },
                ],
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await routeModule.POST(request, {
            params: Promise.resolve({
                id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
            }),
        });

        expect(response.status).toBe(204);
        expect(createBoerenbridgeRoundMock).toHaveBeenCalledTimes(1);
        expect(posthogCaptureMock).toHaveBeenCalledTimes(1);
    });

    it("creates round without tracking when user is not available", async () => {
        currentUserMock.mockImplementation(async () => null);

        const request = new Request("http://localhost", {
            method: "POST",
            body: JSON.stringify({
                roundNumber: 1,
                entries: [
                    {
                        playerId: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
                        expectedWins: 0,
                        actualWins: 1,
                    },
                ],
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await routeModule.POST(request, {
            params: Promise.resolve({
                id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
            }),
        });

        expect(response.status).toBe(204);
        expect(createBoerenbridgeRoundMock).toHaveBeenCalledTimes(1);
        expect(posthogCaptureMock).not.toHaveBeenCalled();
    });

    it("updates round and tracks event on PUT", async () => {
        const request = new Request("http://localhost", {
            method: "PUT",
            body: JSON.stringify({
                roundNumber: 1,
                entries: [
                    {
                        playerId: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
                        expectedWins: 0,
                        actualWins: 1,
                    },
                ],
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await routeModule.PUT(request, {
            params: Promise.resolve({
                id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
            }),
        });

        expect(response.status).toBe(204);
        expect(updateBoerenbridgeRoundMock).toHaveBeenCalledTimes(1);
        expect(posthogCaptureMock).toHaveBeenCalledTimes(1);
    });

    it("returns 500 when parseUuid fails for POST", async () => {
        parseUuidMock.mockImplementationOnce(() => {
            throw new Error("Invalid UUID format");
        });

        const request = new Request("http://localhost", {
            method: "POST",
            body: JSON.stringify({
                roundNumber: 1,
                entries: [
                    {
                        playerId: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
                        expectedWins: 0,
                        actualWins: 1,
                    },
                ],
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await routeModule.POST(request, {
            params: Promise.resolve({
                id: "not-a-uuid",
            }),
        });

        expect(response.status).toBe(500);
        await expect(response.text()).resolves.toBe("Invalid UUID format");
        expect(logApiErrorMock).toHaveBeenCalledTimes(1);
    });

    it("returns 500 when createBoerenbridgeRound fails", async () => {
        createBoerenbridgeRoundMock.mockImplementationOnce(async () => {
            throw new Error("Failed to create round");
        });

        const request = new Request("http://localhost", {
            method: "POST",
            body: JSON.stringify({
                roundNumber: 1,
                entries: [
                    {
                        playerId: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
                        expectedWins: 0,
                        actualWins: 1,
                    },
                ],
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await routeModule.POST(request, {
            params: Promise.resolve({
                id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
            }),
        });

        expect(response.status).toBe(500);
        await expect(response.text()).resolves.toBe("Failed to create round");
        expect(logApiErrorMock).toHaveBeenCalledTimes(1);
    });

    it("returns 500 when updateBoerenbridgeRound fails", async () => {
        updateBoerenbridgeRoundMock.mockImplementationOnce(async () => {
            throw new Error("Failed to update round");
        });

        const request = new Request("http://localhost", {
            method: "PUT",
            body: JSON.stringify({
                roundNumber: 1,
                entries: [
                    {
                        playerId: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
                        expectedWins: 0,
                        actualWins: 1,
                    },
                ],
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await routeModule.PUT(request, {
            params: Promise.resolve({
                id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
            }),
        });

        expect(response.status).toBe(500);
        await expect(response.text()).resolves.toBe("Failed to update round");
        expect(logApiErrorMock).toHaveBeenCalledTimes(1);
    });

    it("logs and returns 500 when GET fails", async () => {
        getBoerenbridgeRoundsMock.mockImplementation(async () => {
            throw new Error("Boom");
        });

        const request = new Request("http://localhost", {
            method: "GET",
        });

        const response = await routeModule.GET(request, {
            params: Promise.resolve({
                id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
            }),
        });

        expect(response.status).toBe(500);
        expect(logApiErrorMock).toHaveBeenCalledTimes(1);
        await expect(response.text()).resolves.toBe("Boom");
    });
});
