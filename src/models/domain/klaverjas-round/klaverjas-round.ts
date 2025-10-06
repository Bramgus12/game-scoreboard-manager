import { DomainBaseModel } from "../base-model";

export type DomainKlaverjasRound = DomainBaseModel & {
    round_number: number;
    points: number;
    fame: number;
    is_pit: boolean;
    is_wet: boolean;
    is_going: boolean;
    klaverjas_team_id: string;
};
