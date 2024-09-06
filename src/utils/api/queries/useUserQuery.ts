import { useQuery } from "@tanstack/react-query";
import { useAPI } from "../useAPI";

export function useUserQuery() {
    const {
        user: { get },
    } = useAPI();

    return useQuery({ queryKey: ["user"], queryFn: () => get() });
}
