import { UUID } from "crypto";
import { randomUUID } from "node:crypto";
import { AppCreateBoerenbridgePlayer } from "@/models/app/boerenbridge-player/create-boerenbridge-player";
import { domainToAppBoerenbridgePlayerArray } from "@/mappers/boerenbridge-player";
import { getDatabaseUser } from "@/server/repository/user";
import prisma from "@/utils/prisma";

export async function createPlayersForGame(
    gameId: UUID,
    players: Array<AppCreateBoerenbridgePlayer>,
) {
    if (players.length < 1) {
        throw new Error("At least one player is required");
    }

    if (players.length > 52) {
        throw new Error("A maximum of 52 players is allowed");
    }

    const user = await getDatabaseUser();

    const game = await prisma.boerenbridge_game.findFirst({
        where: {
            id: gameId,
            scoreboard: {
                user_id: user.id,
            },
        },
    });

    if (game == null) {
        throw new Error("Boerenbridge game not found");
    }

    const result = await prisma.boerenbridge_player.createMany({
        data: players.map((player) => ({
            id: randomUUID(),
            created_at: new Date(),
            updated_at: new Date(),
            game_id: gameId,
            name: player.name,
        })),
    });

    if (result.count !== players.length) {
        throw new Error("Failed to create all players");
    }
}

export async function getPlayersForScoreboard(scoreboardId: UUID) {
    const user = await getDatabaseUser();

    const players = await prisma.boerenbridge_player.findMany({
        where: {
            boerenbridge_game: {
                scoreboard_id: scoreboardId,
                scoreboard: {
                    user_id: user.id,
                },
            },
        },
        include: {
            boerenbridge_round: true,
        },
        orderBy: {
            created_at: "asc",
        },
    });

    return domainToAppBoerenbridgePlayerArray(players);
}
