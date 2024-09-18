import { UUID } from "crypto";
import { DomainTeamType } from "./TeamType";

export type DomainUpdateKlaverjasTeam = {
    name: string;
    type: DomainTeamType;
    id: UUID;
};
