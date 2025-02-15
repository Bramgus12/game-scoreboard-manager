import { AppBaseModel } from "@/models/app/BaseModel";

export type AppBoerenbridgeRound = AppBaseModel & {
    roundNumber: number;
    guess: number;
    isCorrect: boolean;
    penaltyPoints?: number;
};
