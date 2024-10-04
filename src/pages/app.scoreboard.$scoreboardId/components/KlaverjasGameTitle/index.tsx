import { Skeleton, Typography } from "@mui/material";
import useKlaverjasTeamQuery from "utils/api/queries/useKlaverjasTeamQuery";
import { UUID } from "crypto";
import { useParams } from "@tanstack/react-router";

export default function KlaverjasGameTitle() {
    const { scoreboardId } = useParams({ from: "/app/scoreboard/$scoreboardId" });

    const id = scoreboardId as UUID;

    const { data, isPending, isError } = useKlaverjasTeamQuery(id);

    if (isPending) {
        return <Skeleton sx={{ height: 45 }} />;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <Typography variant="h4">
            {`Klaverjas game with teams: ${data[0].name} and ${data[1].name}`}
        </Typography>
    );
}
