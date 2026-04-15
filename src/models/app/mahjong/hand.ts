import { AppBaseModel } from "@/models/app/base-model";
import { AppMahjongWind } from "@/models/app/mahjong/wind";
import { AppMahjongWinType } from "@/models/app/mahjong/win-type";
import { UUID } from "crypto";

export type AppMahjongHand = AppBaseModel & {
    gameId: UUID;
    handNumber: number;
    prevailingWind: AppMahjongWind;
    winType: AppMahjongWinType;
    winnerPlayerId: UUID | null;
    discardedByPlayerId: UUID | null;
    winnerPoints: number;
    isLimitHand: boolean;
};
