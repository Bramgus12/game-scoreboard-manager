import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppCreateScoreboard } from "@/models/app/scoreboard/create-scoreboard";
import { createScoreboard, deleteScoreboardById } from "@/api/scoreboard";
import QUERY_KEY from "@/constants/query-key";
import { UUID } from "crypto";

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
