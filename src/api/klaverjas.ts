import { AppCreateKlaverjasRound } from "@/models/app/klaverjas-round/create-klaverjas-round";
import { MergedRound } from "@/models/app/klaverjas-round/merged-round";
import { AppUpdateKlaverjasRound } from "@/models/app/klaverjas-round/update-klaverjas-round";
import { AppKlaverjasTeam } from "@/models/app/klaverjas-team/klaverjas-team";
import { CreateKlaverjasGameForm } from "@/validation/create-klaverjas-game-schema";
import { UUID } from "crypto";
import { getJson, postJson, putJson } from "@/api/client";

function toTeam(team: AppKlaverjasTeam): AppKlaverjasTeam {
    return {
        ...team,
        createdAt: new Date(team.createdAt),
        updatedAt: new Date(team.updatedAt),
    };
}

function toRound(round: MergedRound): MergedRound {
    return {
        ...round,
        team1: {
            ...round.team1,
            createdAt: new Date(round.team1.createdAt),
            updatedAt: new Date(round.team1.updatedAt),
        },
        team2: {
            ...round.team2,
            createdAt: new Date(round.team2.createdAt),
            updatedAt: new Date(round.team2.updatedAt),
        },
    };
}

export async function getTeamsForScoreboard(
    scoreboardId: UUID,
): Promise<{ us: AppKlaverjasTeam; them: AppKlaverjasTeam }> {
    const teams = await getJson<{ us: AppKlaverjasTeam; them: AppKlaverjasTeam }>(
        `/scoreboards/${scoreboardId}/klaverjas/teams`,
    );

    return {
        us: toTeam(teams.us),
        them: toTeam(teams.them),
    };
}

export async function createKlaverjasGame(
    data: CreateKlaverjasGameForm,
    scoreboardId: UUID,
): Promise<{ us: AppKlaverjasTeam; them: AppKlaverjasTeam }> {
    const teams = await postJson<
        CreateKlaverjasGameForm,
        { us: AppKlaverjasTeam; them: AppKlaverjasTeam }
    >(`/scoreboards/${scoreboardId}/klaverjas/teams`, data);

    return {
        us: toTeam(teams.us),
        them: toTeam(teams.them),
    };
}

export async function getRoundsForScoreboard(
    scoreboardId: UUID,
): Promise<Array<MergedRound>> {
    const rounds = await getJson<Array<MergedRound>>(
        `/scoreboards/${scoreboardId}/klaverjas/rounds`,
    );

    return rounds.map(toRound);
}

export async function getTotals(
    scoreboardId: UUID,
): Promise<{ us: number; them: number }> {
    return getJson<{ us: number; them: number }>(
        `/scoreboards/${scoreboardId}/klaverjas/totals`,
    );
}

export async function getRoundNumber(scoreboardId: UUID): Promise<number> {
    const response = await getJson<{ roundNumber: number }>(
        `/scoreboards/${scoreboardId}/klaverjas/round-number`,
    );

    return response.roundNumber;
}

export async function createKlaverjasRoundsForBothTeams(
    scoreboardId: UUID,
    teamUsRound: AppCreateKlaverjasRound,
    teamThemRound: AppCreateKlaverjasRound,
): Promise<void> {
    await postJson<
        {
            teamUsRound: AppCreateKlaverjasRound;
            teamThemRound: AppCreateKlaverjasRound;
        },
        void
    >(`/scoreboards/${scoreboardId}/klaverjas/rounds`, {
        teamUsRound,
        teamThemRound,
    });
}

export async function updateKlaverjasRoundsForBothTeams(
    scoreboardId: UUID,
    teamUsRound: AppUpdateKlaverjasRound,
    teamThemRound: AppUpdateKlaverjasRound,
): Promise<void> {
    await putJson<{
        teamUsRound: AppUpdateKlaverjasRound;
        teamThemRound: AppUpdateKlaverjasRound;
    }>(`/scoreboards/${scoreboardId}/klaverjas/rounds`, {
        teamUsRound,
        teamThemRound,
    });
}
