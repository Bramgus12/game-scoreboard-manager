import { useQuery } from "@tanstack/react-query";
import { useAPI } from "../useAPI";
import { getUserQueryKey } from "./queryKeyFunctions";

export function useUserQuery() {
    const {
        user: { get },
    } = useAPI();

    return useQuery({ queryKey: getUserQueryKey(), queryFn: () => get() });
}
