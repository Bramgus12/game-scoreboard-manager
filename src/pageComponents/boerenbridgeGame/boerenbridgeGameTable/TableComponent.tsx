import { AppBoerenbridgePlayer } from "@/models/app/boerenbridgePlayer/boerenbridgePlayer";
import { createTableData } from "@/pageComponents/boerenbridgeGame/boerenbridgeGameTable/getTableDateAndColumns";
import { AppBoerenbridgeGame } from "@/models/app/boerenbridgeGame/boerenbridgeGame";
import {
    Box,
    Grid2,
    Paper,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableHead,
    TableRow,
    tableRowClasses,
} from "@mui/material";
import { Fragment } from "react";

export default function BoerenbridgeTableComponent(props: {
    players: Array<AppBoerenbridgePlayer>;
    game: AppBoerenbridgeGame;
}) {
    const { players, game } = props;

    const data = createTableData(players, game);

    return (
        <Paper>
            <Grid2 container>
                <Grid2>
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
                                    <TableCell
                                        variant="head"
                                        sx={{
                                            borderRight: `1px solid var(--mui-palette-primary-main)`,
                                        }}
                                    />
                                    {players.map((player, index) => (
                                        <TableCell
                                            variant="head"
                                            colSpan={2}
                                            align={"center"}
                                            key={player.id}
                                            sx={{
                                                borderRight:
                                                    players.length === index + 1
                                                        ? undefined
                                                        : `1px solid var(--mui-palette-primary-main)`,
                                            }}
                                        >
                                            {player.name}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        variant="head"
                                        sx={{
                                            borderRight: `1px solid var(--mui-palette-primary-main)`,
                                        }}
                                    />
                                    {players.map((player, index) => (
                                        <Fragment key={player.id}>
                                            <TableCell
                                                variant="head"
                                                align="right"
                                                sx={{
                                                    borderRight: `1px solid var(--mui-palette-grey-700)`,
                                                }}
                                            >
                                                Guess
                                            </TableCell>
                                            <TableCell
                                                variant="head"
                                                align="right"
                                                sx={{
                                                    borderRight:
                                                        players.length === index + 1
                                                            ? undefined
                                                            : `1px solid var(--mui-palette-primary-main)`,
                                                }}
                                            >
                                                Points
                                            </TableCell>
                                        </Fragment>
                                    ))}
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
                                {data.map((round) => (
                                    <TableRow key={round.roundNumber}>
                                        <TableCell
                                            align="right"
                                            variant="body"
                                            sx={{
                                                width: 10,
                                                padding: 1,
                                                borderRight: `1px solid var(--mui-palette-primary-main)`,
                                            }}
                                        >
                                            {round.roundNumber}
                                        </TableCell>
                                        {players.map((player, index) => (
                                            <Fragment key={player.id}>
                                                <TableCell
                                                    variant="body"
                                                    align="right"
                                                    sx={{
                                                        width: 0.5,
                                                        padding: 1,
                                                        borderRight: `1px solid var(--mui-palette-grey-700)`,
                                                    }}
                                                >
                                                    {round[player.name]?.guess}
                                                </TableCell>
                                                <TableCell
                                                    variant="body"
                                                    sx={{
                                                        width: 0.5,
                                                        padding: 1,
                                                        borderRight:
                                                            players.length ===
                                                            index + 1
                                                                ? undefined
                                                                : `1px solid var(--mui-palette-primary-main)`,
                                                    }}
                                                    align="right"
                                                >
                                                    {round[player.name]?.points}
                                                </TableCell>
                                            </Fragment>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Grid2>
            </Grid2>
        </Paper>
    );
}
