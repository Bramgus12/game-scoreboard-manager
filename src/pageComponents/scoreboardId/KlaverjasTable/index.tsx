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
import { getRounds } from "@/app/[lng]/scoreboard/[id]/actions";
import RoundRow from "@/pageComponents/scoreboardId/KlaverjasTable/components/RoundRow";
import Link from "next/link";
import { Language } from "@/app/i18n/settings";
import { translation } from "@/app/i18n";

export default async function KlaverjasTable(props: { id: UUID; lng: Language }) {
    const { id, lng } = props;

    const { t } = await translation(lng, "scoreboardCurrentPage");

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
                            <Typography>{t("table.noRoundsPlayedYet")}</Typography>
                        </Grid2>
                        <Grid2>
                            <Button
                                component={Link}
                                href={`/${lng}/scoreboard/${id}/round`}
                            >
                                {t("table.createNewRound")}
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
                                {t("table.us")}
                            </TableCell>
                            <TableCell variant="head" align="right">
                                {t("table.them")}
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
                                scoreboardId={id}
                                round={round}
                                isLastRound={index === rounds.length - 1}
                                key={round.roundNumber}
                                lng={lng}
                            />
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Paper>
    );
}
