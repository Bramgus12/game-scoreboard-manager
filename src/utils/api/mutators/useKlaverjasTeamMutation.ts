import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAPI } from "../useAPI";
import { getKlaverjasTeamMutationKey } from "./mutationKeyFunctions";
import { AppUpdateKlaverjasTeam } from "../../../models/app/klaverjasTeam/UpdateKlaverjasTeam";
import { AppCreateKlaverjasTeam } from "../../../models/app/klaverjasTeam/CreateKlaverjasTeam";
import { UUID } from "crypto";
import { getKlaverjasTeamQueryKey } from "../queries/queryKeyFunctions";

type MutationProps =
    | {
          action: "create";
          klaverjasTeams: Array<AppCreateKlaverjasTeam>;
          scoreboardId: UUID;
      }
    | {
          action: "update";
          klaverjasTeam: AppUpdateKlaverjasTeam;
          scoreboardId: UUID;
      };

export function useKlaverjasTeamMutation() {
    const {
        klaverjasTeam: { post, put },
    } = useAPI();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: getKlaverjasTeamMutationKey(),
        mutationFn: async (mutationProps: MutationProps) => {
            if (mutationProps.action === "create") {
                return post(
                    mutationProps.scoreboardId,
                    mutationProps.klaverjasTeams,
                );
            }
            if (mutationProps.action === "update") {
                return [
                    await put(
                        mutationProps.scoreboardId,
                        mutationProps.klaverjasTeam.id,
                        mutationProps.klaverjasTeam,
                    ),
                ];
            }
            throw new Error("Invalid action");
        },
        onSuccess: (data, mutationProps) => {
            queryClient.setQueryData(
                getKlaverjasTeamQueryKey(mutationProps.scoreboardId),
                data,
            );
        },
    });

    function createKlaverjasTeam(
        scoreboardId: UUID,
        klaverjasTeams: Array<AppCreateKlaverjasTeam>,
    ) {
        return mutation.mutateAsync({
            action: "create",
            scoreboardId,
            klaverjasTeams,
        });
    }

    function updateKlaverjasTeam(
        scoreboardId: UUID,
        klaverjasTeam: AppUpdateKlaverjasTeam,
    ) {
        return mutation.mutateAsync({
            action: "update",
            scoreboardId,
            klaverjasTeam,
        });
    }

    return { createKlaverjasTeam, updateKlaverjasTeam, mutation };
}
