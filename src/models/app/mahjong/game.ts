import { AppBaseModel } from "@/models/app/base-model";
import { AppMahjongRuleProfile } from "@/models/app/mahjong/rule-profile";

export type AppMahjongGame = AppBaseModel & {
    pointsLimit: number;
    handLimit: number;
    ruleProfile: AppMahjongRuleProfile;
};
