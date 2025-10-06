import { DomainKlaverjasTeam } from "@/models/domain/klaverjas-team/klaverjas-team";
import { AppKlaverjasTeam } from "@/models/app/klaverjas-team/klaverjas-team";
import { UUID } from "crypto";
import { AppTeamType } from "@/models/app/klaverjas-team/team-type";

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
