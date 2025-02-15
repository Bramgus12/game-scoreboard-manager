import { DomainBaseModel } from "@/models/domain/BaseModel";
import { DomainBoerenbridgeRound } from "../boerenbridgeRound/boerenbridgeRound";

export type DomainBoerenbridgePlayer = DomainBaseModel & {
    name: string;
    game_id: string;
    boerenbridge_round: Array<DomainBoerenbridgeRound>;
};
