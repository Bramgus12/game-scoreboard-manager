import { DomainScoreboard } from "@/models/domain/scoreboard/scoreboard";
import { AppScoreboard } from "@/models/app/scoreboard/scoreboard";
import { parseAppGameType } from "@/lib/game-type";
import { parseUuid } from "@/lib/uuid";

export function domainToAppScoreboard(domainModel: DomainScoreboard): AppScoreboard {
    return {
        id: parseUuid(domainModel.id),
        scoreboardName: domainModel.scoreboard_name,
        gameType: parseAppGameType(domainModel.game_type),
        user: parseUuid(domainModel.user_id),
        createdAt: domainModel.created_at,
        updatedAt: domainModel.updated_at,
    };
}

export function domainToAppScoreboardArray(
    domainModels: Array<DomainScoreboard>,
): Array<AppScoreboard> {
    return domainModels.map(domainToAppScoreboard);
}
