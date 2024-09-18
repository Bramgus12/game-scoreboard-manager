import { AppBaseModel } from "../BaseModel";
import { UUID } from "crypto";

export type AppKlaverjasRound = AppBaseModel & {
    roundNumber: number;
    points: number;
    fame: number;
    isPit: boolean;
    isWet: boolean;
    klaverjasTeam: UUID;
};
