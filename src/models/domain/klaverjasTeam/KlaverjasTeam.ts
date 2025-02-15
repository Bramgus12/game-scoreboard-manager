import { DomainBaseModel } from "../BaseModel";

export type DomainKlaverjasTeam = DomainBaseModel & {
    name: string;
    type: string;
    scoreboard_id: string;
};
