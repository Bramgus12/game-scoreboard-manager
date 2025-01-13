import { UUID } from "crypto";

export type DomainUpdateBoerenbridgeGame = {
    pointsPerCorrectGuess: number;
    currentRound: number;
    id: UUID;
};
