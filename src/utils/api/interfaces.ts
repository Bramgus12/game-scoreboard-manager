import { AppScoreboard } from "../../models/app/scoreboard/Scoreboard";
import { AppCreateScoreboard } from "../../models/app/scoreboard/CreateScoreboard";
import { UUID } from "crypto";
import { AppUser } from "../../models/app/user/User";
import { AppCreateUpdateUser } from "../../models/app/user/CreateUpdateUser";
import { AppUpdateScoreboard } from "../../models/app/scoreboard/UpdateScoreboard";
import { AppKlaverjasTeam } from "../../models/app/klaverjasTeam/KlaverjasTeam";
import { AppCreateKlaverjasTeam } from "../../models/app/klaverjasTeam/CreateKlaverjasTeam";
import { AppUpdateKlaverjasTeam } from "../../models/app/klaverjasTeam/UpdateKlaverjasTeam";
import { AppKlaverjasRound } from "../../models/app/klaverjasRound/KlaverjasRound";
import { AppCreateKlaverjasRound } from "../../models/app/klaverjasRound/CreateKlaverjasRound";

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
        post: (scoreboardId: UUID, klaverjasTeam: AppCreateKlaverjasTeam) => Promise<AppKlaverjasTeam>;
        put: (
            scoreboardId: UUID,
            klaverjasTeamId: UUID,
            klaverjasTeam: AppUpdateKlaverjasTeam,
        ) => Promise<AppKlaverjasTeam>;
    };
    klaverjasRound: {
        getByTeamId: (scoreboardId: UUID, teamId: UUID) => Promise<Array<AppKlaverjasRound>>;
        post: (scoreboardId: UUID, teamId: UUID, klaverjasRound: AppCreateKlaverjasRound) => Promise<AppKlaverjasRound>;
        put: (
            scoreboardId: UUID,
            teamId: UUID,
            klaverjasRoundId: UUID,
            klaverjasRound: AppCreateKlaverjasRound,
        ) => Promise<AppKlaverjasRound>;
    };
};
