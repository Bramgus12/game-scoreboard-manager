import { UUID } from "crypto";
import { getDatabaseUser } from "@/server/repository/user";
import prisma from "@/utils/prisma";
import { randomUUID } from "node:crypto";
import { AppMahjongWind } from "@/models/app/mahjong/wind";
import { AppMahjongWinType } from "@/models/app/mahjong/win-type";
import { domainToAppMahjongHandArray } from "@/mappers/mahjong-hand";

type CreateMahjongHandEntry = {
    scoreboardId: UUID;
    handNumber: number;
    prevailingWind: AppMahjongWind;
    winType: AppMahjongWinType;
    winnerPlayerId: UUID | null;
    discardedByPlayerId: UUID | null;
    winnerPoints: number;
    isLimitHand: boolean;
};

export async function getMahjongHandsForScoreboard(scoreboardId: UUID) {
    const user = await getDatabaseUser();

    const hands = await prisma.mahjong_hand.findMany({
        where: {
            mahjong_game: {
                scoreboard_id: scoreboardId,
                scoreboard: {
                    user_id: user.id,
                },
            },
        },
        orderBy: {
            hand_number: "asc",
        },
    });

    return domainToAppMahjongHandArray(hands);
}

export async function createMahjongHand(entry: CreateMahjongHandEntry) {
    const user = await getDatabaseUser();

    const game = await prisma.mahjong_game.findFirst({
        where: {
            scoreboard_id: entry.scoreboardId,
            scoreboard: {
                user_id: user.id,
            },
        },
    });

    if (game == null) {
        throw new Error("Mahjong game not found");
    }

    await prisma.mahjong_hand.create({
        data: {
            id: randomUUID(),
            created_at: new Date(),
            updated_at: new Date(),
            game_id: game.id,
            hand_number: entry.handNumber,
            prevailing_wind: entry.prevailingWind,
            win_type: entry.winType,
            winner_player_id: entry.winnerPlayerId,
            discarded_by_player_id: entry.discardedByPlayerId,
            winner_points: entry.winnerPoints,
            is_limit_hand: entry.isLimitHand,
        },
    });
}
