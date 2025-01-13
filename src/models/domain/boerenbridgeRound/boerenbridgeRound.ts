import { DomainBaseModel } from "@/models/domain/BaseModel";
import { UUID } from "crypto";

export type DomainBoerenbridgeRound = DomainBaseModel & {
    roundNumber: number;
    guess: number;
    isCorrect: boolean;
    penaltyPoints?: number;
    player: UUID;
};
