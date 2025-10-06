import { DomainBaseModel } from "../base-model";

export type DomainKlaverjasTeam = DomainBaseModel & {
    name: string;
    type: string;
    scoreboard_id: string;
};
