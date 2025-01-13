import { UUID } from "crypto";

export type DomainUpdateBoerenbridgeRound = {
    id: UUID;
    roundNumber: number;
    guess: number;
    isCorrect: boolean;
    penaltyPoints?: number;
};
