"use server";

import {
    domainToAppScoreboard,
    domainToAppScoreboardArray,
} from "@/mappers/scoreboard";
import { AppScoreboard } from "@/models/app/scoreboard/scoreboard";
import { GAME_TYPE } from "@/constants/gameType";
import { redirect } from "next/navigation";
import { getDatabaseUser } from "@/actions/user-actions";
import { randomUUID } from "node:crypto";
import { UUID } from "crypto";
import { PrismaClient } from "../../prisma/generated/prisma";
import { CreateBoerenbridgeGameForm } from "@/validation/create-boerenbridge-schema";
import { AppCreateScoreboard } from "@/models/app/scoreboard/create-scoreboard";

const prisma = new PrismaClient();

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

export async function getScoreboardsForUser(): Promise<Array<AppScoreboard>> {
    const user = await getDatabaseUser();

    const domainScoreboards = await prisma.scoreboard.findMany({
        where: { user_id: user.id },
    });

    await prisma.$disconnect();

    return domainToAppScoreboardArray(domainScoreboards);
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

    return domainToAppScoreboard(scoreboard);
}

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

export async function createBoerenbridgeGame(data: CreateBoerenbridgeGameForm) {
    const user = await getDatabaseUser();

    const createdScoreboard = await prisma.scoreboard.create({
        data: {
            user_id: user.id,
            id: randomUUID(),
            created_at: new Date(),
            updated_at: new Date(),
            scoreboard_name: data.scoreboardName,
            game_type: GAME_TYPE.BOERENBRIDGE,
        },
    });

    const createdGame = await prisma.boerenbridge_game.create({
        data: {
            created_at: new Date(),
            updated_at: new Date(),
            id: randomUUID(),
            scoreboard_id: createdScoreboard.id,
            current_round: 1,
            points_per_correct_guess: data.pointsPerCorrectGuess,
        },
    });

    const createdPlayers = await prisma.boerenbridge_player.createMany({
        data: data.players.map((player) => ({
            id: randomUUID(),
            created_at: new Date(),
            updated_at: new Date(),
            name: player.playerName,
            game_id: createdGame.id,
        })),
    });

    await prisma.$disconnect();

    if (createdPlayers.count !== data.players.length) {
        throw new Error("not all players were created");
    }

    redirect(`/scoreboard/${createdScoreboard.id}`);
}
