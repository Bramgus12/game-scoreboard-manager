"use server";

import { UUID } from "crypto";
import { AppCreateKlaverjasTeam } from "@/models/app/klaverjas-team/create-klaverjas-team";
import { GAME_TYPE } from "@/constants/gameType";
import { randomUUID } from "node:crypto";
import { domainToAppKlaverjasTeamArray } from "@/mappers/klaverjas-team";
import { getDatabaseUser } from "@/server/repository/user";
import prisma from "@/utils/prisma";

export async function createTeamsForScoreboard(
    scoreboardId: UUID,
    teams: Array<AppCreateKlaverjasTeam>,
) {
    const user = await getDatabaseUser();

    const scoreboard = await prisma.scoreboard.findFirst({
        where: { id: scoreboardId, user_id: user.id },
    });

    if (scoreboard == null) {
        throw new Error("Scoreboard not found");
    }

    if (scoreboard.game_type !== GAME_TYPE.KLAVERJAS) {
        throw new Error("Scoreboard is not of type Klaverjas");
    }

    const creationResult = await prisma.klaverjas_team.createMany({
        data: teams.map((team) => ({
            id: randomUUID(),
            name: team.name,
            scoreboard_id: scoreboardId,
            type: team.type,
            created_at: new Date(),
            updated_at: new Date(),
        })),
    });

    await prisma.$disconnect();

    if (creationResult.count !== teams.length) {
        throw new Error("Failed to create all teams");
    }
}

export async function getTeamsForScoreboard(scoreboardId: UUID) {
    const user = await getDatabaseUser();

    const teams = await prisma.klaverjas_team.findMany({
        where: {
            scoreboard_id: scoreboardId,
            scoreboard: {
                user_id: user.id,
            },
        },
    });

    await prisma.$disconnect();

    if (teams == null) {
        throw new Error("Teams not found");
    }

    return domainToAppKlaverjasTeamArray(teams);
}

export async function updateTeam(teamId: UUID, name: string) {
    const user = await getDatabaseUser();

    const updatedTeam = await prisma.klaverjas_team.updateMany({
        where: {
            id: teamId,
            scoreboard: {
                user_id: user.id,
            },
        },
        data: {
            name,
            updated_at: new Date(),
        },
    });

    await prisma.$disconnect();

    if (updatedTeam.count === 0) {
        throw new Error("Team not found or not updated");
    }
}

export async function deleteTeam(teamId: UUID) {
    const user = await getDatabaseUser();

    const deletedTeam = await prisma.klaverjas_team.deleteMany({
        where: {
            id: teamId,
            scoreboard: {
                user_id: user.id,
            },
        },
    });

    await prisma.$disconnect();

    if (deletedTeam.count === 0) {
        throw new Error("Team not found or not deleted");
    }
}
