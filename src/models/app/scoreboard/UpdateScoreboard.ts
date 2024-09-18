import { AppGameType } from "./GameType";
import { UUID } from "crypto";

export type AppUpdateScoreboard = {
    id: UUID;
    scoreboardName: string;
    gameType: AppGameType;
};
