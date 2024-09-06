import { useQuery } from "@tanstack/react-query";
import { supabase } from "../useAuth";

export default function useAuthUserQuery() {
    return useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            const userResult = await supabase.auth.getUser();

            if (userResult.error != null) {
                throw userResult.error;
            }

            return userResult.data;
        },
        retry: 0,
    });
}
