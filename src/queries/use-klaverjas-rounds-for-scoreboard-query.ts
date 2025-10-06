import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import QUERY_KEY from "@/constants/query-key";
import { UUID } from "crypto";
import { getRoundsForScoreboard } from "@/actions/klaverjas-actions";
import { MergedRound } from "@/models/app/klaverjas-round/merged-round";

export function getKlaverjasRoundsForScoreboardQueryOptions(
    scoreboardId: UUID | null,
): UseQueryOptions<Array<MergedRound>> {
    return {
        queryKey: [QUERY_KEY.KLAVERJAS_ROUNDS_FOR_SCOREBOARD, { scoreboardId }],
        queryFn: () => {
            if (scoreboardId == null) {
                throw new Error("scoreboardId is null");
            }

            return getRoundsForScoreboard(scoreboardId);
        },
    };
}

export default function useKlaverjasRoundsForScoreboardQuery(
    scoreboardId: UUID | null,
) {
    return useQuery(getKlaverjasRoundsForScoreboardQueryOptions(scoreboardId));
}
