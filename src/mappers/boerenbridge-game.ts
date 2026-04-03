import { DomainBoerenbridgeGame } from "@/models/domain/boerenbridge-game/boerenbridge-game";
import { AppBoerenbridgeGame } from "@/models/app/boerenbridge-game/boerenbridge-game";
import { parseUuid } from "@/lib/uuid";

export function domainToAppBoerenbridgeGame(
    domainModel: DomainBoerenbridgeGame,
): AppBoerenbridgeGame {
    return {
        id: parseUuid(domainModel.id),
        pointsPerCorrectGuess: domainModel.points_per_correct_guess,
        currentRound: domainModel.current_round,
        createdAt: domainModel.created_at,
        updatedAt: domainModel.updated_at,
    };
}
