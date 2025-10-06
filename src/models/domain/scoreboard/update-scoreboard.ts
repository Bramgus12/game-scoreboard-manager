import { UUID } from "crypto";
import { DomainGameType } from "./game-type";

export type DomainUpdateScoreboard = {
    id: UUID;
    scoreboardName: string;
    gameType: DomainGameType;
};
