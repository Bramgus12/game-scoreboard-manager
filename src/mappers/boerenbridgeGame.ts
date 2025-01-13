import { DomainBoerenbridgeGame } from "@/models/domain/boerenbridgeGame/boerenbridgeGame";
import { AppBoerenbridgeGame } from "@/models/app/boerenbridgeGame/boerenbridgeGame";

export function domainToAppBoerenbridgeGame(
    domainModel: DomainBoerenbridgeGame,
): AppBoerenbridgeGame {
    return {
        id: domainModel.id,
        pointsPerCorrectGuess: domainModel.pointsPerCorrectGuess,
        currentRound: domainModel.currentRound,
        createdAt: new Date(domainModel.createdAt),
        updatedAt: new Date(domainModel.updatedAt),
    };
}
