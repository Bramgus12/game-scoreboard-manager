import { useQuery } from "@tanstack/react-query";
import { getScoreboardsQueryKey } from "./queryKeyFunctions";
import { useAPI } from "../useAPI";

export default function useScoreboardsQuery() {
    const {
        scoreboard: { get },
    } = useAPI();

    return useQuery({
        queryKey: getScoreboardsQueryKey(),
        queryFn: get,
    });
}
