import { parseUuid } from "@/lib/uuid";
import { DomainMahjongGame } from "@/models/domain/mahjong/game";
import { AppMahjongGame } from "@/models/app/mahjong/game";
import { parseAppMahjongRuleProfile } from "@/lib/mahjong";

export function domainToAppMahjongGame(domain: DomainMahjongGame): AppMahjongGame {
    return {
        id: parseUuid(domain.id),
        createdAt: domain.created_at,
        updatedAt: domain.updated_at,
        handLimit: domain.hand_limit,
        pointsLimit: domain.points_limit,
        ruleProfile: parseAppMahjongRuleProfile(domain.rule_profile),
    };
}
