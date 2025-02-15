import { DomainKlaverjasTeam } from "@/models/domain/klaverjasTeam/KlaverjasTeam";
import { AppKlaverjasTeam } from "@/models/app/klaverjasTeam/KlaverjasTeam";
import { UUID } from "crypto";
import { AppTeamType } from "@/models/app/klaverjasTeam/TeamType";

export function domainToAppKlaverjasTeam(
    domainModel: DomainKlaverjasTeam,
): AppKlaverjasTeam {
    return {
        type: domainModel.type as AppTeamType,
        name: domainModel.name,
        id: domainModel.id as UUID,
        scoreboard: domainModel.scoreboard_id as UUID,
        createdAt: domainModel.created_at,
        updatedAt: domainModel.updated_at,
    };
}

export function domainToAppKlaverjasTeamArray(
    domainModels: DomainKlaverjasTeam[],
): AppKlaverjasTeam[] {
    return domainModels.map(domainToAppKlaverjasTeam);
}
