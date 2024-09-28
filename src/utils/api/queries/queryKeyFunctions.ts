import { UUID } from "crypto";

export function getUserQueryKey() {
    return ["user"];
}

export function getScoreboardQueryKey(scoreboardId?: UUID) {
    return ["scoreboard", { scoreboardId }];
}

export function getScoreboardsQueryKey() {
    return ["scoreboards"];
}

export function getKlaverjasTeamQueryKey(scoreboardId?: UUID) {
    return ["klaverjasTeam", { scoreboardId }];
}

export function getKlaverjasRoundQueryKey(
    scoreboardId?: UUID,
    klaverjasTeamId?: UUID,
) {
    return ["klaverjasRound", { scoreboardId, klaverjasTeamId }];
}
