"use server";

import { UUID } from "crypto";
import { PrismaClient } from "@prisma/client";
import { TEAM_TYPE } from "@/constants/teamType";
import { domainToAppKlaverjasRoundArray } from "@/mappers/klaverjasRound";
import { AppKlaverjasRound } from "@/models/app/klaverjasRound/KlaverjasRound";
import { MergedRound } from "@/pageComponents/klaverjasGame/KlaverjasTable/interfaces";
import { getFame } from "@/utils/funcs/getFame";
import { randomUUID } from "node:crypto";
import { AppCreateKlaverjasRound } from "@/models/app/klaverjasRound/CreateKlaverjasRound";
import { AppUpdateKlaverjasRound } from "@/models/app/klaverjasRound/UpdateKlaverjasRound";
import { domainToAppKlaverjasTeam } from "@/mappers/klaverjasTeam";

const prisma = new PrismaClient();

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

export async function getTeamsForScoreboard(scoreboardId: UUID) {
    const teams = await prisma.klaverjas_team.findMany({
        where: { scoreboard_id: scoreboardId },
    });

    const ourTeam = teams.find((team) => team.type === TEAM_TYPE.US);
    const theirTeam = teams.find((team) => team.type === TEAM_TYPE.THEM);

    if (ourTeam == null || theirTeam == null) {
        throw new Error("Failed to find all teams");
    }

    await prisma.$disconnect();

    return {
        us: domainToAppKlaverjasTeam(ourTeam),
        them: domainToAppKlaverjasTeam(theirTeam),
    };
}

export async function getTeamNames(scoreboardId: UUID) {
    const teams = await getTeamsForScoreboard(scoreboardId);

    return {
        us: teams.us.name,
        them: teams.them.name,
    };
}

export async function getRoundsForTeam(teamId: UUID) {
    const rounds = prisma.klaverjas_round.findMany({
        where: { klaverjas_team_id: teamId },
    });

    await prisma.$disconnect();

    return rounds;
}

export async function getRoundsForScoreboard(scoreboardId: UUID) {
    const teams = await getTeamsForScoreboard(scoreboardId);

    const ourRounds = domainToAppKlaverjasRoundArray(
        await getRoundsForTeam(teams.us.id),
    );
    const theirRounds = domainToAppKlaverjasRoundArray(
        await getRoundsForTeam(teams.them.id),
    );

    return mergeRounds(ourRounds, theirRounds);
}

export async function getTotals(scoreboardId: UUID) {
    const mergedRounds: Array<MergedRound> =
        await getRoundsForScoreboard(scoreboardId);

    return calculateTotals(mergedRounds);
}

export async function deleteRound(scoreboardId: UUID, roundNumber: number) {
    const teams = await getTeamsForScoreboard(scoreboardId);

    const ourResult = await prisma.klaverjas_round.deleteMany({
        where: {
            klaverjas_team_id: teams.us.id,
            round_number: roundNumber,
        },
    });

    const themResult = await prisma.klaverjas_round.deleteMany({
        where: {
            klaverjas_team_id: teams.them.id,
            round_number: roundNumber,
        },
    });

    await prisma.$disconnect();

    if (ourResult.count === 0 || themResult.count === 0) {
        throw new Error("Failed to delete round");
    }
}

export async function getRoundNumber(scoreboardId: UUID) {
    const teams = await getTeamsForScoreboard(scoreboardId);

    const ourRounds = domainToAppKlaverjasRoundArray(
        await getRoundsForTeam(teams.us.id),
    );
    const theirRounds = domainToAppKlaverjasRoundArray(
        await getRoundsForTeam(teams.them.id),
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

export async function updateRound(teamId: UUID, round: AppUpdateKlaverjasRound) {
    const updatedRounds = await prisma.klaverjas_round.updateMany({
        where: {
            klaverjas_team_id: teamId,
            round_number: round.roundNumber,
        },
        data: {
            fame: round.fame,
            points: round.points,
            is_pit: round.isPit,
            is_wet: round.isWet,
            is_going: round.isGoing,
            updated_at: new Date(),
        },
    });

    await prisma.$disconnect();

    if (updatedRounds.count === 0) {
        throw new Error("Failed to update round");
    }
}

export async function createRound(teamId: UUID, round: AppCreateKlaverjasRound) {
    const existingRound = await prisma.klaverjas_round.findFirst({
        where: {
            round_number: round.roundNumber,
            klaverjas_team_id: teamId,
        },
    });

    if (existingRound != null) {
        await prisma.$disconnect();

        throw new Error("Round already exists");
    }

    const createdRound = await prisma.klaverjas_round.create({
        data: {
            fame: round.fame,
            points: round.points,
            is_pit: round.isPit,
            is_wet: round.isWet,
            is_going: round.isGoing,
            klaverjas_team_id: teamId,
            round_number: round.roundNumber,
            created_at: new Date(),
            updated_at: new Date(),
            id: randomUUID(),
        },
    });

    await prisma.$disconnect();

    return createdRound;
}
