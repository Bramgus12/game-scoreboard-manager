import { DomainKlaverjasRound } from "@/models/domain/klaverjasRound/KlaverjasRound";
import { AppKlaverjasRound } from "@/models/app/klaverjasRound/KlaverjasRound";

export function domainToAppKlaverjasRound(
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

export function domainToAppKlaverjasRoundArray(
    domainModels: DomainKlaverjasRound[],
): AppKlaverjasRound[] {
    return domainModels.map(domainToAppKlaverjasRound);
}
