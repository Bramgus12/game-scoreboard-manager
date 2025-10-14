"use server";

import { UUID } from "crypto";
import { TEAM_TYPE } from "@/constants/teamType";
import { domainToAppKlaverjasRoundArray } from "@/mappers/klaverjas-round";
import { AppKlaverjasRound } from "@/models/app/klaverjas-round/klaverjas-round";
import { getFame } from "@/utils/funcs/get-fame";
import { MergedRound } from "@/models/app/klaverjas-round/merged-round";
import { CreateKlaverjasGameForm } from "@/validation/create-klaverjas-game-schema";
import { AppCreateKlaverjasRound } from "@/models/app/klaverjas-round/create-klaverjas-round";
import { AppUpdateKlaverjasRound } from "@/models/app/klaverjas-round/update-klaverjas-round";
import {
    createTeamsForScoreboard,
    getTeamsForScoreboard as repoGetTeamsForScoreboard,
} from "@/server/repository/klaverjas-team";
import {
    createKlaverjasRound,
    deleteKlaverjasRound,
    getRoundsForTeam,
    updateKlaverjasRound,
} from "@/server/repository/klaverjas-round";

function mergeRounds(
    team1Rounds: Array<AppKlaverjasRound>,
    team2Rounds: Array<AppKlaverjasRound>,
) {
    return team1Rounds
        .sort((a, b) => a.roundNumber - b.roundNumber)
        .map((round) => {
            const matchingRound = team2Rounds.find(
                (r) => r.roundNumber === round.roundNumber,
            );

            if (!matchingRound) {
                return undefined;
            }

            return {
                roundNumber: round.roundNumber,
                team1: round,
                team2: matchingRound,
            };
        })
        .filter((round) => round != null);
}

function calculateTotals(mergedRounds: Array<MergedRound>) {
    return mergedRounds.reduce<{ us: number; them: number }>(
        (accumulator, currentValue) => {
            const returnValue = { ...accumulator };

            const usFame = getFame(currentValue, "team1");
            const themFame = getFame(currentValue, "team2");

            returnValue.us += currentValue.team1.points + usFame;
            returnValue.them += currentValue.team2.points + themFame;

            return returnValue;
        },
        { us: 0, them: 0 },
    );
}

export async function getTeamNames(scoreboardId: UUID) {
    const teams = await repoGetTeamsForScoreboard(scoreboardId);

    if (teams == null) {
        return null;
    }

    const ourTeam = teams.find((team) => team.type === TEAM_TYPE.US);
    const theirTeam = teams.find((team) => team.type === TEAM_TYPE.THEM);

    if (!ourTeam || !theirTeam) {
        return null;
    }

    return {
        us: ourTeam.name,
        them: theirTeam.name,
    };
}

export async function getRoundsForScoreboard(scoreboardId: UUID) {
    const teams = await repoGetTeamsForScoreboard(scoreboardId);

    if (teams == null) {
        return [];
    }

    const ourTeam = teams.find((team) => team.type === TEAM_TYPE.US);
    const theirTeam = teams.find((team) => team.type === TEAM_TYPE.THEM);

    if (!ourTeam || !theirTeam) {
        return [];
    }

    const ourRounds = domainToAppKlaverjasRoundArray(
        await getRoundsForTeam(ourTeam.id),
    );
    const theirRounds = domainToAppKlaverjasRoundArray(
        await getRoundsForTeam(theirTeam.id),
    );

    return mergeRounds(ourRounds, theirRounds);
}

export async function getTotals(scoreboardId: UUID) {
    const mergedRounds: Array<MergedRound> =
        await getRoundsForScoreboard(scoreboardId);

    return calculateTotals(mergedRounds);
}

export async function deleteRoundFromBothTeams(
    scoreboardId: UUID,
    roundNumber: number,
) {
    const teams = await repoGetTeamsForScoreboard(scoreboardId);

    if (teams == null) {
        throw new Error("Teams not found");
    }

    const ourTeam = teams.find((team) => team.type === TEAM_TYPE.US);
    const theirTeam = teams.find((team) => team.type === TEAM_TYPE.THEM);

    if (!ourTeam || !theirTeam) {
        throw new Error("Both teams must exist to delete a round");
    }

    void deleteKlaverjasRound(ourTeam.id, roundNumber);

    void deleteKlaverjasRound(theirTeam.id, roundNumber);
}

