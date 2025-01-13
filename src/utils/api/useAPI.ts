import { ApiRoutes } from "./interfaces";
import { genericRequest } from "./fetcherFuncs";
import { mapAndDoRequestGetDelete, mapAndDoRequestPostPut } from "./mapFunctions";
import { domainToAppUser } from "@/mappers/user";
import { DomainCreateUpdateUser } from "@/models/domain/user/CreateUpdateUser";
import { DomainUser } from "@/models/domain/user/User";
import {
    domainToAppScoreboard,
    domainToAppScoreboardArray,
} from "@/mappers/scoreboard";
import { DomainScoreboard } from "@/models/domain/scoreboard/Scoreboard";
import { DomainCreateScoreboard } from "@/models/domain/scoreboard/CreateUpdateScoreboard";
import { DomainUpdateScoreboard } from "@/models/domain/scoreboard/UpdateScoreboard";
import {
    domainToAppKlaverjasTeam,
    domainToAppKlaverjasTeamArray,
} from "@/mappers/klaverjasTeam";
import { DomainKlaverjasTeam } from "@/models/domain/klaverjasTeam/KlaverjasTeam";
import { DomainCreateKlaverjasTeam } from "@/models/domain/klaverjasTeam/CreateKlaverjasTeam";
import { DomainUpdateKlaverjasTeam } from "@/models/domain/klaverjasTeam/UpdateKlaverjasTeam";
import {
    domainToAppKlaverjasRound,
    domainToAppKlaverjasRoundArray,
} from "@/mappers/klaverjasRound";
import { DomainKlaverjasRound } from "@/models/domain/klaverjasRound/KlaverjasRound";
import { DomainCreateKlaverjasRound } from "@/models/domain/klaverjasRound/CreateKlaverjasRound";
import { domainToAppBoerenbridgeGame } from "@/mappers/boerenbridgeGame";
import { DomainBoerenbridgeGame } from "@/models/domain/boerenbridgeGame/boerenbridgeGame";
import { DomainCreateBoerenbridgeGame } from "@/models/domain/boerenbridgeGame/createBoerenbrigeGane";
import { DomainUpdateBoerenbridgeGame } from "@/models/domain/boerenbridgeGame/updateBoerenbridgeGame";
import {
    domainToAppBoerenbridgePlayer,
    domainToAppBoerenbridgePlayerArray,
} from "@/mappers/boerenbridgePlayer";
import { DomainBoerenbridgePlayer } from "@/models/domain/boerenbridgePlayer/boerenbridgePlayer";
import { DomainCreateBoerenbridgePlayer } from "@/models/domain/boerenbridgePlayer/createBoerenbridgePlayer";
import { DomainUpdateBoerenbridgePlayer } from "@/models/domain/boerenbridgePlayer/updateBoerenbridgePlayer";
import { DomainCreateBoerenbridgeRound } from "@/models/domain/boerenbridgeRound/createBoerenbridgeRound";
import { DomainBoerenbridgeRound } from "@/models/domain/boerenbridgeRound/boerenbridgeRound";
import { domainToAppBoerenbridgeRound } from "@/mappers/boerenbridgeRound";
import { DomainUpdateBoerenbridgeRound } from "@/models/domain/boerenbridgeRound/updateBoerenbridgeRound";

const baseUrl = process.env.API_BASE_URL ?? "";

