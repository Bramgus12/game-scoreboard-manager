"use server";

import { randomUUID } from "node:crypto";
import { UUID } from "crypto";
import { AppCreateKlaverjasRound } from "@/models/app/klaverjas-round/create-klaverjas-round";
import { AppUpdateKlaverjasRound } from "@/models/app/klaverjas-round/update-klaverjas-round";
import { getDatabaseUser } from "@/server/repository/user";
import prisma from "@/utils/prisma";

export async function createKlaverjasRound(
    teamId: UUID,
    round: AppCreateKlaverjasRound,
) {
    const user = await getDatabaseUser();

    const existingRound = await prisma.klaverjas_round.findFirst({
        where: {
            round_number: round.roundNumber,
            klaverjas_team_id: teamId,
            klaverjas_team: {
                scoreboard: {
                    user_id: user.id,
                },
            },
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

export async function updateKlaverjasRound(
    teamId: UUID,
    round: AppUpdateKlaverjasRound,
) {
    const user = await getDatabaseUser();

    const updatedRounds = await prisma.klaverjas_round.updateMany({
        where: {
            round_number: round.roundNumber,
            klaverjas_team: {
                id: teamId,
                scoreboard: {
                    user_id: user.id,
                },
            },
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

export async function deleteKlaverjasRound(teamId: UUID, roundNumber: number) {
    const user = await getDatabaseUser();

    const deletedRounds = await prisma.klaverjas_round.deleteMany({
        where: {
            round_number: roundNumber,
            klaverjas_team: {
                id: teamId,
                scoreboard: {
                    user_id: user.id,
                },
            },
        },
    });

    await prisma.$disconnect();

    if (deletedRounds.count === 0) {
        throw new Error("Failed to delete round");
    }
}

export async function getRoundsForTeam(teamId: UUID) {
    const user = await getDatabaseUser();

    return prisma.klaverjas_round.findMany({
        where: {
            klaverjas_team_id: teamId,
            klaverjas_team: { scoreboard: { user_id: user.id } },
        },
        orderBy: { round_number: "asc" },
    });
}
