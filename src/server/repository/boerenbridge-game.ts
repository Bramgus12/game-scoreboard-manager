import { UUID } from "crypto";
import { getDatabaseUser } from "@/server/repository/user";
import prisma from "@/utils/prisma";

export async function getBoerenbridgeGameForScoreboard(scoreboardId: UUID) {
    const user = await getDatabaseUser();

    const game = await prisma.boerenbridge_game.findFirst({
        where: {
            scoreboard_id: scoreboardId,
            scoreboard: {
                user_id: user.id,
            },
        },
    });

    return game;
}

export async function setCurrentRoundForScoreboard(
    scoreboardId: UUID,
    roundNumber: number,
) {
    const user = await getDatabaseUser();

    const updatedGame = await prisma.boerenbridge_game.updateMany({
        where: {
            scoreboard_id: scoreboardId,
            scoreboard: {
                user_id: user.id,
            },
        },
        data: {
            current_round: roundNumber,
            updated_at: new Date(),
        },
    });

    if (updatedGame.count === 0) {
        throw new Error("Boerenbridge game not found");
    }
}
