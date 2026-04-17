import { DomainBaseModel } from "@/models/domain/base-model";

export type DomainMahjongGame = DomainBaseModel & {
    scoreboard_id: string;
    points_limit: number;
    hand_limit: number;
    rule_profile: string;
};
