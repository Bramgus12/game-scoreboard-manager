import { UUID } from "crypto";
import { AppGameType } from "./GameType";
import { AppBaseModel } from "../BaseModel";

export type AppScoreboard = AppBaseModel & {
    scoreboardName: string;
    user: UUID;
    gameType: AppGameType;
};
