"use server";

import { CreateScoreBoardForm } from "@/app/[lng]/scoreboard/interfaces";
import { apiRoutes } from "@/utils/api/useAPI";
import { GAME_TYPE } from "@/constants/gameType";
import { TEAM_TYPE } from "@/constants/teamType";
import { redirect } from "next/navigation";

export async function createScoreBoard(data: CreateScoreBoardForm) {
    const {
        scoreboard: { post: postScoreboard },
        klaverjasTeam: { post: postTeams },
    } = apiRoutes;

    const createdScoreboard = await postScoreboard({
        gameType: GAME_TYPE.KLAVERJAS,
        scoreboardName: data.scoreboardName,
    });

    const createdTeams = await postTeams(createdScoreboard.id, [
        { type: TEAM_TYPE.US, name: data.ourTeamName },
        { type: TEAM_TYPE.THEM, name: data.theirTeamName },
    ]);

    if (createdTeams.length !== 2) {
        throw new Error("Failed to create teams");
    }

    redirect(`/scoreboard/${createdScoreboard.id}`);
}
