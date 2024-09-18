import { UUID } from "crypto";
import { useQuery } from "@tanstack/react-query";
import { getKlaverjasTeamQueryKey } from "./queryKeyFunctions";
import { useAPI } from "../useAPI";

export default function useKlaverjasTeamQuery(scoreboardId: UUID) {
    const {
        klaverjasTeam: { getByScoreboardId },
    } = useAPI();

    return useQuery({
        queryKey: getKlaverjasTeamQueryKey(scoreboardId),
        queryFn: () => {
            if (scoreboardId != null) {
                return getByScoreboardId(scoreboardId);
            }
            throw new Error("scoreboardId is required");
        },
    });
}
