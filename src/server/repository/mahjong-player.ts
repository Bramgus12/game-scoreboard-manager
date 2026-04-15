import { UUID } from "crypto";
import { getDatabaseUser } from "@/server/repository/user";
import prisma from "@/utils/prisma";
import { domainToAppMahjongPlayerArray } from "@/mappers/mahjong-player";

export async function getMahjongPlayersForScoreboard(scoreboardId: UUID) {
    const user = await getDatabaseUser();

    const players = await prisma.mahjong_player.findMany({
        where: {
            mahjong_game: {
                scoreboard_id: scoreboardId,
                scoreboard: {
                    user_id: user.id,
                },
            },
        },
        orderBy: {
            seat_index: "asc",
        },
    });

    return domainToAppMahjongPlayerArray(players);
}
