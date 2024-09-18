import { DomainBaseModel } from "../BaseModel";
import { DomainTeamType } from "./TeamType";
import { UUID } from "crypto";

export type DomainKlaverjasTeam = DomainBaseModel & {
    name: string;
    type: DomainTeamType;
    scoreboard: UUID;
};
