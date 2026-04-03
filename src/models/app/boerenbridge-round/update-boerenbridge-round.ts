import { UUID } from "crypto";

export type AppUpdateBoerenbridgeRound = {
    id: UUID;
    roundNumber: number;
    expectedWins: number;
    actualWins: number;
};
