import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateKlaverjasGameForm } from "@/validation/create-klaverjas-game-schema";
import { UUID } from "crypto";
import {
    createKlaverjasGame,
    createKlaverjasRoundsForBothTeams,
    updateKlaverjasRoundsForBothTeams,
} from "@/api/klaverjas";
import QUERY_KEY from "@/constants/query-key";
import { AppCreateKlaverjasRound } from "@/models/app/klaverjas-round/create-klaverjas-round";
import { AppUpdateKlaverjasRound } from "@/models/app/klaverjas-round/update-klaverjas-round";

type CreateKlaverjasGamePayload = {
    scoreboardId: UUID;
    data: CreateKlaverjasGameForm;
};

type UpsertKlaverjasRoundsPayload<T> = {
    scoreboardId: UUID;
    teamUsRound: T;
    teamThemRound: T;
};

export function useCreateKlaverjasGameMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateKlaverjasGamePayload) =>
            createKlaverjasGame(payload.data, payload.scoreboardId),
        onSuccess: (teams, payload) => {
            void queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.SCOREBOARDS_FOR_USER],
            });

            queryClient.setQueryData(
                [
                    QUERY_KEY.KLAVERJAS_TEAMS_FOR_SCOREBOARD,
                    { scoreboardId: payload.scoreboardId },
                ],
                teams,
            );
        },
    });
}

export function useCreateKlaverjasRoundsForBothTeamsMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            payload: UpsertKlaverjasRoundsPayload<AppCreateKlaverjasRound>,
        ) =>
            createKlaverjasRoundsForBothTeams(
                payload.scoreboardId,
                payload.teamUsRound,
                payload.teamThemRound,
            ),
        onSuccess: (_data, payload) => {
            void queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEY.KLAVERJAS_ROUNDS_FOR_SCOREBOARD,
                    { scoreboardId: payload.scoreboardId },
                ],
            });

            void queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEY.KLAVERJAS_TOTALS_FOR_SCOREBOARD,
                    { scoreboardId: payload.scoreboardId },
                ],
            });
        },
    });
}

export function useUpdateKlaverjasRoundsForBothTeamsMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            payload: UpsertKlaverjasRoundsPayload<AppUpdateKlaverjasRound>,
        ) =>
            updateKlaverjasRoundsForBothTeams(
                payload.scoreboardId,
                payload.teamUsRound,
                payload.teamThemRound,
            ),
        onSuccess: (_data, payload) => {
            void queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEY.KLAVERJAS_ROUNDS_FOR_SCOREBOARD,
                    { scoreboardId: payload.scoreboardId },
                ],
            });

            void queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEY.KLAVERJAS_TOTALS_FOR_SCOREBOARD,
                    { scoreboardId: payload.scoreboardId },
                ],
            });
        },
    });
}
