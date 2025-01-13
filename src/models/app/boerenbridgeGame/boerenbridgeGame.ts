import { AppBaseModel } from "@/models/app/BaseModel";

export type AppBoerenbridgeGame = AppBaseModel & {
    pointsPerCorrectGuess: number;
    currentRound: number;
};
