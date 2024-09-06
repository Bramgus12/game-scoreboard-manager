import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../useAuth";
import { SignInWithPasswordCredentials } from "@supabase/supabase-js";

export default function useUserLoginMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["userLogin"],
        mutationFn: async (credentials: SignInWithPasswordCredentials) => {
            const signInResult = await supabase.auth.signInWithPassword(credentials);

            if (signInResult.error != null) {
                throw signInResult.error;
            }

            return signInResult.data;
        },
        onError: (error) => {
            console.error(error);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);
        },
    });
}
