import { DomainBaseModel } from "@/models/domain/BaseModel";

export type DomainBoerenbridgeGame = DomainBaseModel & {
    points_per_correct_guess: number;
    current_round: number;
};
