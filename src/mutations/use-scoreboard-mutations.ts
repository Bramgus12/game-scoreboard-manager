import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppCreateScoreboard } from "@/models/app/scoreboard/create-scoreboard";
import {
    createBoerenbridgeScoreboardWithGame,
    createMahjongScoreboardWithGame,
    createScoreboard,
    deleteScoreboardById,
} from "@/api/scoreboard";
import QUERY_KEY from "@/constants/query-key";
import { UUID } from "crypto";
import { CreateBoerenbridgeScoreboardForm } from "@/validation/create-boerenbridge-scoreboard-schema";
import { CreateMahjongScoreboardForm } from "@/validation/create-mahjong-scoreboard-schema";

export function useCreateScoreboardMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: AppCreateScoreboard) => createScoreboard(payload),
        onSuccess: () => {
            void Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.SCOREBOARDS_FOR_USER],
                }),
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.SCOREBOARDS_STATS_FOR_USER],
                }),
            ]);
        },
    });
}

export function useDeleteScoreboardMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: UUID) => deleteScoreboardById(id),
        onSuccess: () => {
            void Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.SCOREBOARDS_FOR_USER],
                }),
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.SCOREBOARDS_STATS_FOR_USER],
                }),
            ]);
        },
    });
}

export function useCreateBoerenbridgeScoreboardWithGameMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateBoerenbridgeScoreboardForm) =>
            createBoerenbridgeScoreboardWithGame(payload),
        onSuccess: () => {
            void Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.SCOREBOARDS_FOR_USER],
                }),
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.SCOREBOARDS_STATS_FOR_USER],
                }),
            ]);
        },
    });
}

export function useCreateMahjongScoreboardWithGameMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateMahjongScoreboardForm) =>
            createMahjongScoreboardWithGame(payload),
        onSuccess: () => {
            void Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.SCOREBOARDS_FOR_USER],
                }),
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.SCOREBOARDS_STATS_FOR_USER],
                }),
            ]);
        },
    });
}
