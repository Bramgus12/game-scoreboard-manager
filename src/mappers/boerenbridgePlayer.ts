import { DomainBoerenbridgePlayer } from "@/models/domain/boerenbridgePlayer/boerenbridgePlayer";
import { AppBoerenbridgePlayer } from "@/models/app/boerenbridgePlayer/boerenbridgePlayer";
import { domainToAppBoerenbridgeRoundArray } from "@/mappers/boerenbridgeRound";
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
