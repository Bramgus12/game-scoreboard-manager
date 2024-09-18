import { useQuery } from "@tanstack/react-query";
import { getScoreboardQueryKey } from "./queryKeyFunctions";
import { UUID } from "crypto";
import { useAPI } from "../useAPI";

export default function useScoreboardQuery(scoreboardId?: UUID) {
    const {
        scoreboard: { getById },
    } = useAPI();

    return useQuery({
        queryKey: getScoreboardQueryKey(scoreboardId),
        queryFn: () => {
            if (scoreboardId != null) {
                return getById(scoreboardId);
            }
            throw new Error("scoreboardId cannot be null");
        },
    });
}
