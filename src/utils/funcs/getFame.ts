import { MergedRound } from "pages/app.scoreboard.$scoreboardId/components/KlaverjasTable/interfaces";

export function getFame(round: MergedRound, team: "team1" | "team2") {
    const thisTeam = round[team];
    const otherTeam = team === "team1" ? round.team2 : round.team1;

    if (thisTeam.isPit) {
        return thisTeam.fame + otherTeam.fame + 100;
    }

    if (otherTeam.isPit || thisTeam.isWet) {
        return 0;
    }

    if (thisTeam.isWet) {
        return 0;
    }

    if (otherTeam.isWet) {
        return thisTeam.fame + otherTeam.fame;
    }

    return thisTeam.fame;
}
