import { UUID } from "crypto";
import { DomainBaseModel } from "@/models/domain/BaseModel";
import { DomainBoerenbridgeRound } from "../boerenbridgeRound/boerenbridgeRound";

export type DomainBoerenbridgePlayer = DomainBaseModel & {
    name: string;
    game: UUID;
    rounds: Array<DomainBoerenbridgeRound>;
};
