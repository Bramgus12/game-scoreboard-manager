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
import { UUID } from "crypto";
import useKlaverjasTeamQuery from "utils/api/queries/useKlaverjasTeamQuery";
import { ErrorOutlineRounded } from "@mui/icons-material";
import { MergedRound } from "pages/app.scoreboard.$scoreboardId/components/KlaverjasTable/interfaces";
import { useParams } from "@tanstack/react-router";
import RoundRow from "pages/app.scoreboard.$scoreboardId/components/KlaverjasTable/components/RoundRow";
import { useTranslation } from "react-i18next";

export default function KlaverjasTable(props: {
    onNewRoundClick: () => void;
    onEditClick: (round: MergedRound) => void;
    onDeleteClick: (round: MergedRound) => void;
}) {
    const { onNewRoundClick, onEditClick, onDeleteClick } = props;

    const { t } = useTranslation("scoreboardCurrentPage");

    const theme = useTheme();

    const { scoreboardId: id } = useParams({
        from: "/app/scoreboard/$scoreboardId",
    });

    const scoreboardId = id as UUID;

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
                        {t("table.error")}
                    </Typography>
                </Stack>
            </Paper>
        );
    }

    const mergedData: Array<MergedRound> = team1Data
        .sort((a, b) => a.roundNumber - b.roundNumber)
        .map((team1Round, index) => {
            const team2Round = team2Data?.find(
                (r) => r.roundNumber === team1Round.roundNumber,
            );

            if (team2Round == null) {
                return undefined;
            }

            return {
                roundNumber: index + 1,
                team1: team1Round,
                team2: team2Round,
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
                            <Typography>{t("table.noRoundsPlayedYet")}</Typography>
                        </Grid2>
                        <Grid2>
                            <Button onClick={onNewRoundClick}>
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
