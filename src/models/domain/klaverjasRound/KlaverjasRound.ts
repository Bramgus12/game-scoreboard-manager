import { DomainBaseModel } from "../BaseModel";
import { UUID } from "crypto";

export type DomainKlaverjasRound = DomainBaseModel & {
    roundNumber: number;
    points: number;
    fame: number;
    isPit: boolean;
    isWet: boolean;
    isGoing: boolean;
    klaverjasTeam: UUID;
};
