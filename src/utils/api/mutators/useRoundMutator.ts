import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UUID } from "crypto";
import {
    createRound,
    deleteRound,
    updateRound,
} from "@/app/scoreboard/[id]/actions";
import { AppUpdateKlaverjasRound } from "@/models/app/klaverjasRound/UpdateKlaverjasRound";
import { AppCreateKlaverjasRound } from "@/models/app/klaverjasRound/CreateKlaverjasRound";

type MutationProps =
    | {
          type: "create";
          scoreboardId: UUID;
          teamId: UUID;
          round: AppCreateKlaverjasRound;
      }
    | {
          type: "update";
          scoreboardId: UUID;
          teamId: UUID;
          round: AppUpdateKlaverjasRound;
      };

export default function useRoundMutator() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (mutationProps: MutationProps) => {
            if (mutationProps.type === "create") {
                return createRound(
                    mutationProps.scoreboardId,
                    mutationProps.teamId,
                    mutationProps.round,
                );
            }
            return updateRound(
                mutationProps.scoreboardId,
                mutationProps.teamId,
                mutationProps.round,
            );
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["klaverjasTable"] });
            void queryClient.invalidateQueries({
                queryKey: ["totals"],
            });
            void queryClient.invalidateQueries({
                queryKey: ["currentRoundNumber"],
            });
        },
    });

    function createRoundMutation(
        scoreboardId: UUID,
        teamId: UUID,
        round: AppCreateKlaverjasRound,
    ) {
        return mutation.mutateAsync({ type: "create", scoreboardId, teamId, round });
    }

    function updateRoundMutation(
        scoreboardId: UUID,
        teamId: UUID,
        round: AppUpdateKlaverjasRound,
    ) {
        return mutation.mutateAsync({ type: "update", scoreboardId, teamId, round });
    }

    function deleteRoundMutation(scoreboardId: UUID, teamId: UUID, roundId: UUID) {
        return deleteRound(scoreboardId, teamId, roundId);
    }

    return { createRoundMutation, updateRoundMutation, deleteRoundMutation };
}
