import { UUID } from "crypto";
import { DomainTeamType } from "./team-type";

export type DomainUpdateKlaverjasTeam = {
    name: string;
    type: DomainTeamType;
    id: UUID;
};
