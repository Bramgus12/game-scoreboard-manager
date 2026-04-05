import { beforeEach, describe, expect, it, mock } from "bun:test";
import type { AppUpdateKlaverjasRound } from "@/models/app/klaverjas-round/update-klaverjas-round";
import { TEAM_TYPE } from "@/constants/teamType";
import {
    createAppKlaverjasRound,
    createAppKlaverjasTeam,
} from "@/test/fixtures/klaverjas";

const createTeamsForScoreboardMock = mock(async () => undefined);
const getTeamsForScoreboardMock = mock<
    (
        scoreboardId: string,
    ) => Promise<Array<ReturnType<typeof createAppKlaverjasTeam>> | null>
>(async () => []);

const createKlaverjasRoundMock = mock(async () => undefined);
const updateKlaverjasRoundMock = mock(async () => undefined);
const getRoundsForTeamMock = mock(
    async (): Promise<Array<Record<string, unknown>>> => [],
);

const getFameMock = mock(() => 0);

mock.module("@/server/repository/klaverjas-team", () => ({
    createTeamsForScoreboard: createTeamsForScoreboardMock,
    getTeamsForScoreboard: getTeamsForScoreboardMock,
}));

mock.module("@/server/repository/klaverjas-round", () => ({
    createKlaverjasRound: createKlaverjasRoundMock,
    updateKlaverjasRound: updateKlaverjasRoundMock,
    getRoundsForTeam: getRoundsForTeamMock,
}));

mock.module("@/utils/funcs/get-fame", () => ({
    getFame: getFameMock,
}));

const klaverjasService = await import("@/server/service/klaverjas");

