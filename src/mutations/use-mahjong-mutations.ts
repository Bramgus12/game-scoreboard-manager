import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UUID } from "crypto";
import QUERY_KEY from "@/constants/query-key";
import { createMahjongHand } from "@/api/mahjong";
import { CreateMahjongHandForm } from "@/validation/create-mahjong-hand-schema";

type MahjongHandPayload = {
    scoreboardId: UUID;
    data: CreateMahjongHandForm;
};

export function useCreateMahjongHandMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: MahjongHandPayload) =>
            createMahjongHand(payload.scoreboardId, payload.data),
        onSuccess: (_result, payload) => {
            void Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEY.MAHJONG_HANDS_FOR_SCOREBOARD,
                        { scoreboardId: payload.scoreboardId },
                    ],
                }),
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEY.MAHJONG_TOTALS_FOR_SCOREBOARD,
                        { scoreboardId: payload.scoreboardId },
                    ],
                }),
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEY.MAHJONG_HAND_STATE_FOR_SCOREBOARD,
                        { scoreboardId: payload.scoreboardId },
                    ],
                }),
            ]);
        },
    });
}
