"use server";

import { UUID } from "crypto";
import { apiRoutes } from "@/utils/api/useAPI";
import { MergedRound } from "@/pageComponents/scoreboardId/KlaverjasTable/interfaces";
import { getFame } from "@/utils/funcs/getFame";
import { AppKlaverjasRound } from "@/models/app/klaverjasRound/KlaverjasRound";
import { AppCreateKlaverjasRound } from "@/models/app/klaverjasRound/CreateKlaverjasRound";
import { AppUpdateKlaverjasRound } from "@/models/app/klaverjasRound/UpdateKlaverjasRound";
import { revalidatePath } from "next/cache";

function mergeRounds(
    team1Rounds: Array<AppKlaverjasRound>,
    team2Rounds: Array<AppKlaverjasRound>,
) {
    return team1Rounds
        .sort((a, b) => a.roundNumber - b.roundNumber)
        .map((round) => {
            const matchingRound = team2Rounds.find(
                (r) => r.roundNumber === round.roundNumber,
            );

            if (!matchingRound) {
                return undefined;
            }

            return {
                roundNumber: round.roundNumber,
                team1: round,
                team2: matchingRound,
            };
        })
        .filter((round) => round != null);
}

function calculateTotals(mergedRounds: Array<MergedRound>) {
    return mergedRounds.reduce<{ us: number; them: number }>(
        (accumulator, currentValue) => {
            const returnValue = { ...accumulator };

            const usFame = getFame(currentValue, "team1");
            const themFame = getFame(currentValue, "team2");

            returnValue.us += currentValue.team1.points + usFame;
            returnValue.them += currentValue.team2.points + themFame;

            return returnValue;
        },
        { us: 0, them: 0 },
    );
}

export async function getRoundNumber(scoreboardId: UUID) {
    const {
        klaverjasTeam: { getByScoreboardId },
        klaverjasRound: { getByTeamId },
    } = apiRoutes;

    const teams = await getByScoreboardId(scoreboardId);

    const rounds = await getByTeamId(scoreboardId, teams[0].id);

    return rounds.length + 1;
}

export async function getRoundsByTeam(scoreboardId: UUID, teamId: UUID) {
    const {
        klaverjasRound: { getByTeamId },
    } = apiRoutes;

    return getByTeamId(scoreboardId, teamId);
}

export async function getRounds(scoreboardId: UUID) {
    const {
        klaverjasTeam: { getByScoreboardId },
    } = apiRoutes;

    const teams = await getByScoreboardId(scoreboardId);

    const team1 = await getRoundsByTeam(scoreboardId, teams[0].id);
    const team2 = await getRoundsByTeam(scoreboardId, teams[1].id);

    return mergeRounds(team1, team2);
}

export async function getTotals(scoreboardId: UUID) {
    const mergedRounds: Array<MergedRound> = await getRounds(scoreboardId);

    return calculateTotals(mergedRounds);
}

export async function getTeams(scoreboardId: UUID) {
    const {
        klaverjasTeam: { getByScoreboardId },
    } = apiRoutes;

    return getByScoreboardId(scoreboardId);
}

export async function getTeamNames(scoreboardId: UUID) {
    const teams = await getTeams(scoreboardId);

    return {
        us: teams[0].name,
        them: teams[1].name,
    };
}

export async function createRound(
    scoreboardId: UUID,
    teamId: UUID,
    round: AppCreateKlaverjasRound,
) {
    const {
        klaverjasRound: { post },
    } = apiRoutes;

    const response = await post(scoreboardId, teamId, round);

    revalidatePath(`/scoreboard/${scoreboardId}`);

    return response;
}

export async function updateRound(
    scoreboardId: UUID,
    teamId: UUID,
    round: AppUpdateKlaverjasRound,
) {
    const {
        klaverjasRound: { put },
    } = apiRoutes;

    const response = await put(scoreboardId, teamId, round.id, round);

    revalidatePath(`/scoreboard/${scoreboardId}`);

    return response;
}

export async function deleteRound(scoreboardId: UUID, teamId: UUID, roundId: UUID) {
    const {
        klaverjasRound: { remove },
    } = apiRoutes;

    await remove(scoreboardId, teamId, roundId);

    revalidatePath(`/scoreboard/${scoreboardId}`);
}
