import { DomainKlaverjasTeam } from "../models/domain/klaverjasTeam/KlaverjasTeam";
import { AppKlaverjasTeam } from "../models/app/klaverjasTeam/KlaverjasTeam";

export function DomainToAppKlaverjasTeam(domainModel: DomainKlaverjasTeam): AppKlaverjasTeam {
    return {
        type: domainModel.type,
        name: domainModel.name,
        id: domainModel.id,
        scoreboard: domainModel.scoreboard,
        createdAt: new Date(domainModel.createdAt),
        updatedAt: new Date(domainModel.updatedAt),
    };
}

export function DomainToAppKlaverjasTeamArray(domainModels: DomainKlaverjasTeam[]): AppKlaverjasTeam[] {
    return domainModels.map(DomainToAppKlaverjasTeam);
}
