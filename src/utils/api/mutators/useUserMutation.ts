import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUpdateUser } from "../../../models/domain/CreateUpdateUser";
import { useAPI } from "../useAPI";

type MutationProps = {
    action: "create" | "update";
    user: CreateUpdateUser;
};

export function useUserMutation() {
    const {
        user: { post, put },
    } = useAPI();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ["user"],
        mutationFn: async (mutationProps: MutationProps) => {
            if (mutationProps.action === "create") {
                return await post(mutationProps.user);
            }
            return await put(mutationProps.user);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);
        },
    });

    async function createUser(user: CreateUpdateUser) {
        await mutation.mutateAsync({ action: "create", user });
    }

    async function updateUser(user: CreateUpdateUser) {
        await mutation.mutateAsync({ action: "update", user });
    }

    return { createUser, updateUser, mutation };
}
