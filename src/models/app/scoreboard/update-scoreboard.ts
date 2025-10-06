import { AppGameType } from "./game-type";
import { UUID } from "crypto";

export type AppUpdateScoreboard = {
    id: UUID;
    scoreboardName: string;
    gameType: AppGameType;
};
