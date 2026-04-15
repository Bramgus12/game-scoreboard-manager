import { UUID } from "crypto";

export type AppMahjongPlayerTotal = {
    playerId: UUID;
    playerName: string;
    total: number;
};

export type AppMahjongHandSettlement = {
    handNumber: number;
    deltasByPlayerId: Record<string, number>;
};
