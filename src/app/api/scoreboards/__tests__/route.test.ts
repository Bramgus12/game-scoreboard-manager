import { beforeEach, describe, expect, it, mock } from "bun:test";
import { GAME_TYPE } from "@/constants/gameType";

const getScoreboardsForUserMock = mock(
    async (): Promise<Array<Record<string, unknown>>> => [],
);
const createScoreboardMock = mock(async () => ({
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    scoreboardName: "Weekend Match",
    gameType: GAME_TYPE.KLAVERJAS,
    user: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    updatedAt: new Date("2026-01-01T00:00:00.000Z"),
}));
const getScoreboardByIdMock = mock(async () => ({
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    scoreboardName: "Weekend Match",
}));
const deleteScoreboardByIdMock = mock(async () => undefined);

const currentUserMock = mock<() => Promise<{ id: string } | null>>(async () => ({
    id: "clerk_user_123",
}));
const posthogCaptureMock = mock(() => undefined);
const getPosthogClientMock = mock(() => ({ capture: posthogCaptureMock }));

mock.module("@/server/service/scoreboard", () => ({
    getScoreboardsForUser: getScoreboardsForUserMock,
    createScoreboard: createScoreboardMock,
    getScoreboardById: getScoreboardByIdMock,
    deleteScoreboardById: deleteScoreboardByIdMock,
}));

mock.module("@clerk/nextjs/server", () => ({
    currentUser: currentUserMock,
}));

mock.module("@/lib/posthog-server", () => ({
    getPostHogClient: getPosthogClientMock,
}));

const routeModule = await import("@/app/api/scoreboards/route");

describe("/api/scoreboards route", () => {
    beforeEach(() => {
        getScoreboardsForUserMock.mockReset();
        createScoreboardMock.mockReset();
        currentUserMock.mockReset();
        posthogCaptureMock.mockReset();
        getPosthogClientMock.mockReset();
        getScoreboardByIdMock.mockReset();
        deleteScoreboardByIdMock.mockReset();

        getScoreboardsForUserMock.mockImplementation(
            async (): Promise<Array<Record<string, unknown>>> => [],
        );
        createScoreboardMock.mockImplementation(async () => ({
            id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
            scoreboardName: "Weekend Match",
            gameType: GAME_TYPE.KLAVERJAS,
            user: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
            createdAt: new Date("2026-01-01T00:00:00.000Z"),
            updatedAt: new Date("2026-01-01T00:00:00.000Z"),
        }));
        currentUserMock.mockImplementation(async () => ({ id: "clerk_user_123" }));
        getScoreboardByIdMock.mockImplementation(async () => ({
            id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
            scoreboardName: "Weekend Match",
        }));
        deleteScoreboardByIdMock.mockImplementation(async () => undefined);
        getPosthogClientMock.mockImplementation(() => ({
            capture: posthogCaptureMock,
        }));
        posthogCaptureMock.mockImplementation(() => undefined);
    });

    it("returns scoreboards for authenticated user", async () => {
        const scoreboards = [
            {
                id: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
                scoreboardName: "Friday Night",
                gameType: GAME_TYPE.BOERENBRIDGE,
                user: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
                createdAt: new Date("2026-01-01T00:00:00.000Z"),
                updatedAt: new Date("2026-01-01T00:00:00.000Z"),
            },
        ];

        getScoreboardsForUserMock.mockImplementation(async () => scoreboards);

        const response = await routeModule.GET();

        expect(response.status).toBe(200);

        const body = await response.json();

        expect(body).toHaveLength(1);
        expect(body[0].id).toBe("cccccccc-cccc-4ccc-8ccc-cccccccccccc");
        expect(body[0].scoreboardName).toBe("Friday Night");
        expect(body[0].gameType).toBe(GAME_TYPE.BOERENBRIDGE);
    });

    it("creates scoreboard and captures analytics event", async () => {
        const request = new Request("http://localhost/api/scoreboards", {
            method: "POST",
            body: JSON.stringify({
                scoreboardName: "Weekend Match",
                gameType: GAME_TYPE.KLAVERJAS,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await routeModule.POST(request);

        expect(response.status).toBe(201);
        expect(createScoreboardMock).toHaveBeenCalledWith({
            scoreboardName: "Weekend Match",
            gameType: GAME_TYPE.KLAVERJAS,
        });

        expect(posthogCaptureMock).toHaveBeenCalledTimes(1);
        expect(posthogCaptureMock).toHaveBeenCalledWith(
            expect.objectContaining({
                event: "scoreboard_created",
                distinctId: "clerk_user_123",
                properties: expect.objectContaining({
                    game_type: GAME_TYPE.KLAVERJAS,
                }),
            }),
        );
    });

    it("creates scoreboard without analytics when user is missing", async () => {
        currentUserMock.mockImplementation(async () => null);

        const request = new Request("http://localhost/api/scoreboards", {
            method: "POST",
            body: JSON.stringify({
                scoreboardName: "Weekend Match",
                gameType: GAME_TYPE.KLAVERJAS,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await routeModule.POST(request);

        expect(response.status).toBe(201);
        expect(posthogCaptureMock).not.toHaveBeenCalled();
    });

    it("returns 500 when GET throws", async () => {
        getScoreboardsForUserMock.mockImplementation(async () => {
            throw new Error("Failed to load scoreboards");
        });

        const response = await routeModule.GET();

        expect(response.status).toBe(500);
        await expect(response.text()).resolves.toBe("Failed to load scoreboards");
    });

    it("returns 500 for invalid payload", async () => {
        const request = new Request("http://localhost/api/scoreboards", {
            method: "POST",
            body: JSON.stringify({ gameType: GAME_TYPE.KLAVERJAS }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await routeModule.POST(request);

        expect(response.status).toBe(500);
        const body = await response.text();

        expect(body.length).toBeGreaterThan(0);
    });
});
