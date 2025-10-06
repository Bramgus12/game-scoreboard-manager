import { UUID } from "crypto";
import { AppTeamType } from "./team-type";

export type AppUpdateKlaverjasTeam = {
    name: string;
    type: AppTeamType;
    id: UUID;
};
