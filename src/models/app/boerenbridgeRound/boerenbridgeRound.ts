import { AppBaseModel } from "@/models/app/BaseModel";
import { UUID } from "crypto";

export type AppBoerenbridgeRound = AppBaseModel & {
    roundNumber: number;
    guess: number;
    isCorrect: boolean;
    penaltyPoints?: number;
    player: UUID;
};
