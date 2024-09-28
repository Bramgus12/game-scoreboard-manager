import { useQuery } from "@tanstack/react-query";
import { getKlaverjasRoundQueryKey } from "./queryKeyFunctions";
import { UUID } from "crypto";
import { useAPI } from "../useAPI";

export default function useKlaverjasRoundQuery(
    scoreboardId?: UUID,
    klaverjasTeamId?: UUID,
) {
    const {
        klaverjasRound: { getByTeamId },
    } = useAPI();

    return useQuery({
        queryKey: getKlaverjasRoundQueryKey(scoreboardId, klaverjasTeamId),
        queryFn: () => {
            if (scoreboardId != null && klaverjasTeamId != null) {
                return getByTeamId(scoreboardId, klaverjasTeamId);
            }
            throw new Error("scoreboardId and klaverjasTeamId are required");
        },
    });
}
