"use server";

import { AppCreateScoreboard } from "@/models/app/scoreboard/create-scoreboard";
import { randomUUID } from "node:crypto";
import { PrismaClient } from "../../../prisma/generated/prisma";
import { UUID } from "crypto";
import { AppUpdateScoreboard } from "@/models/app/scoreboard/update-scoreboard";
import { getDatabaseUser } from "@/server/repository/user";

const prisma = new PrismaClient();

export async function createScoreboard(scoreboard: AppCreateScoreboard) {
    const user = await getDatabaseUser();

    const createdScoreboard = await prisma.scoreboard.create({
        data: {
            user_id: user.id,
            created_at: new Date(),
            updated_at: new Date(),
            game_type: scoreboard.gameType,
            scoreboard_name: scoreboard.scoreboardName,
            id: randomUUID(),
        },
    });

    await prisma.$disconnect();

    return createdScoreboard;
}

export async function getScoreboardsForUser() {
    const user = await getDatabaseUser();

    const scoreboards = await prisma.scoreboard.findMany({
        where: { user_id: user.id },
    });

    await prisma.$disconnect();

    return scoreboards;
}

export async function getScoreboardById(id: UUID) {
    const user = await getDatabaseUser();

    const scoreboard = await prisma.scoreboard.findFirst({
        where: { id, user_id: user.id },
    });

    await prisma.$disconnect();

    if (scoreboard == null) {
        throw new Error("Scoreboard not found");
    }

    return scoreboard;
}

export async function deleteScoreboardById(id: UUID) {
    const user = await getDatabaseUser();

    const scoreboard = await prisma.scoreboard.findFirst({
        where: { id, user_id: user.id },
    });

    if (scoreboard == null) {
        throw new Error("Scoreboard not found");
    }

    await prisma.scoreboard.delete({
        where: { id: scoreboard.id },
    });

    await prisma.$disconnect();
}

export async function updateScoreboard(
    scoreboardId: UUID,
    data: AppUpdateScoreboard,
) {
    const user = await getDatabaseUser();

    const updatedScoreboard = await prisma.scoreboard.update({
        where: { id: scoreboardId, user_id: user.id },
        data: {
            scoreboard_name: data.scoreboardName,
            updated_at: new Date(),
        },
    });

    await prisma.$disconnect();

    return updatedScoreboard;
}
