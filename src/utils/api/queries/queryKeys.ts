import { UUID } from "crypto";

export function getTeamsQueryKey(scoreboardId: UUID | null) {
    return ["teams", { scoreboardId }];
}

export function getRoundQueryKey(scoreboardId: UUID | null, teamId: UUID | null) {
    return ["rounds", { scoreboardId, teamId }];
}
