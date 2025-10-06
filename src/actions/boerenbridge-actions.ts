import { UUID } from "crypto";
import { domainToAppBoerenbridgePlayerArray } from "@/mappers/boerenbridge-player";
import { domainToAppBoerenbridgeGame } from "@/mappers/boerenbridge-game";
import { PrismaClient } from "../../prisma/generated/prisma";

const prisma = new PrismaClient();

export async function getBoerenbridgeGame(scoreboardId: UUID) {
    const game = await prisma.boerenbridge_game.findFirst({
        where: {
            scoreboard_id: scoreboardId,
        },
    });

    await prisma.$disconnect();

    if (game == null) {
        throw new Error("No game found");
    }

    return domainToAppBoerenbridgeGame(game);
}

export async function getPlayers(gameId: UUID) {
    const players = await prisma.boerenbridge_player.findMany({
        where: {
            game_id: gameId,
        },
        include: {
            boerenbridge_round: true,
        },
    });

    await prisma.$disconnect();

    return domainToAppBoerenbridgePlayerArray(players);
}
