import {
    Box,
    Button,
    Grid2,
    Paper,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableHead,
    TableRow,
    tableRowClasses,
    Typography,
    useTheme,
} from "@mui/material";
import useKlaverjasRoundQuery from "utils/api/queries/useKlaverjasRoundQuery";
import { useParams } from "react-router-dom";
import { UUID } from "crypto";
import useKlaverjasTeamQuery from "utils/api/queries/useKlaverjasTeamQuery";
import { ErrorOutlineRounded } from "@mui/icons-material";
import { MergedRound } from "pages/RootPage/subPages/ScoreBoardPage/components/CurrentGame/components/KlaverjasTable/interfaces";
import RoundRow from "pages/RootPage/subPages/ScoreBoardPage/components/CurrentGame/components/KlaverjasTable/components/RoundRow";

export default function KlaverjasTable(props: {
    onNewRoundClick: () => void;
    onEditClick: (round: MergedRound) => void;
    onDeleteClick: (round: MergedRound) => void;
}) {
    const { onNewRoundClick, onEditClick, onDeleteClick } = props;

    const theme = useTheme();

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
        return <Skeleton sx={{ height: 680 }} />;
    }

    if (team1IsError || team2IsError) {
        return (
            <Paper sx={{ height: 680 }}>
                <Stack
                    height={1}
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    <ErrorOutlineRounded />
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        Error happened while getting the rounds
                    </Typography>
                </Stack>
            </Paper>
        );
    }

    const mergedData: Array<MergedRound> = team1Data
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
            <Paper>
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
                            <Button onClick={onNewRoundClick}>
                                Create a new round
                            </Button>
                        </Grid2>
                    </Grid2>
                </Box>
            </Paper>
        );
    }

    return (
        <Paper>
            <Box
                sx={{
                    borderRadius: 4,
                    border: `1px solid ${theme.palette.primary.main}`,
                }}
            >
                <Table>
                    <TableHead
                        sx={{
                            [`& .${tableCellClasses.root}`]: {
                                borderBottom: `1px solid ${theme.palette.primary.main}`,
                            },
                        }}
                    >
                        <TableRow>
                            <TableCell variant="head" align="right">
                                Round
                            </TableCell>
                            <TableCell variant="head" align="right">
                                Us
                            </TableCell>
                            <TableCell variant="head" align="right">
                                Them
                            </TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody
                        sx={{
                            [`& .${tableRowClasses.root}:last-of-type`]: {
                                [`& .${tableCellClasses.root}`]: {
                                    borderBottom: "none",
                                },
                            },
                        }}
                    >
                        {mergedData.map((round) => (
                            <RoundRow
                                round={round}
                                key={round.roundNumber}
                                onEditClick={onEditClick}
                                onDeleteClick={onDeleteClick}
                            />
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Paper>
    );
}
