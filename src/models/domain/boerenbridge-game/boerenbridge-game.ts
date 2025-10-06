import { DomainBaseModel } from "@/models/domain/base-model";

export type DomainBoerenbridgeGame = DomainBaseModel & {
    points_per_correct_guess: number;
    current_round: number;
};
