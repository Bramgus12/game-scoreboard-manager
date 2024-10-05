import { AppKlaverjasRound } from "models/app/klaverjasRound/KlaverjasRound";
import { DomainKlaverjasRound } from "models/domain/klaverjasRound/KlaverjasRound";

export function DomainToAppKlaverjasRound(
    domainModel: DomainKlaverjasRound,
): AppKlaverjasRound {
    return {
        id: domainModel.id,
        roundNumber: domainModel.roundNumber,
        isPit: domainModel.isPit,
        isWet: domainModel.isWet,
        points: domainModel.points,
        fame: domainModel.fame,
        isGoing: domainModel.isGoing,
        klaverjasTeam: domainModel.klaverjasTeam,
        createdAt: new Date(domainModel.createdAt),
        updatedAt: new Date(domainModel.updatedAt),
    };
}

export function DomainToAppKlaverjasRoundArray(
    domainModels: DomainKlaverjasRound[],
): AppKlaverjasRound[] {
    return domainModels.map(DomainToAppKlaverjasRound);
}
