import { AppMahjongWind } from "@/models/app/mahjong/wind";

export type AppMahjongHandState = {
    nextHandNumber: number;
    prevailingWind: AppMahjongWind;
    isFinished: boolean;
    currentWindsByPlayerId: Record<string, AppMahjongWind>;
};
