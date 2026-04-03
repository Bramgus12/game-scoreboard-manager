import { TEAM_TYPE } from "@/constants/teamType";
import { AppTeamType } from "@/models/app/klaverjas-team/team-type";

export function isAppTeamType(value: string): value is AppTeamType {
    return value === TEAM_TYPE.US || value === TEAM_TYPE.THEM;
}

export function parseAppTeamType(value: string): AppTeamType {
    if (!isAppTeamType(value)) {
        throw new Error("Invalid team type");
    }

    return value;
}
