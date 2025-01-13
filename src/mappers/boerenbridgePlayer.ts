import { DomainBoerenbridgePlayer } from "@/models/domain/boerenbridgePlayer/boerenbridgePlayer";
import { AppBoerenbridgePlayer } from "@/models/app/boerenbridgePlayer/boerenbridgePlayer";
import { domainToAppBoerenbridgeRoundArray } from "@/mappers/boerenbridgeRound";

export function domainToAppBoerenbridgePlayer(
    domainModel: DomainBoerenbridgePlayer,
): AppBoerenbridgePlayer {
    return {
        id: domainModel.id,
        name: domainModel.name,
        game: domainModel.game,
        createdAt: new Date(domainModel.createdAt),
        updatedAt: new Date(domainModel.updatedAt),
        rounds: domainToAppBoerenbridgeRoundArray(domainModel.rounds),
    };
}

export function domainToAppBoerenbridgePlayerArray(
    domainModels: DomainBoerenbridgePlayer[],
): AppBoerenbridgePlayer[] {
    return domainModels.map(domainToAppBoerenbridgePlayer);
}
