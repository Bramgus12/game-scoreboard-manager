import { Paper, Typography } from "@mui/material";
import { AppKlaverjasTeam } from "../../../../../../../../models/app/klaverjasTeam/KlaverjasTeam";
import { useParams } from "react-router-dom";
import { UUID } from "crypto";
import useKlaverjasRoundQuery from "../../../../../../../../utils/api/queries/useKlaverjasRoundQuery";

export default function Totals(props: { teams: AppKlaverjasTeam[] }) {
    const { teams } = props;

    const { id: scoreboardId } = useParams<{ id: UUID }>();

    const {
        data: team1Data,
        isPending: team1IsPending,
        isError: team1IsError,
    } = useKlaverjasRoundQuery(scoreboardId, teams[0].id);
    const {
        data: team2Data,
        isPending: team2IsPending,
        isError: team2IsError,
    } = useKlaverjasRoundQuery(scoreboardId, teams[1].id);

    if (team1IsPending || team2IsPending) {
        return <div>Loading...</div>;
    }

    if (team1IsError || team2IsError) {
        return <div>Error</div>;
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
