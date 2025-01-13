import { UUID } from "crypto";

export type AppUpdateBoerenbridgeGame = {
    pointsPerCorrectGuess: number;
    currentRound: number;
    id: UUID;
};
