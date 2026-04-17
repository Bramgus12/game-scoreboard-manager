import { parseUuid } from "@/lib/uuid";
import { DomainMahjongHand } from "@/models/domain/mahjong/hand";
import { AppMahjongHand } from "@/models/app/mahjong/hand";
import { parseAppMahjongWind, parseAppMahjongWinType } from "@/lib/mahjong";

export function domainToAppMahjongHand(domain: DomainMahjongHand): AppMahjongHand {
    return {
        id: parseUuid(domain.id),
        createdAt: domain.created_at,
        updatedAt: domain.updated_at,
        gameId: parseUuid(domain.game_id),
        handNumber: domain.hand_number,
        prevailingWind: parseAppMahjongWind(domain.prevailing_wind),
        winType: parseAppMahjongWinType(domain.win_type),
        winnerPlayerId:
            domain.winner_player_id == null
                ? null
                : parseUuid(domain.winner_player_id),
        discardedByPlayerId:
            domain.discarded_by_player_id == null
                ? null
                : parseUuid(domain.discarded_by_player_id),
        winnerPoints: domain.winner_points,
        isLimitHand: domain.is_limit_hand,
    };
}

export function domainToAppMahjongHandArray(
    domains: Array<DomainMahjongHand>,
): Array<AppMahjongHand> {
    return domains.map(domainToAppMahjongHand);
}
