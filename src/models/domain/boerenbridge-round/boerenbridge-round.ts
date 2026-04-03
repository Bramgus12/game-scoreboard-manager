import { DomainBaseModel } from "@/models/domain/base-model";

export type DomainBoerenbridgeRound = DomainBaseModel & {
    round_number: number;
    guess: number;
    penalty_points: number;
};
