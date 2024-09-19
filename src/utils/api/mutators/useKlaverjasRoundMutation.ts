import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppCreateKlaverjasRound } from "../../../models/app/klaverjasRound/CreateKlaverjasRound";
import { AppUpdateKlaverjasRound } from "../../../models/app/klaverjasRound/UpdateKlaverjasRound";
import { useAPI } from "../useAPI";
import { UUID } from "crypto";
import { getKlaverjasRoundQueryKey } from "../queries/queryKeyFunctions";
import { getKlaverjasRoundMutationKey } from "./mutationKeyFunctions";

type MutationProps =
    | {
          action: "create";
          klaverjasRound: AppCreateKlaverjasRound;
          scoreboardId: UUID;
          klaverjasTeamId: UUID;
      }
    | {
          action: "update";
          klaverjasRound: AppUpdateKlaverjasRound;
          scoreboardId: UUID;
          klaverjasTeamId: UUID;
      };

export default function useKlaverjasRoundMutation() {
    const {
        klaverjasRound: { post, put },
    } = useAPI();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: getKlaverjasRoundMutationKey(),
        mutationFn: (mutationProps: MutationProps) => {
            if (mutationProps.action === "create") {
                return post(mutationProps.scoreboardId, mutationProps.klaverjasTeamId, mutationProps.klaverjasRound);
            }
            if (mutationProps.action === "update") {
                return put(
                    mutationProps.scoreboardId,
                    mutationProps.klaverjasTeamId,
                    mutationProps.klaverjasRound.id,
                    mutationProps.klaverjasRound,
                );
            }
            throw new Error("Invalid action");
        },
        onSuccess: (data, mutationProps) => {
            queryClient.setQueryData(
                getKlaverjasRoundQueryKey(mutationProps.scoreboardId, mutationProps.klaverjasTeamId),
                data,
            );
        },
    });

    function createKlaverjasRound(scoreboardId: UUID, klaverjasTeamId: UUID, klaverjasRound: AppCreateKlaverjasRound) {
        return mutation.mutateAsync({ action: "create", scoreboardId, klaverjasTeamId, klaverjasRound });
    }

    function updateKlaverjasRound(scoreboardId: UUID, klaverjasTeamId: UUID, klaverjasRound: AppUpdateKlaverjasRound) {
        return mutation.mutateAsync({ action: "update", scoreboardId, klaverjasTeamId, klaverjasRound });
    }

    return { createKlaverjasRound, updateKlaverjasRound, mutation };
}
