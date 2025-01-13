import { UUID } from "crypto";
import { AppUser } from "@/models/app/user/User";
import { AppCreateUpdateUser } from "@/models/app/user/CreateUpdateUser";
import { AppScoreboard } from "@/models/app/scoreboard/Scoreboard";
import { AppCreateScoreboard } from "@/models/app/scoreboard/CreateScoreboard";
import { AppUpdateScoreboard } from "@/models/app/scoreboard/UpdateScoreboard";
import { AppKlaverjasTeam } from "@/models/app/klaverjasTeam/KlaverjasTeam";
import { AppCreateKlaverjasTeam } from "@/models/app/klaverjasTeam/CreateKlaverjasTeam";
import { AppUpdateKlaverjasTeam } from "@/models/app/klaverjasTeam/UpdateKlaverjasTeam";
import { AppKlaverjasRound } from "@/models/app/klaverjasRound/KlaverjasRound";
import { AppCreateKlaverjasRound } from "@/models/app/klaverjasRound/CreateKlaverjasRound";
import { AppBoerenbridgeGame } from "@/models/app/boerenbridgeGame/boerenbridgeGame";
import { AppCreateBoerenbridgeGame } from "@/models/app/boerenbridgeGame/createBoerenbridgeGame";
import { AppUpdateBoerenbridgeGame } from "@/models/app/boerenbridgeGame/updateBoerenbridgeGame";
import { AppCreateBoerenbridgePlayer } from "@/models/app/boerenbridgePlayer/createBoerenbridgePlayer";
import { AppBoerenbridgePlayer } from "@/models/app/boerenbridgePlayer/boerenbridgePlayer";
import { AppUpdateBoerenbridgePlayer } from "@/models/app/boerenbridgePlayer/updateBoerenbridgePlayer";
import { AppBoerenbridgeRound } from "@/models/app/boerenbridgeRound/boerenbridgeRound";
import { AppCreateBoerenbridgeRound } from "@/models/app/boerenbridgeRound/createBoerenbridgeRound";
import { AppUpdateBoerenbridgeRound } from "@/models/app/boerenbridgeRound/updateBoerenbridgeRound";

export type RequestOptions<Body> =
    | {
          method: "get" | "delete";
          url: string;
          authHeader?: Record<string, string>;
      }
    | {
          method: "post" | "put";
          url: string;
          authHeader?: Record<string, string>;
          body?: Body;
      };

export type ApiRoutes = {
    user: {
        get: () => Promise<AppUser>;
        post: (user: AppCreateUpdateUser) => Promise<AppUser>;
        put: (user: AppCreateUpdateUser) => Promise<AppUser>;
    };
    scoreboard: {
        get: () => Promise<Array<AppScoreboard>>;
        getById: (id: UUID) => Promise<AppScoreboard>;
        post: (scoreboard: AppCreateScoreboard) => Promise<AppScoreboard>;
        put: (scoreboard: AppUpdateScoreboard, id: UUID) => Promise<AppScoreboard>;
    };
    klaverjasTeam: {
        getByScoreboardId: (scoreboardId: UUID) => Promise<Array<AppKlaverjasTeam>>;
        post: (
            scoreboardId: UUID,
            klaverjasTeams: Array<AppCreateKlaverjasTeam>,
        ) => Promise<Array<AppKlaverjasTeam>>;
        put: (
            scoreboardId: UUID,
            klaverjasTeamId: UUID,
            klaverjasTeam: AppUpdateKlaverjasTeam,
        ) => Promise<AppKlaverjasTeam>;
    };
    klaverjasRound: {
        getByTeamId: (
            scoreboardId: UUID,
            teamId: UUID,
        ) => Promise<Array<AppKlaverjasRound>>;
        post: (
            scoreboardId: UUID,
            teamId: UUID,
            klaverjasRound: AppCreateKlaverjasRound,
        ) => Promise<AppKlaverjasRound>;
        put: (
            scoreboardId: UUID,
            teamId: UUID,
            klaverjasRoundId: UUID,
            klaverjasRound: AppCreateKlaverjasRound,
        ) => Promise<AppKlaverjasRound>;
        remove: (
            scoreboardId: UUID,
            teamId: UUID,
            klaverjasRoundId: UUID,
        ) => Promise<void>;
    };
    boerenbridgeGame: {
        get: (scoreboardId: UUID) => Promise<AppBoerenbridgeGame>;
        post: (
            scoreboardId: UUID,
            game: AppCreateBoerenbridgeGame,
        ) => Promise<AppBoerenbridgeGame>;
        put: (
            scoreboardId: UUID,
            gameId: UUID,
            game: AppUpdateBoerenbridgeGame,
        ) => Promise<AppBoerenbridgeGame>;
    };
    boerenbridgePlayer: {
        get: (
            scoreboardId: UUID,
            gameId: UUID,
        ) => Promise<Array<AppBoerenbridgePlayer>>;
        post: (
            scoreboardId: UUID,
            gameId: UUID,
            player: AppCreateBoerenbridgePlayer,
        ) => Promise<AppBoerenbridgePlayer>;
        put: (
            scoreboardId: UUID,
            gameId: UUID,
            playerId: UUID,
            player: AppUpdateBoerenbridgePlayer,
        ) => Promise<AppBoerenbridgePlayer>;
    };
    boerenbridgeRound: {
        post: (
            scoreboardId: UUID,
            gameId: UUID,
            playerId: UUID,
            round: AppCreateBoerenbridgeRound,
        ) => Promise<AppBoerenbridgeRound>;
        put: (
            scoreboardId: UUID,
            gameId: UUID,
            playerId: UUID,
            roundId: UUID,
            round: AppUpdateBoerenbridgeRound,
        ) => Promise<AppBoerenbridgeRound>;
    };
};
