import { UUID } from "crypto";
import { AppGameType } from "./game-type";
import { AppBaseModel } from "../base-model";

export type AppScoreboard = AppBaseModel & {
    scoreboardName: string;
    user: UUID;
    gameType: AppGameType;
};
