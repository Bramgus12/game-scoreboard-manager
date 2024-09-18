import { UUID } from "crypto";
import { AppTeamType } from "./TeamType";

export type AppUpdateKlaverjasTeam = {
    name: string;
    type: AppTeamType;
    id: UUID;
};
