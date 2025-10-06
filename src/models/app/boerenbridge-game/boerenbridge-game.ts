import { AppBaseModel } from "@/models/app/base-model";

export type AppBoerenbridgeGame = AppBaseModel & {
    pointsPerCorrectGuess: number;
    currentRound: number;
};
