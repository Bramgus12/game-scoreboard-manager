import { UUID } from "crypto";

export type AppBoerenbridgeTotal = {
    playerId: UUID;
    playerName: string;
    total: number;
    rank: number;
};
