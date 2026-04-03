import {
    domainToAppScoreboard,
    domainToAppScoreboardArray,
} from "@/mappers/scoreboard";
import { AppScoreboard } from "@/models/app/scoreboard/scoreboard";
import { UUID } from "crypto";
import { AppCreateScoreboard } from "@/models/app/scoreboard/create-scoreboard";
import {
    createBoerenbridgeScoreboardWithGame as repoCreateBoerenbridgeScoreboardWithGame,
    createScoreboard as repoCreateScoreboard,
    deleteScoreboardById as repoDeleteScoreboardById,
    getScoreboardById as repoGetScoreboardById,
    getScoreboardsForUser as repoGetScoreboardsForUser,
} from "@/server/repository/scoreboard";
import { AppCreateBoerenbridgePlayer } from "@/models/app/boerenbridge-player/create-boerenbridge-player";

export async function deleteScoreboardById(id: UUID) {
    return repoDeleteScoreboardById(id);
}

export async function getScoreboardsForUser(): Promise<Array<AppScoreboard>> {
    const scoreboards = await repoGetScoreboardsForUser();

    return domainToAppScoreboardArray(scoreboards);
}

export async function getScoreboardById(id: UUID) {
    const scoreboard = await repoGetScoreboardById(id);

    return domainToAppScoreboard(scoreboard);
}

export async function createScoreboard(scoreboard: AppCreateScoreboard) {
    const createdScoreboard = await repoCreateScoreboard(scoreboard);

    return domainToAppScoreboard(createdScoreboard);
}

type CreateBoerenbridgeScoreboardWithGamePayload = {
    scoreboardName: string;
    pointsPerCorrectGuess: number;
    players: Array<AppCreateBoerenbridgePlayer>;
};

export async function createBoerenbridgeScoreboardWithGame(
    payload: CreateBoerenbridgeScoreboardWithGamePayload,
) {
    const createdScoreboard =
        await repoCreateBoerenbridgeScoreboardWithGame(payload);

    return domainToAppScoreboard(createdScoreboard);
}
