import {
    Box,
    Button,
    Grid2,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { AppKlaverjasTeam } from "models/app/klaverjasTeam/KlaverjasTeam";
import useKlaverjasRoundQuery from "utils/api/queries/useKlaverjasRoundQuery";
import { useParams } from "react-router-dom";
import { UUID } from "crypto";

export default function KlaverjasTable(props: {
    teams: AppKlaverjasTeam[];
    onNewRoundClick: () => void;
}) {
    const { teams, onNewRoundClick } = props;

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

    const mergedData = team1Data
        .map((round, index) => {
            if (team2Data[index] == null) {
                return undefined;
            }

            return {
                roundNumber: index + 1,
                team1: round,
                team2: team2Data[index],
            };
        })
        .filter((round) => round != null);

    if (mergedData.length === 0) {
        return (
            <Box sx={{ height: 150 }}>
                <Grid2
                    height={1}
                    direction="column"
                    container
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid2>
                        <Typography>No rounds have been played yet</Typography>
                    </Grid2>
                    <Grid2>
                        <Button onClick={onNewRoundClick}>Create a new round</Button>
                    </Grid2>
                </Grid2>
            </Box>
        );
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="right">Round</TableCell>
                    <TableCell align="right">Us</TableCell>
                    <TableCell align="right">Them</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {mergedData.map((round) => (
                    <TableRow key={round.roundNumber}>
                        <TableCell sx={{ width: 20, padding: 1 }}>
                            {round.roundNumber}
                        </TableCell>
                        <TableCell sx={{ padding: 1 }} align="right">
                            {round.team1.points}
                        </TableCell>
                        <TableCell sx={{ padding: 1 }} align="right">
                            {round.team2.points}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
