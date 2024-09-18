import { UUID } from "crypto";
import { DomainGameType } from "./GameType";
import { DomainBaseModel } from "../BaseModel";

export type DomainScoreboard = DomainBaseModel & {
    scoreboardName: string;
    user: UUID;
    gameType: DomainGameType;
};
