import { parseUuid } from "@/lib/uuid";
import { DomainMahjongPlayer } from "@/models/domain/mahjong/player";
import { AppMahjongPlayer } from "@/models/app/mahjong/player";

export function domainToAppMahjongPlayer(
    domain: DomainMahjongPlayer,
): AppMahjongPlayer {
    return {
        id: parseUuid(domain.id),
        createdAt: domain.created_at,
        updatedAt: domain.updated_at,
        gameId: parseUuid(domain.game_id),
        name: domain.name,
        seatIndex: domain.seat_index,
    };
}

export function domainToAppMahjongPlayerArray(
    domains: Array<DomainMahjongPlayer>,
): Array<AppMahjongPlayer> {
    return domains.map(domainToAppMahjongPlayer);
}
