import { UUID } from "crypto";

export type AppBoerenbridgeRoundRowEntry = {
    playerId: UUID;
    expectedWins: number;
    actualWins: number;
};

export type AppBoerenbridgeRoundRow = {
    roundNumber: number;
    entries: Array<AppBoerenbridgeRoundRowEntry>;
};
