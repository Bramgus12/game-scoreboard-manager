import { useQuery } from "@tanstack/react-query";
import { supabase } from "../useAuth";

export function useAuthSessionQuery() {
    return useQuery({
        queryKey: ["session"],
        queryFn: async () => {
            const session = await supabase.auth.getSession();

            if (session.error != null) {
                throw session.error;
            }

            return session.data;
        },
    });
}
