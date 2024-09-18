import { DomainScoreboard } from "../models/domain/Scoreboard";
import { AppScoreboard } from "../models/app/Scoreboard";

export function DomainToAppScoreboard(domainModel: DomainScoreboard): AppScoreboard {
    return {
        id: domainModel.id,
        scoreboardName: domainModel.scoreboardName,
        gameType: domainModel.gameType,
        user: domainModel.user,
        createdAt: new Date(domainModel.createdAt),
        updatedAt: new Date(domainModel.updatedAt),
    };
}

export function DomainToAppScoreboardArray(domainModels: Array<DomainScoreboard>): Array<AppScoreboard> {
    return domainModels.map(DomainToAppScoreboard);
}
