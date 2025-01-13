import { DomainScoreboard } from "@/models/domain/scoreboard/Scoreboard";
import { AppScoreboard } from "@/models/app/scoreboard/Scoreboard";

export function domainToAppScoreboard(domainModel: DomainScoreboard): AppScoreboard {
    return {
        id: domainModel.id,
        scoreboardName: domainModel.scoreboardName,
        gameType: domainModel.gameType,
        user: domainModel.user,
        createdAt: new Date(domainModel.createdAt),
        updatedAt: new Date(domainModel.updatedAt),
    };
}

export function domainToAppScoreboardArray(
    domainModels: Array<DomainScoreboard>,
): Array<AppScoreboard> {
    return domainModels.map(domainToAppScoreboard);
}
