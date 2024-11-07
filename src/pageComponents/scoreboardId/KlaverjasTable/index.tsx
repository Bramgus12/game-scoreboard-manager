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
import { UUID } from "crypto";
import { MergedRound } from "@/pageComponents/scoreboardId/KlaverjasTable/interfaces";
import { useQuery } from "@tanstack/react-query";
import { getRounds } from "@/app/scoreboard/[id]/actions";
import { ErrorOutlineRounded } from "@mui/icons-material";
import RoundRow from "@/pageComponents/scoreboardId/KlaverjasTable/components/RoundRow";

export default function KlaverjasTable(props: {
    id: UUID;
    onNewRoundClick: () => void;
    onEditClick: (round: MergedRound) => void;
    onDeleteClick: (round: MergedRound) => void;
}) {
    const { id, onNewRoundClick, onEditClick, onDeleteClick } = props;

    const theme = useTheme();

    const {
        data: mergedData,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["klaverjasTable", { id }],
        queryFn: () => getRounds(id),
    });

    if (isPending) {
        return <Skeleton sx={{ height: 680 }} />;
    }

    if (isError) {
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
                        {"Failed to get rounds"}
                    </Typography>
                </Stack>
            </Paper>
        );
    }

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
                            <Typography>
                                {"No rounds have been played yet"}
                            </Typography>
                        </Grid2>
                        <Grid2>
                            <Button onClick={onNewRoundClick}>
                                {"Create new round"}
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
                            <TableCell variant="head" />
                            <TableCell variant="head" align="right">
                                {"Us"}
                            </TableCell>
                            <TableCell variant="head" align="right">
                                {"Them"}
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
                        {mergedData.map((round, index) => (
                            <RoundRow
                                round={round}
                                isLastRound={index === mergedData.length - 1}
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
