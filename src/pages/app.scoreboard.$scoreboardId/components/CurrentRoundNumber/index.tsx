import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import useKlaverjasRoundQuery from "utils/api/queries/useKlaverjasRoundQuery";
import { UUID } from "crypto";
import useKlaverjasTeamQuery from "utils/api/queries/useKlaverjasTeamQuery";
import { ErrorOutlineRounded } from "@mui/icons-material";
import { useParams } from "@tanstack/react-router";

export default function CurrentRoundNumber() {
    const { scoreboardId } = useParams({ from: "/app/scoreboard/$scoreboardId" });

    const id = scoreboardId as UUID;

    const { data: teams } = useKlaverjasTeamQuery(id);

    const { data, isPending, isError } = useKlaverjasRoundQuery(id, teams?.[0].id);

    if (isPending) {
        return <Skeleton sx={{ height: 200 }} />;
    }

    if (isError) {
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
                        Error happened while getting the round totals
                    </Typography>
                </Stack>
            </Paper>
        );
    }

    return (
        <Paper>
            <Typography variant="h6">Current round no.</Typography>
            <Typography variant="h2">
                <code>{data.length + 1}</code>
            </Typography>
        </Paper>
    );
}