export async function getRoundNumber(scoreboardId: UUID) {
    const teams = await repoGetTeamsForScoreboard(scoreboardId);

    if (teams == null) {
        return 1;
    }

    const ourTeam = teams.find((team) => team.type === TEAM_TYPE.US);
    const theirTeam = teams.find((team) => team.type === TEAM_TYPE.THEM);

    if (!ourTeam || !theirTeam) {
        return 1;
    }

    const ourRounds = domainToAppKlaverjasRoundArray(
        await getRoundsForTeam(ourTeam.id),
    );
    const theirRounds = domainToAppKlaverjasRoundArray(
        await getRoundsForTeam(theirTeam.id),
    );

    if (ourRounds.length === 0 || theirRounds.length === 0) {
        return 1;
    }

    return (
        Math.max(
            ...ourRounds.map((round) => round.roundNumber),
            ...theirRounds.map((round) => round.roundNumber),
        ) + 1
    );
}

export async function getTeamsForScoreboard(scoreboardId: UUID) {
    const teams = await repoGetTeamsForScoreboard(scoreboardId);

    if (teams == null) {
        throw new Error("Teams not found");
    }

    const ourTeam = teams.find((team) => team.type === TEAM_TYPE.US);
    const theirTeam = teams.find((team) => team.type === TEAM_TYPE.THEM);

    if (!ourTeam || !theirTeam) {
        throw new Error("Both teams must exist");
    }

    return {
        us: ourTeam,
        them: theirTeam,
    };
}

export async function createKlaverjasGame(
    data: CreateKlaverjasGameForm,
    scoreboardId: UUID,
) {
    await createTeamsForScoreboard(scoreboardId, [
        {
            type: TEAM_TYPE.US,
            name: data.ourTeamName,
        },
        {
            type: TEAM_TYPE.THEM,
            name: data.theirTeamName,
        },
    ]);

    const teams = await repoGetTeamsForScoreboard(scoreboardId);

    const ourTeam = teams.find((team) => team.type === TEAM_TYPE.US);
    const theirTeam = teams.find((team) => team.type === TEAM_TYPE.THEM);

    if (!ourTeam || !theirTeam) {
        throw new Error("Both teams must exist after creation");
    }

    return {
        us: ourTeam,
        them: theirTeam,
    };
}

export async function createKlaverjasRoundsForBothTeams(
    scoreboardId: UUID,
    teamUsRound: AppCreateKlaverjasRound,
    teamThemRound: AppCreateKlaverjasRound,
) {
    const teams = await repoGetTeamsForScoreboard(scoreboardId);

    if (teams == null) {
        throw new Error("Teams not found");
    }

    const ourTeam = teams.find((team) => team.type === TEAM_TYPE.US);
    const theirTeam = teams.find((team) => team.type === TEAM_TYPE.THEM);

    if (!ourTeam || !theirTeam) {
        throw new Error("Both teams must exist to create rounds");
    }

    await createKlaverjasRound(ourTeam.id, teamUsRound);
    await createKlaverjasRound(theirTeam.id, teamThemRound);
}

export async function updateKlaverjasRoundsForBothTeams(
    scoreboardId: UUID,
    teamUsRound: AppUpdateKlaverjasRound,
    teamThemRound: AppUpdateKlaverjasRound,
) {
    const teams = await repoGetTeamsForScoreboard(scoreboardId);

    if (teams == null) {
        throw new Error("Teams not found");
    }

    const ourTeam = teams.find((team) => team.type === TEAM_TYPE.US);
    const theirTeam = teams.find((team) => team.type === TEAM_TYPE.THEM);

    if (!ourTeam || !theirTeam) {
        throw new Error("Both teams must exist to update rounds");
    }

    await updateKlaverjasRound(ourTeam.id, teamUsRound);
    await updateKlaverjasRound(theirTeam.id, teamThemRound);
}
