import { UUID } from "crypto";
import { PrismaClient } from "@prisma/client";
import { domainToAppBoerenbridgePlayerArray } from "@/mappers/boerenbridgePlayer";
import { domainToAppBoerenbridgeGame } from "@/mappers/boerenbridgeGame";

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

export async function getPlayers(scoreboardId: UUID, gameId: UUID) {
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
