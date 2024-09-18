import { UUID } from "crypto";

export function getUserQueryKey() {
    return ["user"];
}

export function getScoreboardQueryKey(scoreboardId?: UUID) {
    return ["scoreboard", scoreboardId != null ? { scoreboardId } : undefined];
}

export function getScoreboardsQueryKey() {
    return ["scoreboards"];
}

export function getKlaverjasTeamQueryKey(scoreboardId?: UUID) {
    return ["klaverjasTeam", scoreboardId != null ? { scoreboardId } : undefined];
}
