"use server";

import { PrismaClient } from "@prisma/client";
import {
    domainToAppScoreboard,
    domainToAppScoreboardArray,
} from "@/mappers/scoreboard";
import { AppScoreboard } from "@/models/app/scoreboard/Scoreboard";
import { CreateKlaverjasGameForm } from "@/pageComponents/createKlaverjasGame";
import { GAME_TYPE } from "@/constants/gameType";
import { TEAM_TYPE } from "@/constants/teamType";
import { redirect } from "next/navigation";
import { CreateBoerenbridgeGameForm } from "@/pageComponents/createBoerenbridgeGame";
import { getDatabaseUser } from "@/actions/userActions";
import { randomUUID } from "node:crypto";
import { UUID } from "crypto";

const prisma = new PrismaClient();

export async function getScoreboardsForUser(): Promise<Array<AppScoreboard>> {
    const user = await getDatabaseUser();

    const domainScoreboards = await prisma.scoreboard.findMany({
        where: { user_id: user.id },
    });

    await prisma.$disconnect();

    return domainToAppScoreboardArray(domainScoreboards);
}

export async function getScoreboardById(id: UUID) {
    const scoreboard = await prisma.scoreboard.findFirst({
        where: { id },
    });

    await prisma.$disconnect();

    if (scoreboard == null) {
        throw new Error("Scoreboard not found");
    }

    return domainToAppScoreboard(scoreboard);
}

export async function createKlaverjasGame(data: CreateKlaverjasGameForm) {
    const user = await getDatabaseUser();

    const createdScoreboard = await prisma.scoreboard.create({
        data: {
            user_id: user.id,
            created_at: new Date(),
            updated_at: new Date(),
            game_type: GAME_TYPE.KLAVERJAS,
            scoreboard_name: data.scoreboardName,
            id: randomUUID(),
        },
    });

    const createdTeams = await prisma.klaverjas_team.createMany({
        data: [
            {
                id: randomUUID(),
                created_at: new Date(),
                updated_at: new Date(),
                type: TEAM_TYPE.US,
                name: data.ourTeamName,
                scoreboard_id: createdScoreboard.id,
            },
            {
                id: randomUUID(),
                created_at: new Date(),
                updated_at: new Date(),
                type: TEAM_TYPE.THEM,
                name: data.theirTeamName,
                scoreboard_id: createdScoreboard.id,
            },
        ],
    });

    await prisma.$disconnect();

    if (createdTeams.count !== 2) {
        throw new Error("Failed to create teams");
    }

    redirect(`/scoreboard/${createdScoreboard.id}`);
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
