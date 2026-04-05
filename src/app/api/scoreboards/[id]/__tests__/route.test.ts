import { beforeEach, describe, expect, it, mock } from "bun:test";

const getScoreboardByIdMock = mock(async () => ({
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    scoreboardName: "Friday Night",
}));
const deleteScoreboardByIdMock = mock(async () => undefined);
const parseUuidMock = mock((value: string) => value);
mock.module("@/server/service/scoreboard", () => ({
    getScoreboardsForUser: mock(async () => []),
    createScoreboard: mock(async () => ({})),
    getScoreboardById: getScoreboardByIdMock,
    deleteScoreboardById: deleteScoreboardByIdMock,
}));

mock.module("@/lib/uuid", () => ({
    parseUuid: parseUuidMock,
    isUuid: (value: string) => value.length > 0,
}));

const routeModule = await import("@/app/api/scoreboards/[id]/route");

describe("/api/scoreboards/[id] route", () => {
    beforeEach(() => {
        getScoreboardByIdMock.mockReset();
        deleteScoreboardByIdMock.mockReset();
        parseUuidMock.mockReset();
        getScoreboardByIdMock.mockImplementation(async () => ({
            id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
            scoreboardName: "Friday Night",
        }));
        deleteScoreboardByIdMock.mockImplementation(async () => undefined);
        parseUuidMock.mockImplementation((value: string) => value);
    });

    it("returns scoreboard for GET", async () => {
        const response = await routeModule.GET(new Request("http://localhost"), {
            params: Promise.resolve({
                id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
            }),
        });

        expect(response.status).toBe(200);
        await expect(response.json()).resolves.toEqual({
            id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
            scoreboardName: "Friday Night",
        });
    });

    it("maps not found errors to 404", async () => {
        getScoreboardByIdMock.mockImplementation(async () => {
            throw new Error("Scoreboard not found");
        });

        const response = await routeModule.GET(new Request("http://localhost"), {
            params: Promise.resolve({
                id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
            }),
        });

        expect(response.status).toBe(404);
        await expect(response.text()).resolves.toBe("Scoreboard not found");
    });

    it("deletes scoreboard and returns 204", async () => {
        const response = await routeModule.DELETE(new Request("http://localhost"), {
            params: Promise.resolve({
                id: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
            }),
        });

        expect(response.status).toBe(204);
        expect(deleteScoreboardByIdMock).toHaveBeenCalledWith(
            "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
        );
    });

    it("returns 500 when GET parseUuid fails", async () => {
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

    it("returns 500 when DELETE throws unknown error", async () => {
        deleteScoreboardByIdMock.mockImplementation(async () => {
            throw new Error("Delete failed");
        });

        const response = await routeModule.DELETE(new Request("http://localhost"), {
            params: Promise.resolve({
                id: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
            }),
        });

        expect(response.status).toBe(500);
        await expect(response.text()).resolves.toBe("Delete failed");
    });

    it("maps not found errors to 404 on DELETE", async () => {
        deleteScoreboardByIdMock.mockImplementation(async () => {
            throw new Error("Scoreboard not found");
        });

        const response = await routeModule.DELETE(new Request("http://localhost"), {
            params: Promise.resolve({
                id: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
            }),
        });

        expect(response.status).toBe(404);
        await expect(response.text()).resolves.toBe("Scoreboard not found");
    });
});
