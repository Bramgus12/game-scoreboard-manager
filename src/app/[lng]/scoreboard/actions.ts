"use server";

import { apiRoutes } from "@/utils/api/useAPI";
import { GAME_TYPE } from "@/constants/gameType";
import { TEAM_TYPE } from "@/constants/teamType";
import { redirect } from "next/navigation";
import { CreateKlaverjasGameForm } from "@/pageComponents/createKlaverjasGame";
import { CreateBoerenbridgeGameForm } from "@/pageComponents/createBoerenbridgeGame";

export async function createKlaverjasGame(data: CreateKlaverjasGameForm) {
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
export async function createBoerenbridgeGame(data: CreateBoerenbridgeGameForm) {
    const {
        scoreboard: { post: postScoreboard },
        boerenbridgeGame: { post: postBoerenbridgeGame },
        boerenbridgePlayer: { post: postBoerenbridgeGamePlayer },
    } = apiRoutes;

    const createdScoreboard = await postScoreboard({
        gameType: GAME_TYPE.BOERENBRIDGE,
        scoreboardName: data.scoreboardName,
    });

    const createdGame = await postBoerenbridgeGame(createdScoreboard.id, {
        pointsPerCorrectGuess: data.pointsPerCorrectGuess,
    });

    await Promise.all(
        data.players.map((player) =>
            postBoerenbridgeGamePlayer(createdScoreboard.id, createdGame.id, {
                name: player.playerName,
            }),
        ),
    );

    redirect(`/scoreboard/${createdScoreboard.id}`);
}
