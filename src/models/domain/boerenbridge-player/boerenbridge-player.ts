import { DomainBaseModel } from "@/models/domain/base-model";
import { DomainBoerenbridgeRound } from "@/models/domain/boerenbridge-round/boerenbridge-round";

export type DomainBoerenbridgePlayer = DomainBaseModel & {
    name: string;
    game_id: string;
    boerenbridge_round: Array<DomainBoerenbridgeRound>;
};
