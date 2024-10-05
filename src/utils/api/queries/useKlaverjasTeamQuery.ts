import { UUID } from "crypto";
import { useQuery } from "@tanstack/react-query";
import { getKlaverjasTeamQueryKey } from "./queryKeyFunctions";
import { useAPI } from "../useAPI";
import { TEAM_TYPE } from "constants/teamType";

export default function useKlaverjasTeamQuery(scoreboardId: UUID | undefined) {
    const {
        klaverjasTeam: { getByScoreboardId },
    } = useAPI();

    return useQuery({
        queryKey: getKlaverjasTeamQueryKey(scoreboardId),
        queryFn: async () => {
            if (scoreboardId != null) {
                const teams = await getByScoreboardId(scoreboardId);

                const themTeam = teams.find((team) => team.type === TEAM_TYPE.THEM);
                const usTeam = teams.find((team) => team.type === TEAM_TYPE.US);

                if (usTeam == null || themTeam == null) {
                    throw new Error("Teams not found");
                }

                // This makes sure that we can always assume that `teams[0]` is of type `US` and `teams[1]` is of type `THEM`
                return [usTeam, themTeam];
            }
            throw new Error("scoreboardId is required");
        },
        enabled: scoreboardId != null,
    });
}
