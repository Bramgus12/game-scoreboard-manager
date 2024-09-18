import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAPI } from "../useAPI";
import { getUserQueryKey } from "../queries/queryKeyFunctions";
import { getUserMutationKey } from "./mutationKeyFunctions";
import { AppCreateUpdateUser } from "../../../models/app/user/CreateUpdateUser";

type MutationProps = {
    action: "create" | "update";
    user: AppCreateUpdateUser;
};

export function useUserMutation() {
    const {
        user: { post, put },
    } = useAPI();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: getUserMutationKey(),
        mutationFn: async (mutationProps: MutationProps) => {
            if (mutationProps.action === "create") {
                return await post(mutationProps.user);
            }
            return await put(mutationProps.user);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(getUserQueryKey(), data);
        },
    });

    async function createUser(user: AppCreateUpdateUser) {
        await mutation.mutateAsync({ action: "create", user });
    }

    async function updateUser(user: AppCreateUpdateUser) {
        await mutation.mutateAsync({ action: "update", user });
    }

    return { createUser, updateUser, mutation };
}
