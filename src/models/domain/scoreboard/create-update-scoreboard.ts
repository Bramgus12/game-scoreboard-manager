import { DomainGameType } from "./game-type";

export type DomainCreateScoreboard = {
    scoreboardName: string;
    gameType: DomainGameType;
};
