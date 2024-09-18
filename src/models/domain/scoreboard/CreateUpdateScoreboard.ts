import { DomainGameType } from "./GameType";

export type DomainCreateScoreboard = {
    scoreboardName: string;
    gameType: DomainGameType;
};
