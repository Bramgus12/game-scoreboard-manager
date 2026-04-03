import { AppCreateScoreboard } from "@/models/app/scoreboard/create-scoreboard";
import { randomUUID } from "node:crypto";
import { UUID } from "crypto";
import { getDatabaseUser } from "@/server/repository/user";
import prisma from "@/utils/prisma";
import { GAME_TYPE } from "@/constants/gameType";
import { AppCreateBoerenbridgePlayer } from "@/models/app/boerenbridge-player/create-boerenbridge-player";

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

    return createdScoreboard;
}

type CreateBoerenbridgeScoreboardWithGamePayload = {
    scoreboardName: string;
    pointsPerCorrectGuess: number;
    players: Array<AppCreateBoerenbridgePlayer>;
};

export async function createBoerenbridgeScoreboardWithGame(
    payload: CreateBoerenbridgeScoreboardWithGamePayload,
) {
    const user = await getDatabaseUser();

    const created = await prisma.$transaction(async (transaction) => {
        const scoreboardId = randomUUID();
        const gameId = randomUUID();

        const scoreboard = await transaction.scoreboard.create({
            data: {
                id: scoreboardId,
                user_id: user.id,
                created_at: new Date(),
                updated_at: new Date(),
                game_type: GAME_TYPE.BOERENBRIDGE,
                scoreboard_name: payload.scoreboardName,
            },
        });

        await transaction.boerenbridge_game.create({
            data: {
                id: gameId,
                scoreboard_id: scoreboardId,
                created_at: new Date(),
                updated_at: new Date(),
                current_round: 1,
                points_per_correct_guess: payload.pointsPerCorrectGuess,
            },
        });

        await transaction.boerenbridge_player.createMany({
            data: payload.players.map((player) => ({
                id: randomUUID(),
                game_id: gameId,
                created_at: new Date(),
                updated_at: new Date(),
                name: player.name,
            })),
        });

        return scoreboard;
    });

    return created;
}

export async function getScoreboardsForUser() {
    const user = await getDatabaseUser();

    const scoreboards = await prisma.scoreboard.findMany({
        where: { user_id: user.id },
    });

    return scoreboards;
}

export async function getScoreboardById(id: UUID) {
    const user = await getDatabaseUser();

    const scoreboard = await prisma.scoreboard.findFirst({
        where: { id, user_id: user.id },
    });

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
}
