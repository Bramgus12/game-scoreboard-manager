import {
    Box,
    Button,
    Grid2,
    Paper,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableHead,
    TableRow,
    tableRowClasses,
    Typography,
} from "@mui/material";
import { UUID } from "crypto";
import { getRounds } from "@/app/scoreboard/[id]/actions";
import RoundRow from "@/pageComponents/scoreboardId/KlaverjasTable/components/RoundRow";

export default async function KlaverjasTable(props: { id: UUID }) {
    const { id } = props;

    const rounds = await getRounds(id);

    if (rounds.length === 0) {
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
                            <Button>{"Create new round"}</Button>
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
                    border: `1px solid var(--mui-palette-primary-main)`,
                }}
            >
                <Table>
                    <TableHead
                        sx={{
                            [`& .${tableCellClasses.root}`]: {
                                borderBottom: `1px solid var(--mui-palette-primary-main)`,
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
                        {rounds.map((round, index) => (
                            <RoundRow
                                round={round}
                                isLastRound={index === rounds.length - 1}
                                key={round.roundNumber}
                            />
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Paper>
    );
}
