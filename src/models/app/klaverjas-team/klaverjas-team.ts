import { AppBaseModel } from "../base-model";
import { AppTeamType } from "./team-type";
import { UUID } from "crypto";

export type AppKlaverjasTeam = AppBaseModel & {
    name: string;
    type: AppTeamType;
    scoreboard: UUID;
};
