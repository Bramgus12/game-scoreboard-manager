import { AppCreateScoreboard } from "@/models/app/scoreboard/create-scoreboard";
import { AppScoreboard } from "@/models/app/scoreboard/scoreboard";
import { AppScoreboardsStats } from "@/models/app/scoreboard/scoreboard-stats";
import { UUID } from "crypto";
import { deleteJson, getJson, postJson } from "@/api/client";
import { CreateBoerenbridgeScoreboardForm } from "@/validation/create-boerenbridge-scoreboard-schema";
import { CreateMahjongScoreboardForm } from "@/validation/create-mahjong-scoreboard-schema";

function toScoreboard(scoreboard: AppScoreboard): AppScoreboard {
    return {
        ...scoreboard,
        createdAt: new Date(scoreboard.createdAt),
        updatedAt: new Date(scoreboard.updatedAt),
    };
}

export async function getScoreboardsForUser(): Promise<Array<AppScoreboard>> {
    const scoreboards = await getJson<Array<AppScoreboard>>("/scoreboards");

    return scoreboards.map(toScoreboard);
}

export async function getScoreboardsStatsForUser(): Promise<AppScoreboardsStats> {
    return getJson<AppScoreboardsStats>("/scoreboards/stats");
}

export async function getScoreboardById(id: UUID): Promise<AppScoreboard> {
    const scoreboard = await getJson<AppScoreboard>(`/scoreboards/${id}`);

    return toScoreboard(scoreboard);
}

export async function createScoreboard(
    scoreboard: AppCreateScoreboard,
): Promise<AppScoreboard> {
    const createdScoreboard = await postJson<AppCreateScoreboard, AppScoreboard>(
        "/scoreboards",
        scoreboard,
    );

    return toScoreboard(createdScoreboard);
}

export async function createBoerenbridgeScoreboardWithGame(
    data: CreateBoerenbridgeScoreboardForm,
): Promise<AppScoreboard> {
    const createdScoreboard = await postJson<
        CreateBoerenbridgeScoreboardForm,
        AppScoreboard
    >("/scoreboards/boerenbridge", data);

    return toScoreboard(createdScoreboard);
}

export async function createMahjongScoreboardWithGame(
    data: CreateMahjongScoreboardForm,
): Promise<AppScoreboard> {
    const createdScoreboard = await postJson<
        CreateMahjongScoreboardForm,
        AppScoreboard
    >("/scoreboards/mahjong", data);

    return toScoreboard(createdScoreboard);
}

export async function deleteScoreboardById(id: UUID): Promise<void> {
    await deleteJson(`/scoreboards/${id}`);
}
