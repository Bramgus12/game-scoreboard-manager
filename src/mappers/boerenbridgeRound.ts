import { DomainBoerenbridgeRound } from "@/models/domain/boerenbridgeRound/boerenbridgeRound";
import { AppBoerenbridgeRound } from "@/models/app/boerenbridgeRound/boerenbridgeRound";

export function domainToAppBoerenbridgeRound(
    domain: DomainBoerenbridgeRound,
): AppBoerenbridgeRound {
    return {
        id: domain.id,
        guess: domain.guess,
        isCorrect: domain.isCorrect,
        roundNumber: domain.roundNumber,
        player: domain.player,
        penaltyPoints: domain.penaltyPoints,
        createdAt: new Date(domain.createdAt),
        updatedAt: new Date(domain.updatedAt),
    };
}

export function domainToAppBoerenbridgeRoundArray(
    domainModels: Array<DomainBoerenbridgeRound>,
): Array<AppBoerenbridgeRound> {
    return domainModels.map(domainToAppBoerenbridgeRound);
}
