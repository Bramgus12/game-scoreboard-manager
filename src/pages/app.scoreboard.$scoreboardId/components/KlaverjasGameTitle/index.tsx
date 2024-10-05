import { Paper, Skeleton, Typography } from "@mui/material";
import useKlaverjasTeamQuery from "utils/api/queries/useKlaverjasTeamQuery";
import { UUID } from "crypto";
import { useParams } from "@tanstack/react-router";

export default function KlaverjasGameTitle() {
    const { scoreboardId } = useParams({ from: "/app/scoreboard/$scoreboardId" });

    const id = scoreboardId as UUID;

    const { data, isPending, isError } = useKlaverjasTeamQuery(id);

    if (isPending) {
        return <Skeleton sx={{ height: 75 }} />;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h4">
                <code>{`${data[0].name}  `}</code>
                vs
                <code>{` ${data[1].name}`}</code>
            </Typography>
        </Paper>
    );
}
