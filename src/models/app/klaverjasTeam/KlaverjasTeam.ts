import { AppBaseModel } from "../BaseModel";
import { AppTeamType } from "./TeamType";
import { UUID } from "crypto";

export type AppKlaverjasTeam = AppBaseModel & {
    name: string;
    type: AppTeamType;
    scoreboard: UUID;
};
