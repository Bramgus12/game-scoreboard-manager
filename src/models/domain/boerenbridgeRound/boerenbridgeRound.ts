import { DomainBaseModel } from "@/models/domain/BaseModel";

export type DomainBoerenbridgeRound = DomainBaseModel & {
    round_number: number;
    guess: number;
    is_correct: boolean;
    penalty_points?: number;
};
