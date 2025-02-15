import { DomainKlaverjasRound } from "@/models/domain/klaverjasRound/KlaverjasRound";
import { AppKlaverjasRound } from "@/models/app/klaverjasRound/KlaverjasRound";
import { UUID } from "crypto";

export function domainToAppKlaverjasRound(
    domainModel: DomainKlaverjasRound,
): AppKlaverjasRound {
    return {
        id: domainModel.id as UUID,
        roundNumber: domainModel.round_number,
        isPit: domainModel.is_pit,
        isWet: domainModel.is_wet,
        points: domainModel.points,
        fame: domainModel.fame,
        isGoing: domainModel.is_going,
        klaverjasTeam: domainModel.klaverjas_team_id as UUID,
        createdAt: domainModel.created_at,
        updatedAt: domainModel.updated_at,
    };
}

export function domainToAppKlaverjasRoundArray(
    domainModels: DomainKlaverjasRound[],
): AppKlaverjasRound[] {
    return domainModels.map(domainToAppKlaverjasRound);
}
