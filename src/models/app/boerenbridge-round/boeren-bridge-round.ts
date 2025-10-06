import { AppBaseModel } from "@/models/app/base-model";

export type AppBoerenbridgeRound = AppBaseModel & {
    roundNumber: number;
    guess: number;
    isCorrect: boolean;
    penaltyPoints?: number;
};
