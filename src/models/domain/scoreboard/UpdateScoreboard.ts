import { UUID } from "crypto";
import { DomainGameType } from "./GameType";

export type DomainUpdateScoreboard = {
    id: UUID;
    scoreboardName: string;
    gameType: DomainGameType;
};
