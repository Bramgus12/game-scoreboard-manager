import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { UUID } from "crypto";
import useKlaverjasRoundQuery from "utils/api/queries/useKlaverjasRoundQuery";
import useKlaverjasTeamQuery from "utils/api/queries/useKlaverjasTeamQuery";
import { ErrorOutlineRounded } from "@mui/icons-material";

export default function Totals() {
    const { id: scoreboardId } = useParams<{ id: UUID }>();

    const { data: teams } = useKlaverjasTeamQuery(scoreboardId);

    const {
        data: team1Data,
        isPending: team1IsPending,
        isError: team1IsError,
    } = useKlaverjasRoundQuery(scoreboardId, teams?.[0].id);
    const {
        data: team2Data,
        isPending: team2IsPending,
        isError: team2IsError,
    } = useKlaverjasRoundQuery(scoreboardId, teams?.[1].id);

    if (team1IsPending || team2IsPending) {
        return <Skeleton sx={{ height: 200 }} />;
    }

    if (team1IsError || team2IsError) {
        return (
            <Paper sx={{ height: 150 }}>
                <Stack
                    height={1}
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    <ErrorOutlineRounded />
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        Error happened while getting the totals
                    </Typography>
                </Stack>
            </Paper>
        );
    }

    const team1Total = team1Data.reduce((acc, round) => acc + round.points, 0);
    const team2Total = team2Data.reduce((acc, round) => acc + round.points, 0);

    return (
        <Paper>
            <Typography variant="h6">Totals</Typography>
            <Typography variant="h3">
                <code>{`${team1Total} `}</code>
                vs
                <code>{` ${team2Total}`}</code>
            </Typography>
        </Paper>
    );
}
