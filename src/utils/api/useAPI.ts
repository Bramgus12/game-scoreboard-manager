import { ApiRoutes } from "./interfaces";
import { genericRequest } from "./fetcherFuncs";
import { mapAndDoRequestGetDelete, mapAndDoRequestPostPut } from "./mapFunctions";
import { DomainToAppUser } from "../../mappers/user";
import { DomainCreateUpdateUser } from "../../models/domain/user/CreateUpdateUser";
import { DomainUser } from "../../models/domain/user/User";
import {
    DomainToAppScoreboard,
    DomainToAppScoreboardArray,
} from "../../mappers/scoreboard";
import { DomainScoreboard } from "../../models/domain/scoreboard/Scoreboard";
import { DomainCreateScoreboard } from "../../models/domain/scoreboard/CreateUpdateScoreboard";
import { DomainUpdateScoreboard } from "../../models/domain/scoreboard/UpdateScoreboard";
import {
    DomainToAppKlaverjasTeam,
    DomainToAppKlaverjasTeamArray,
} from "../../mappers/klaverjasTeam";
import { DomainKlaverjasTeam } from "../../models/domain/klaverjasTeam/KlaverjasTeam";
import { DomainCreateKlaverjasTeam } from "../../models/domain/klaverjasTeam/CreateKlaverjasTeam";
import { DomainUpdateKlaverjasTeam } from "../../models/domain/klaverjasTeam/UpdateKlaverjasTeam";
import { DomainKlaverjasRound } from "../../models/domain/klaverjasRound/KlaverjasRound";
import {
    DomainToAppKlaverjasRound,
    DomainToAppKlaverjasRoundArray,
} from "../../mappers/klaverjasRound";
import { DomainCreateKlaverjasRound } from "../../models/domain/klaverjasRound/CreateKlaverjasRound";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export function useAPI(): ApiRoutes {
    return {
        user: {
            get: () => genericRequest(undefined, `${baseUrl}/user`, "get"),
            post: (user) =>
                mapAndDoRequestPostPut(
                    user,
                    (appModel) => appModel,
                    DomainToAppUser,
                    () =>
                        genericRequest<DomainCreateUpdateUser, DomainUser>(
                            user,
                            `${baseUrl}/user`,
                            "post",
                        ),
                ),
            put: (user) =>
                mapAndDoRequestPostPut(
                    user,
                    (appModel) => appModel,
                    DomainToAppUser,
                    () =>
                        genericRequest<DomainCreateUpdateUser, DomainUser>(
                            user,
                            `${baseUrl}/user`,
                            "put",
                        ),
                ),
        },
        scoreboard: {
            get: () =>
                mapAndDoRequestGetDelete(DomainToAppScoreboardArray, () =>
                    genericRequest<void, Array<DomainScoreboard>>(
                        undefined,
                        `${baseUrl}/scoreboard`,
                        "get",
                    ),
                ),
            getById: (id) =>
                mapAndDoRequestGetDelete(DomainToAppScoreboard, () =>
                    genericRequest<void, DomainScoreboard>(
                        undefined,
                        `${baseUrl}/scoreboard/${id}`,
                        "get",
                    ),
                ),
            post: (scoreboard) =>
                mapAndDoRequestPostPut(
                    scoreboard,
                    (appModel) => appModel,
                    DomainToAppScoreboard,
                    () =>
                        genericRequest<DomainCreateScoreboard, DomainScoreboard>(
                            scoreboard,
                            `${baseUrl}/scoreboard`,
                            "post",
                        ),
                ),
            put: (scoreboard, id) =>
                mapAndDoRequestPostPut(
                    scoreboard,
                    (appModel) => appModel,
                    DomainToAppScoreboard,
                    () =>
                        genericRequest<DomainUpdateScoreboard, DomainScoreboard>(
                            scoreboard,
                            `${baseUrl}/scoreboard/${id}`,
                            "put",
                        ),
                ),
        },
        klaverjasTeam: {
            getByScoreboardId: (scoreboardId) =>
                mapAndDoRequestGetDelete(DomainToAppKlaverjasTeamArray, () =>
                    genericRequest<void, Array<DomainKlaverjasTeam>>(
                        undefined,
                        `${baseUrl}/scoreboard/${scoreboardId}/klaverjas-team`,
                        "get",
                    ),
                ),
            post: (scoreboardId, klaverjasTeam) =>
                mapAndDoRequestPostPut(
                    klaverjasTeam,
                    (appModel) => appModel,
                    DomainToAppKlaverjasTeamArray,
                    () =>
                        genericRequest<
                            Array<DomainCreateKlaverjasTeam>,
                            Array<DomainKlaverjasTeam>
                        >(
                            klaverjasTeam,
                            `${baseUrl}/scoreboard/${scoreboardId}/klaverjas-team`,
                            "post",
                        ),
                ),
            put: (scoreboardId, klaverjasTeamId, klaverjasTeam) =>
                mapAndDoRequestPostPut(
                    klaverjasTeam,
                    (appModel) => appModel,
                    DomainToAppKlaverjasTeam,
                    () =>
                        genericRequest<
                            DomainUpdateKlaverjasTeam,
                            DomainKlaverjasTeam
                        >(
                            klaverjasTeam,
                            `${baseUrl}/scoreboard/${scoreboardId}/klaverjas-team/${klaverjasTeamId}`,
                            "put",
                        ),
                ),
        },
        klaverjasRound: {
            getByTeamId: (scoreboardId, teamId) =>
                mapAndDoRequestGetDelete(DomainToAppKlaverjasRoundArray, () =>
                    genericRequest<void, Array<DomainKlaverjasRound>>(
                        undefined,
                        `${baseUrl}/scoreboard/${scoreboardId}/klaverjas-team/${teamId}/klaverjas-round`,
                        "get",
                    ),
                ),
            post: (scoreboardId, teamId, klaverjasRound) =>
                mapAndDoRequestPostPut(
                    klaverjasRound,
                    (appModel) => appModel,
                    DomainToAppKlaverjasRound,
                    () =>
                        genericRequest<
                            DomainCreateKlaverjasRound,
                            DomainKlaverjasRound
                        >(
                            klaverjasRound,
                            `${baseUrl}/scoreboard/${scoreboardId}/klaverjas-team/${teamId}/klaverjas-round`,
                            "post",
                        ),
                ),
            put: (scoreboardId, teamId, klaverjasRoundId, klaverjasRound) =>
                mapAndDoRequestPostPut(
                    klaverjasRound,
                    (appModel) => appModel,
                    DomainToAppKlaverjasRound,
                    () =>
                        genericRequest<
                            DomainCreateKlaverjasRound,
                            DomainKlaverjasRound
                        >(
                            klaverjasRound,
                            `${baseUrl}/scoreboard/${scoreboardId}/klaverjas-team/${teamId}/klaverjas-round/${klaverjasRoundId}`,
                            "put",
                        ),
                ),
        },
    };
}
