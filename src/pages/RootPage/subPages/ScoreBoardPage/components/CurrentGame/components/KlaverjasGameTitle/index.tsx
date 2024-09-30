import { Skeleton, Typography } from "@mui/material";
import useKlaverjasTeamQuery from "utils/api/queries/useKlaverjasTeamQuery";
import { useParams } from "react-router-dom";
import { UUID } from "crypto";

export default function KlaverjasGameTitle() {
    const { id } = useParams<{ id: UUID }>();

    const { data, isPending, isError } = useKlaverjasTeamQuery(id);

    if (isPending) {
        return <Skeleton variant="text" sx={{ height: 45 }} />;
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
