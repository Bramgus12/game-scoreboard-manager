import { Paper, Typography } from "@mui/material";
import { AppKlaverjasTeam } from "models/app/klaverjasTeam/KlaverjasTeam";
import useKlaverjasRoundQuery from "../../../../../../../../utils/api/queries/useKlaverjasRoundQuery";
import { useParams } from "react-router-dom";
import { UUID } from "crypto";

export default function CurrentRoundNumber(props: { teams: AppKlaverjasTeam[] }) {
    const { teams } = props;
    const { id } = useParams<{ id: UUID }>();

    const { data, isPending, isError } = useKlaverjasRoundQuery(id, teams[0].id);

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
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