describe("klaverjas service", () => {
    beforeEach(() => {
        createTeamsForScoreboardMock.mockReset();
        getTeamsForScoreboardMock.mockReset();
        createKlaverjasRoundMock.mockReset();
        updateKlaverjasRoundMock.mockReset();
        getRoundsForTeamMock.mockReset();
        getFameMock.mockReset();

        createTeamsForScoreboardMock.mockImplementation(async () => undefined);
        getTeamsForScoreboardMock.mockImplementation(async () => []);
        createKlaverjasRoundMock.mockImplementation(async () => undefined);
        updateKlaverjasRoundMock.mockImplementation(async () => undefined);
        getRoundsForTeamMock.mockImplementation(async () => []);
        getFameMock.mockImplementation(() => 0);
    });

    it("creates klaverjas game with both teams", async () => {
        const us = createAppKlaverjasTeam({
            id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
            type: TEAM_TYPE.US,
            name: "Us",
        });
        const them = createAppKlaverjasTeam({
            id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
            type: TEAM_TYPE.THEM,
            name: "Them",
        });

        getTeamsForScoreboardMock.mockImplementation(async () => [us, them]);

        const result = await klaverjasService.createKlaverjasGame(
            {
                ourTeamName: "Us",
                theirTeamName: "Them",
            },
            "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
        );

        expect(createTeamsForScoreboardMock).toHaveBeenCalledWith(
            "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
            [
                {
                    type: TEAM_TYPE.US,
                    name: "Us",
                },
                {
                    type: TEAM_TYPE.THEM,
                    name: "Them",
                },
            ],
        );

        expect(result).toEqual({ us, them });
    });

    it("throws when teams are missing after game creation", async () => {
        getTeamsForScoreboardMock.mockImplementation(async () => [
            createAppKlaverjasTeam({ type: TEAM_TYPE.US }),
        ]);

        const action = klaverjasService.createKlaverjasGame(
            {
                ourTeamName: "Us",
                theirTeamName: "Them",
            },
            "18181818-1818-4181-8181-181818181818",
        );

        await expect(action).rejects.toThrow("Both teams must exist after creation");
    });

    it("returns empty rounds when teams are missing for scoreboard", async () => {
        getTeamsForScoreboardMock.mockImplementation(async () => null);

        const rounds = await klaverjasService.getRoundsForScoreboard(
            "19191919-1919-4191-8191-191919191919",
        );

        expect(rounds).toEqual([]);
    });

    it("returns empty rounds when one team is missing", async () => {
        getTeamsForScoreboardMock.mockImplementation(async () => [
            createAppKlaverjasTeam({ type: TEAM_TYPE.US }),
        ]);

        const rounds = await klaverjasService.getRoundsForScoreboard(
            "20202020-2020-4020-8020-202020202020",
        );

        expect(rounds).toEqual([]);
    });

    it("returns only matched round pairs", async () => {
        const usTeam = createAppKlaverjasTeam({
            id: "21212121-2121-4121-8121-212121212121",
            type: TEAM_TYPE.US,
        });
        const themTeam = createAppKlaverjasTeam({
            id: "22222222-2222-4222-8222-222222222222",
            type: TEAM_TYPE.THEM,
        });

        getTeamsForScoreboardMock.mockImplementation(async () => [usTeam, themTeam]);
        getRoundsForTeamMock
            .mockImplementationOnce(async () => [
                {
                    id: "23232323-2323-4232-8232-232323232323",
                    round_number: 2,
                    points: 82,
                    fame: 0,
                    is_pit: false,
                    is_wet: false,
                    is_going: false,
                    klaverjas_team_id: usTeam.id,
                    created_at: new Date("2026-01-01T00:00:00.000Z"),
                    updated_at: new Date("2026-01-01T00:00:00.000Z"),
                },
                {
                    id: "24242424-2424-4242-8242-242424242424",
                    round_number: 1,
                    points: 80,
                    fame: 0,
                    is_pit: false,
                    is_wet: false,
                    is_going: false,
                    klaverjas_team_id: usTeam.id,
                    created_at: new Date("2026-01-01T00:00:00.000Z"),
                    updated_at: new Date("2026-01-01T00:00:00.000Z"),
                },
            ])
            .mockImplementationOnce(async () => [
                {
                    id: "25252525-2525-4252-8252-252525252525",
                    round_number: 2,
                    points: 78,
                    fame: 0,
                    is_pit: false,
                    is_wet: false,
                    is_going: false,
                    klaverjas_team_id: themTeam.id,
                    created_at: new Date("2026-01-01T00:00:00.000Z"),
                    updated_at: new Date("2026-01-01T00:00:00.000Z"),
                },
            ]);

        const rounds = await klaverjasService.getRoundsForScoreboard(
            "26262626-2626-4262-8262-262626262626",
        );

        expect(rounds).toEqual([
            {
                roundNumber: 2,
                team1: createAppKlaverjasRound({
                    id: "23232323-2323-4232-8232-232323232323",
                    roundNumber: 2,
                    points: 82,
                    klaverjasTeam: usTeam.id,
                }),
                team2: createAppKlaverjasRound({
                    id: "25252525-2525-4252-8252-252525252525",
                    roundNumber: 2,
                    points: 78,
                    klaverjasTeam: themTeam.id,
                }),
            },
        ]);
    });

    it("calculates totals from merged rounds and fame", async () => {
        const usTeam = createAppKlaverjasTeam({
            id: "eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee",
            type: TEAM_TYPE.US,
        });
        const themTeam = createAppKlaverjasTeam({
            id: "ffffffff-ffff-4fff-8fff-ffffffffffff",
            type: TEAM_TYPE.THEM,
        });

        getTeamsForScoreboardMock.mockImplementation(async () => [usTeam, themTeam]);

        getRoundsForTeamMock
            .mockImplementationOnce(async () => [
                {
                    id: "20202020-2020-4020-8020-202020202020",
                    round_number: 1,
                    points: 82,
                    fame: 10,
                    is_pit: false,
                    is_wet: false,
                    is_going: false,
                    klaverjas_team_id: usTeam.id,
                    created_at: new Date("2026-01-01T00:00:00.000Z"),
                    updated_at: new Date("2026-01-01T00:00:00.000Z"),
                },
            ])
            .mockImplementationOnce(async () => [
                {
                    id: "21212121-2121-4121-8121-212121212121",
                    round_number: 1,
                    points: 80,
                    fame: 20,
                    is_pit: false,
                    is_wet: false,
                    is_going: false,
                    klaverjas_team_id: themTeam.id,
                    created_at: new Date("2026-01-01T00:00:00.000Z"),
                    updated_at: new Date("2026-01-01T00:00:00.000Z"),
                },
            ]);

        getFameMock
            .mockImplementationOnce(() => 10)
            .mockImplementationOnce(() => 20);

        const totals = await klaverjasService.getTotals(
            "01010101-0101-4101-8101-010101010101",
        );

        expect(totals).toEqual({
            us: 92,
            them: 100,
        });
    });

    it("returns round number 1 when teams do not exist", async () => {
        getTeamsForScoreboardMock.mockImplementation(async () => null);

        const roundNumber = await klaverjasService.getRoundNumber(
            "27272727-2727-4272-8272-272727272727",
        );

        expect(roundNumber).toBe(1);
    });

    it("returns round number 1 when team mapping is incomplete", async () => {
        getTeamsForScoreboardMock.mockImplementation(async () => [
            createAppKlaverjasTeam({ type: TEAM_TYPE.US }),
        ]);

        const roundNumber = await klaverjasService.getRoundNumber(
            "28282828-2828-4282-8282-282828282828",
        );

        expect(roundNumber).toBe(1);
    });

    it("returns round number 1 when one team has no rounds", async () => {
        const usTeam = createAppKlaverjasTeam({
            id: "29292929-2929-4292-8292-292929292929",
            type: TEAM_TYPE.US,
        });
        const themTeam = createAppKlaverjasTeam({
            id: "30303030-3030-4030-8030-303030303030",
            type: TEAM_TYPE.THEM,
        });

        getTeamsForScoreboardMock.mockImplementation(async () => [usTeam, themTeam]);
        getRoundsForTeamMock
            .mockImplementationOnce(async () => [])
            .mockImplementationOnce(async () => [
                {
                    id: "31313131-3131-4131-8131-313131313131",
                    round_number: 1,
                    points: 80,
                    fame: 0,
                    is_pit: false,
                    is_wet: false,
                    is_going: false,
                    klaverjas_team_id: themTeam.id,
                    created_at: new Date("2026-01-01T00:00:00.000Z"),
                    updated_at: new Date("2026-01-01T00:00:00.000Z"),
                },
            ]);

        const roundNumber = await klaverjasService.getRoundNumber(
            "32323232-3232-4232-8232-323232323232",
        );

        expect(roundNumber).toBe(1);
    });

    it("returns max round number plus one", async () => {
        const usTeam = createAppKlaverjasTeam({
            id: "33333333-3333-4333-8333-333333333333",
            type: TEAM_TYPE.US,
        });
        const themTeam = createAppKlaverjasTeam({
            id: "34343434-3434-4434-8434-343434343434",
            type: TEAM_TYPE.THEM,
        });

        getTeamsForScoreboardMock.mockImplementation(async () => [usTeam, themTeam]);
        getRoundsForTeamMock
            .mockImplementationOnce(async () => [
                {
                    id: "35353535-3535-4535-8535-353535353535",
                    round_number: 2,
                    points: 82,
                    fame: 0,
                    is_pit: false,
                    is_wet: false,
                    is_going: false,
                    klaverjas_team_id: usTeam.id,
                    created_at: new Date("2026-01-01T00:00:00.000Z"),
                    updated_at: new Date("2026-01-01T00:00:00.000Z"),
                },
            ])
            .mockImplementationOnce(async () => [
                {
                    id: "36363636-3636-4636-8636-363636363636",
                    round_number: 4,
                    points: 80,
                    fame: 0,
                    is_pit: false,
                    is_wet: false,
                    is_going: false,
                    klaverjas_team_id: themTeam.id,
                    created_at: new Date("2026-01-01T00:00:00.000Z"),
                    updated_at: new Date("2026-01-01T00:00:00.000Z"),
                },
            ]);

        const roundNumber = await klaverjasService.getRoundNumber(
            "37373737-3737-4737-8737-373737373737",
        );

        expect(roundNumber).toBe(5);
    });

    it("throws when getting teams and repository returns null", async () => {
        getTeamsForScoreboardMock.mockImplementation(async () => null);

        const action = klaverjasService.getTeamsForScoreboard(
            "38383838-3838-4838-8838-383838383838",
        );

        await expect(action).rejects.toThrow("Teams not found");
    });

    it("throws when getting teams and one team is missing", async () => {
        getTeamsForScoreboardMock.mockImplementation(async () => [
            createAppKlaverjasTeam({ type: TEAM_TYPE.US }),
        ]);

        const action = klaverjasService.getTeamsForScoreboard(
            "39393939-3939-4939-8939-393939393939",
        );

        await expect(action).rejects.toThrow("Both teams must exist");
    });

    it("returns both teams when getting teams for scoreboard", async () => {
        const usTeam = createAppKlaverjasTeam({
            id: "64646464-6464-4646-8646-646464646464",
            type: TEAM_TYPE.US,
        });
        const themTeam = createAppKlaverjasTeam({
            id: "65656565-6565-4656-8656-656565656565",
            type: TEAM_TYPE.THEM,
        });

        getTeamsForScoreboardMock.mockImplementation(async () => [usTeam, themTeam]);

        const result = await klaverjasService.getTeamsForScoreboard(
            "66666666-6666-4666-8666-666666666666",
        );

        expect(result).toEqual({ us: usTeam, them: themTeam });
    });

    it("creates rounds for both teams", async () => {
        const usTeam = createAppKlaverjasTeam({
            id: "40404040-4040-4040-8040-404040404040",
            type: TEAM_TYPE.US,
        });
        const themTeam = createAppKlaverjasTeam({
            id: "41414141-4141-4141-8141-414141414141",
            type: TEAM_TYPE.THEM,
        });

        getTeamsForScoreboardMock.mockImplementation(async () => [usTeam, themTeam]);

        const teamUsRound = {
            roundNumber: 1,
            points: 82,
            fame: 20,
            isPit: false,
            isWet: false,
            isGoing: false,
        };
        const teamThemRound = {
            roundNumber: 1,
            points: 80,
            fame: 0,
            isPit: false,
            isWet: false,
            isGoing: false,
        };

        await klaverjasService.createKlaverjasRoundsForBothTeams(
            "42424242-4242-4242-8242-424242424242",
            teamUsRound,
            teamThemRound,
        );

        expect(createKlaverjasRoundMock).toHaveBeenCalledTimes(2);
        expect(createKlaverjasRoundMock).toHaveBeenNthCalledWith(
            1,
            usTeam.id,
            teamUsRound,
        );
        expect(createKlaverjasRoundMock).toHaveBeenNthCalledWith(
            2,
            themTeam.id,
            teamThemRound,
        );
    });

    it("throws when creating rounds without teams array", async () => {
        getTeamsForScoreboardMock.mockImplementation(async () => null);

        const action = klaverjasService.createKlaverjasRoundsForBothTeams(
            "43434343-4343-4343-8343-434343434343",
            {
                roundNumber: 1,
                points: 82,
                fame: 0,
                isPit: false,
                isWet: false,
                isGoing: false,
            },
            {
                roundNumber: 1,
                points: 80,
                fame: 0,
                isPit: false,
                isWet: false,
                isGoing: false,
            },
        );

        await expect(action).rejects.toThrow("Teams not found");
    });

    it("throws when creating rounds without both teams", async () => {
        getTeamsForScoreboardMock.mockImplementation(async () => [
            createAppKlaverjasTeam({ type: TEAM_TYPE.US }),
        ]);

        const action = klaverjasService.createKlaverjasRoundsForBothTeams(
            "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
            {
                roundNumber: 1,
                points: 82,
                fame: 0,
                isPit: false,
                isWet: false,
                isGoing: false,
            },
            {
                roundNumber: 1,
                points: 80,
                fame: 0,
                isPit: false,
                isWet: false,
                isGoing: false,
            },
        );

        await expect(action).rejects.toThrow(
            "Both teams must exist to create rounds",
        );
        expect(createKlaverjasRoundMock).not.toHaveBeenCalled();
    });

    it("updates rounds for both teams", async () => {
        const usTeam = createAppKlaverjasTeam({
            id: "44444444-4444-4444-8444-444444444444",
            type: TEAM_TYPE.US,
        });
        const themTeam = createAppKlaverjasTeam({
            id: "45454545-4545-4545-8545-454545454545",
            type: TEAM_TYPE.THEM,
        });

        getTeamsForScoreboardMock.mockImplementation(async () => [usTeam, themTeam]);

        const teamUsRound: AppUpdateKlaverjasRound = {
            id: "46464646-4646-4646-8646-464646464646",
            roundNumber: 1,
            points: 82,
            fame: 20,
            isPit: false,
            isWet: false,
            isGoing: false,
        };
        const teamThemRound: AppUpdateKlaverjasRound = {
            id: "47474747-4747-4747-8747-474747474747",
            roundNumber: 1,
            points: 80,
            fame: 0,
            isPit: false,
            isWet: false,
            isGoing: false,
        };

        await klaverjasService.updateKlaverjasRoundsForBothTeams(
            "48484848-4848-4848-8848-484848484848",
            teamUsRound,
            teamThemRound,
        );

        expect(updateKlaverjasRoundMock).toHaveBeenCalledTimes(2);
        expect(updateKlaverjasRoundMock).toHaveBeenNthCalledWith(
            1,
            usTeam.id,
            teamUsRound,
        );
        expect(updateKlaverjasRoundMock).toHaveBeenNthCalledWith(
            2,
            themTeam.id,
            teamThemRound,
        );
    });

    it("throws when updating rounds without teams array", async () => {
        getTeamsForScoreboardMock.mockImplementation(async () => null);

        const action = klaverjasService.updateKlaverjasRoundsForBothTeams(
            "49494949-4949-4949-8949-494949494949",
            {
                id: "50505050-5050-4050-8050-505050505050",
                roundNumber: 1,
                points: 82,
                fame: 0,
                isPit: false,
                isWet: false,
                isGoing: false,
            },
            {
                id: "51515151-5151-4151-8151-515151515151",
                roundNumber: 1,
                points: 80,
                fame: 0,
                isPit: false,
                isWet: false,
                isGoing: false,
            },
        );

        await expect(action).rejects.toThrow("Teams not found");
    });

    it("throws when updating rounds without both teams", async () => {
        getTeamsForScoreboardMock.mockImplementation(async () => [
            createAppKlaverjasTeam({ type: TEAM_TYPE.US }),
        ]);

        const action = klaverjasService.updateKlaverjasRoundsForBothTeams(
            "52525252-5252-4252-8252-525252525252",
            {
                id: "53535353-5353-4353-8353-535353535353",
                roundNumber: 1,
                points: 82,
                fame: 0,
                isPit: false,
                isWet: false,
                isGoing: false,
            },
            {
                id: "54545454-5454-4454-8454-545454545454",
                roundNumber: 1,
                points: 80,
                fame: 0,
                isPit: false,
                isWet: false,
                isGoing: false,
            },
        );

        await expect(action).rejects.toThrow(
            "Both teams must exist to update rounds",
        );
    });
});
