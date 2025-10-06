import { DomainScoreboard } from "@/models/domain/scoreboard/scoreboard";
import { AppScoreboard } from "@/models/app/scoreboard/scoreboard";
import { UUID } from "crypto";
import { AppGameType } from "@/models/app/scoreboard/game-type";

export function domainToAppScoreboard(domainModel: DomainScoreboard): AppScoreboard {
    return {
        id: domainModel.id as UUID,
        scoreboardName: domainModel.scoreboard_name,
        gameType: domainModel.game_type as AppGameType,
        user: domainModel.user_id as UUID,
        createdAt: domainModel.created_at,
        updatedAt: domainModel.updated_at,
    };
}

export function domainToAppScoreboardArray(
    domainModels: Array<DomainScoreboard>,
): Array<AppScoreboard> {
    return domainModels.map(domainToAppScoreboard);
}
