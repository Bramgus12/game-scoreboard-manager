import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UUID } from "crypto";
import QUERY_KEY from "@/constants/query-key";
import {
    createBoerenbridgeRound,
    initializeBoerenbridgePlayers,
    updateBoerenbridgeRound,
} from "@/api/boerenbridge";
import { CreateBoerenbridgeRoundForm } from "@/validation/create-boerenbridge-round-schema";
import { CreateBoerenbridgePlayersForm } from "@/validation/create-boerenbridge-players-schema";

type BoerenbridgeRoundPayload = {
    scoreboardId: UUID;
    data: CreateBoerenbridgeRoundForm;
};

type BoerenbridgeInitializePlayersPayload = {
    scoreboardId: UUID;
    data: CreateBoerenbridgePlayersForm;
};

export function useCreateBoerenbridgeRoundMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: BoerenbridgeRoundPayload) =>
            createBoerenbridgeRound(payload.scoreboardId, payload.data),
        onSuccess: (_result, payload) => {
            void Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEY.BOERENBRIDGE_ROUNDS_FOR_SCOREBOARD,
                        { scoreboardId: payload.scoreboardId },
                    ],
                }),
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEY.BOERENBRIDGE_PLAYERS_FOR_SCOREBOARD,
                        { scoreboardId: payload.scoreboardId },
                    ],
                }),
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEY.BOERENBRIDGE_GAME_FOR_SCOREBOARD,
                        { scoreboardId: payload.scoreboardId },
                    ],
                }),
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEY.BOERENBRIDGE_ROUND_NUMBER_FOR_SCOREBOARD,
                        { scoreboardId: payload.scoreboardId },
                    ],
                }),
            ]);
        },
    });
}

export function useInitializeBoerenbridgePlayersMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: BoerenbridgeInitializePlayersPayload) =>
            initializeBoerenbridgePlayers(payload.scoreboardId, payload.data),
        onSuccess: (players, payload) => {
            queryClient.setQueryData(
                [
                    QUERY_KEY.BOERENBRIDGE_PLAYERS_FOR_SCOREBOARD,
                    { scoreboardId: payload.scoreboardId },
                ],
                players,
            );

            void Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEY.BOERENBRIDGE_ROUNDS_FOR_SCOREBOARD,
                        { scoreboardId: payload.scoreboardId },
                    ],
                }),
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEY.BOERENBRIDGE_ROUND_NUMBER_FOR_SCOREBOARD,
                        { scoreboardId: payload.scoreboardId },
                    ],
                }),
            ]);
        },
    });
}

export function useUpdateBoerenbridgeRoundMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: BoerenbridgeRoundPayload) =>
            updateBoerenbridgeRound(payload.scoreboardId, payload.data),
        onSuccess: (_result, payload) => {
            void Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEY.BOERENBRIDGE_ROUNDS_FOR_SCOREBOARD,
                        { scoreboardId: payload.scoreboardId },
                    ],
                }),
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEY.BOERENBRIDGE_PLAYERS_FOR_SCOREBOARD,
                        { scoreboardId: payload.scoreboardId },
                    ],
                }),
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEY.BOERENBRIDGE_ROUND_NUMBER_FOR_SCOREBOARD,
                        { scoreboardId: payload.scoreboardId },
                    ],
                }),
            ]);
        },
    });
}
