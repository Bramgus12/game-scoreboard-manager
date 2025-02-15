import { DomainBoerenbridgeGame } from "@/models/domain/boerenbridgeGame/boerenbridgeGame";
import { AppBoerenbridgeGame } from "@/models/app/boerenbridgeGame/boerenbridgeGame";
import { UUID } from "crypto";

export function domainToAppBoerenbridgeGame(
    domainModel: DomainBoerenbridgeGame,
): AppBoerenbridgeGame {
    return {
        id: domainModel.id as UUID,
        pointsPerCorrectGuess: domainModel.points_per_correct_guess,
        currentRound: domainModel.current_round,
        createdAt: domainModel.created_at,
        updatedAt: domainModel.updated_at,
    };
}
