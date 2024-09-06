import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { supabase } from "../useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUserSignupMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["userSignup"],
        mutationFn: async (credentials: SignUpWithPasswordCredentials) => {
            const singupResult = await supabase.auth.signUp(credentials);

            if (singupResult.error != null) {
                throw singupResult.error;
            }

            return singupResult.data;
        },
        onError: (error) => {
            console.error(error);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["authUser"], data);
        },
    });
}
