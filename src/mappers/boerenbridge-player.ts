import { DomainBoerenbridgePlayer } from "@/models/domain/boerenbridge-player/boerenbridge-player";
import { AppBoerenbridgePlayer } from "@/models/app/boerenbridge-player/boerenbridge-player";
import { domainToAppBoerenbridgeRoundArray } from "@/mappers/boerenbridge-round";
import { parseUuid } from "@/lib/uuid";

export function domainToAppBoerenbridgePlayer(
    domainModel: DomainBoerenbridgePlayer,
): AppBoerenbridgePlayer {
    return {
        id: parseUuid(domainModel.id),
        name: domainModel.name,
        game: parseUuid(domainModel.game_id),
        createdAt: domainModel.created_at,
        updatedAt: domainModel.updated_at,
        rounds: domainToAppBoerenbridgeRoundArray(domainModel.boerenbridge_round),
    };
}

export function domainToAppBoerenbridgePlayerArray(
    domainModels: DomainBoerenbridgePlayer[],
): AppBoerenbridgePlayer[] {
    return domainModels.map(domainToAppBoerenbridgePlayer);
}
