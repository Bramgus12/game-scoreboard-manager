import { DomainBoerenbridgePlayer } from "@/models/domain/boerenbridge-player/boerenbridge-player";
import { AppBoerenbridgePlayer } from "@/models/app/boerenbridge-player/boerenbridge-player";
import { domainToAppBoerenbridgeRoundArray } from "@/mappers/boerenbridge-round";
import { UUID } from "crypto";

export function domainToAppBoerenbridgePlayer(
    domainModel: DomainBoerenbridgePlayer,
): AppBoerenbridgePlayer {
    return {
        id: domainModel.id as UUID,
        name: domainModel.name,
        game: domainModel.game_id as UUID,
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
