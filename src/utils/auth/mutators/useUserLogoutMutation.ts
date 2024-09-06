import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../useAuth";

export default function useUserLogoutMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["userLogout"],
        mutationFn: async () => {
            const signOutResult = await supabase.auth.signOut();

            if (signOutResult.error != null) {
                throw signOutResult.error;
            }
        },
        onError: (error) => {
            console.error(error);
        },
        onSuccess: () => {
            queryClient.setQueryData(["authUser"], null);
        },
    });
}
