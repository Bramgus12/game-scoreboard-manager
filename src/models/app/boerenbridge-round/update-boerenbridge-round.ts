import { UUID } from "crypto";

export type AppUpdateBoerenbridgeRound = {
    id: UUID;
    roundNumber: number;
    guess: number;
    isCorrect: boolean;
    penaltyPoints?: number;
};