export const apiRoutes: ApiRoutes = {
    user: {
        get: () => genericRequest(undefined, `${baseUrl}/user`, "get"),
        post: (user) =>
            mapAndDoRequestPostPut(
                user,
                (appModel) => appModel,
                domainToAppUser,
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
                domainToAppUser,
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
            mapAndDoRequestGetDelete(domainToAppScoreboardArray, () =>
                genericRequest<void, Array<DomainScoreboard>>(
                    undefined,
                    `${baseUrl}/scoreboard`,
                    "get",
                ),
            ),
        getById: (id) =>
            mapAndDoRequestGetDelete(domainToAppScoreboard, () =>
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
                domainToAppScoreboard,
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
                domainToAppScoreboard,
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
            mapAndDoRequestGetDelete(domainToAppKlaverjasTeamArray, () =>
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
                domainToAppKlaverjasTeamArray,
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
                domainToAppKlaverjasTeam,
                () =>
                    genericRequest<DomainUpdateKlaverjasTeam, DomainKlaverjasTeam>(
                        klaverjasTeam,
                        `${baseUrl}/scoreboard/${scoreboardId}/klaverjas-team/${klaverjasTeamId}`,
                        "put",
                    ),
            ),
    },
    klaverjasRound: {
        getByTeamId: (scoreboardId, teamId) =>
            mapAndDoRequestGetDelete(domainToAppKlaverjasRoundArray, () =>
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
                domainToAppKlaverjasRound,
                () =>
                    genericRequest<DomainCreateKlaverjasRound, DomainKlaverjasRound>(
                        klaverjasRound,
                        `${baseUrl}/scoreboard/${scoreboardId}/klaverjas-team/${teamId}/klaverjas-round`,
                        "post",
                    ),
            ),
        put: (scoreboardId, teamId, klaverjasRoundId, klaverjasRound) =>
            mapAndDoRequestPostPut(
                klaverjasRound,
                (appModel) => appModel,
                domainToAppKlaverjasRound,
                () =>
                    genericRequest<DomainCreateKlaverjasRound, DomainKlaverjasRound>(
                        klaverjasRound,
                        `${baseUrl}/scoreboard/${scoreboardId}/klaverjas-team/${teamId}/klaverjas-round/${klaverjasRoundId}`,
                        "put",
                    ),
            ),
        remove: (scoreboardId, teamId, klaverjasRoundId) =>
            genericRequest(
                undefined,
                `${baseUrl}/scoreboard/${scoreboardId}/klaverjas-team/${teamId}/klaverjas-round/${klaverjasRoundId}`,
                "delete",
            ),
    },
    boerenbridgeGame: {
        get: (scoreboardId) =>
            mapAndDoRequestGetDelete(domainToAppBoerenbridgeGame, () =>
                genericRequest<void, DomainBoerenbridgeGame>(
                    undefined,
                    `${baseUrl}/scoreboard/${scoreboardId}/boerenbridge-game`,
                    "get",
                ),
            ),
        post: (scoreboardId, game) =>
            mapAndDoRequestPostPut(
                game,
                (appModel) => appModel,
                domainToAppBoerenbridgeGame,
                (domainModel) =>
                    genericRequest<
                        DomainCreateBoerenbridgeGame,
                        DomainBoerenbridgeGame
                    >(
                        domainModel,
                        `${baseUrl}/scoreboard/${scoreboardId}/boerenbridge-game`,
                        "post",
                    ),
            ),
        put: (scoreboardId, gameId, game) =>
            mapAndDoRequestPostPut(
                game,
                (appModel) => appModel,
                domainToAppBoerenbridgeGame,
                (domainModel) =>
                    genericRequest<
                        DomainUpdateBoerenbridgeGame,
                        DomainBoerenbridgeGame
                    >(
                        domainModel,
                        `${baseUrl}/scoreboard/${scoreboardId}/boerenbridge-game/${gameId}`,
                        "put",
                    ),
            ),
    },
    boerenbridgePlayer: {
        get: (scoreboardId, gameId) =>
            mapAndDoRequestGetDelete(domainToAppBoerenbridgePlayerArray, () =>
                genericRequest<void, Array<DomainBoerenbridgePlayer>>(
                    undefined,
                    `${baseUrl}/scoreboard/${scoreboardId}/boerenbridge-game/${gameId}/boerenbridge-player`,
                    "get",
                ),
            ),
        post: (scoreboardId, gameId, player) =>
            mapAndDoRequestPostPut(
                player,
                (appModel) => appModel,
                domainToAppBoerenbridgePlayer,
                () =>
                    genericRequest<
                        DomainCreateBoerenbridgePlayer,
                        DomainBoerenbridgePlayer
                    >(
                        player,
                        `${baseUrl}/scoreboard/${scoreboardId}/boerenbridge-game/${gameId}/boerenbridge-player`,
                        "post",
                    ),
            ),
        put: (scoreboardId, gameId, playerId, player) =>
            mapAndDoRequestPostPut(
                player,
                (appModel) => appModel,
                domainToAppBoerenbridgePlayer,
                () =>
                    genericRequest<
                        DomainUpdateBoerenbridgePlayer,
                        DomainBoerenbridgePlayer
                    >(
                        player,
                        `${baseUrl}/scoreboard/${scoreboardId}/boerenbridge-game/${gameId}/boerenbridge-player/${playerId}`,
                        "put",
                    ),
            ),
    },
    boerenbridgeRound: {
        post: (scoreboardId, gameId, playerId, round) =>
            mapAndDoRequestPostPut(
                round,
                (appModel) => appModel,
                domainToAppBoerenbridgeRound,
                () =>
                    genericRequest<
                        DomainCreateBoerenbridgeRound,
                        DomainBoerenbridgeRound
                    >(
                        round,
                        `${baseUrl}/scoreboard/${scoreboardId}/boerenbridge-game/${gameId}/boerenbridge-player/${playerId}/boerenbridge-round`,
                        "post",
                    ),
            ),
        put: (scoreboardId, gameId, playerId, roundId, round) =>
            mapAndDoRequestPostPut(
                round,
                (appModel) => appModel,
                domainToAppBoerenbridgeRound,
                () =>
                    genericRequest<
                        DomainUpdateBoerenbridgeRound,
                        DomainBoerenbridgeRound
                    >(
                        round,
                        `${baseUrl}/scoreboard/${scoreboardId}/boerenbridge-game/${gameId}/boerenbridge-player/${playerId}/boerenbridge-round/${roundId}`,
                        "put",
                    ),
            ),
    },
};
