import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getScoreboardMutationKey } from "./mutationKeyFunctions";
import { useAPI } from "../useAPI";
import { getScoreboardQueryKey, getScoreboardsQueryKey } from "../queries/queryKeyFunctions";
import { AppCreateScoreboard } from "../../../models/app/scoreboard/CreateScoreboard";
import { AppUpdateScoreboard } from "../../../models/app/scoreboard/UpdateScoreboard";
import { AppScoreboard } from "../../../models/app/scoreboard/Scoreboard";

type MutationProps =
    | {
          action: "create";
          scoreboard: AppCreateScoreboard;
      }
    | {
          action: "update";
          scoreboard: AppUpdateScoreboard;
      };

export default function useScoreboardMutation() {
    const {
        scoreboard: { post, put },
    } = useAPI();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: getScoreboardMutationKey(),
        mutationFn: (mutationProps: MutationProps) => {
            if (mutationProps.action === "create") {
                return post(mutationProps.scoreboard);
            }

            return put(mutationProps.scoreboard, mutationProps.scoreboard.id);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(getScoreboardQueryKey(data.id), data);
            queryClient.setQueryData(getScoreboardsQueryKey(), (oldData: Array<AppScoreboard> = []) => {
                const previousValueIndex = oldData.findIndex((scoreboard) => scoreboard.id === data.id);

                if (previousValueIndex === -1) {
                    return [...oldData, data];
                }

                oldData.splice(previousValueIndex, 1, data);
                return oldData;
            });
        },
    });

    function createScoreboard(scoreboard: AppCreateScoreboard) {
        return mutation.mutateAsync({ action: "create", scoreboard });
    }

    function updateScoreboard(scoreboard: AppUpdateScoreboard) {
        return mutation.mutateAsync({ action: "update", scoreboard });
    }

    return { createScoreboard, updateScoreboard, mutation };
}
