import { DomainBoerenbridgeRound } from "@/models/domain/boerenbridge-round/boerenbridge-round";
import { AppBoerenbridgeRound } from "@/models/app/boerenbridge-round/boeren-bridge-round";
import { UUID } from "crypto";

export function domainToAppBoerenbridgeRound(
    domain: DomainBoerenbridgeRound,
): AppBoerenbridgeRound {
    return {
        id: domain.id as UUID,
        guess: domain.guess,
        isCorrect: domain.is_correct,
        roundNumber: domain.round_number,
        penaltyPoints: domain.penalty_points,
        createdAt: domain.created_at,
        updatedAt: domain.updated_at,
    };
}

export function domainToAppBoerenbridgeRoundArray(
    domainModels: Array<DomainBoerenbridgeRound>,
): Array<AppBoerenbridgeRound> {
    return domainModels.map(domainToAppBoerenbridgeRound);
}
