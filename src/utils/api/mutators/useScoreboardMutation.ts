import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getScoreboardMutationKey } from "./mutationKeyFunctions";
import { AppCreateScoreboard } from "../../../models/app/CreateScoreboard";
import { AppUpdateScoreboard } from "../../../models/app/UpdateScoreboard";
import { useAPI } from "../useAPI";
import { getScoreboardQueryKey } from "../queries/queryKeyFunctions";

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
        },
    });

    async function createScoreboard(scoreboard: AppCreateScoreboard) {
        await mutation.mutateAsync({ action: "create", scoreboard });
    }

    async function updateScoreboard(scoreboard: AppUpdateScoreboard) {
        await mutation.mutateAsync({ action: "update", scoreboard });
    }

    return { createScoreboard, updateScoreboard, mutation };
}
