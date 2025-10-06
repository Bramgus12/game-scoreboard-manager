import { DomainBaseModel } from "../base-model";

export type DomainScoreboard = DomainBaseModel & {
    scoreboard_name: string;
    user_id: string;
    game_type: string;
};
