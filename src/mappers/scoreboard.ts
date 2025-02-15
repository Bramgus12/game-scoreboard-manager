import { DomainScoreboard } from "@/models/domain/scoreboard/Scoreboard";
import { AppScoreboard } from "@/models/app/scoreboard/Scoreboard";
import { UUID } from "crypto";
import { AppGameType } from "@/models/app/scoreboard/GameType";

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
