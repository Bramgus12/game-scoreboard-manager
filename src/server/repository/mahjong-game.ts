import { UUID } from "crypto";
import { getDatabaseUser } from "@/server/repository/user";
import prisma from "@/utils/prisma";
import { domainToAppMahjongGame } from "@/mappers/mahjong-game";

export async function getMahjongGameForScoreboard(scoreboardId: UUID) {
    const user = await getDatabaseUser();

    const game = await prisma.mahjong_game.findFirst({
        where: {
            scoreboard_id: scoreboardId,
            scoreboard: {
                user_id: user.id,
            },
        },
    });

    if (game == null) {
        return null;
    }

    return domainToAppMahjongGame(game);
}
