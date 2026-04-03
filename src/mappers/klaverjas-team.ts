import { DomainKlaverjasTeam } from "@/models/domain/klaverjas-team/klaverjas-team";
import { AppKlaverjasTeam } from "@/models/app/klaverjas-team/klaverjas-team";
import { parseAppTeamType } from "@/lib/team-type";
import { parseUuid } from "@/lib/uuid";

export function domainToAppKlaverjasTeam(
    domainModel: DomainKlaverjasTeam,
): AppKlaverjasTeam {
    return {
        type: parseAppTeamType(domainModel.type),
        name: domainModel.name,
        id: parseUuid(domainModel.id),
        scoreboard: parseUuid(domainModel.scoreboard_id),
        createdAt: domainModel.created_at,
        updatedAt: domainModel.updated_at,
    };
}

export function domainToAppKlaverjasTeamArray(
    domainModels: DomainKlaverjasTeam[],
): AppKlaverjasTeam[] {
    return domainModels.map(domainToAppKlaverjasTeam);
}
