import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppCreateScoreboard } from "@/models/app/scoreboard/create-scoreboard";
import {
    createBoerenbridgeScoreboardWithGame,
    createScoreboard,
    deleteScoreboardById,
} from "@/api/scoreboard";
import QUERY_KEY from "@/constants/query-key";
import { UUID } from "crypto";
import { CreateBoerenbridgeScoreboardForm } from "@/validation/create-boerenbridge-scoreboard-schema";

export function useCreateScoreboardMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: AppCreateScoreboard) => createScoreboard(payload),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.SCOREBOARDS_FOR_USER],
            });
        },
    });
}

export function useDeleteScoreboardMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: UUID) => deleteScoreboardById(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.SCOREBOARDS_FOR_USER],
            });
        },
    });
}

export function useCreateBoerenbridgeScoreboardWithGameMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateBoerenbridgeScoreboardForm) =>
            createBoerenbridgeScoreboardWithGame(payload),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.SCOREBOARDS_FOR_USER],
            });
        },
    });
}
