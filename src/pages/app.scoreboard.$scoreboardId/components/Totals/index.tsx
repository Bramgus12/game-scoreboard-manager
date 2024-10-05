import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import useKlaverjasRoundQuery from "utils/api/queries/useKlaverjasRoundQuery";
import useKlaverjasTeamQuery from "utils/api/queries/useKlaverjasTeamQuery";
import { ErrorOutlineRounded } from "@mui/icons-material";
import { useParams } from "@tanstack/react-router";
import { UUID } from "crypto";
import { MergedRound } from "pages/app.scoreboard.$scoreboardId/components/KlaverjasTable/interfaces";
import { getFame } from "utils/funcs/getFame";

export default function Totals() {
    const { scoreboardId } = useParams({ from: "/app/scoreboard/$scoreboardId" });

    const id = scoreboardId as UUID;

    const { data: teams } = useKlaverjasTeamQuery(id);

    const {
        data: team1Data,
        isPending: team1IsPending,
        isError: team1IsError,
    } = useKlaverjasRoundQuery(id, teams?.[0].id);
    const {
        data: team2Data,
        isPending: team2IsPending,
        isError: team2IsError,
    } = useKlaverjasRoundQuery(id, teams?.[1].id);

    if (team1IsPending || team2IsPending) {
        return <Skeleton sx={{ height: 120 }} />;
    }

    if (team1IsError || team2IsError) {
        return (
            <Paper sx={{ height: 150 }}>
                <Stack
                    height={1}
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    <ErrorOutlineRounded />
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        Error happened while getting the totals
                    </Typography>
                </Stack>
            </Paper>
        );
    }

    const mergedRounds: Array<MergedRound> = team1Data
        .sort((a, b) => a.roundNumber - b.roundNumber)
        .map((round, index) => {
            const matchingRound = team2Data.find(
                (r) => r.roundNumber === round.roundNumber,
            );

            if (!matchingRound) {
                throw new Error("Round not found");
            }

            return {
                roundNumber: round.roundNumber,
                team1: round,
                team2: team2Data[index],
            };
        });

    const totals = mergedRounds.reduce<{ us: number; them: number }>(
        (accumulator, currentValue) => {
            const returnValue = { ...accumulator };

            const usFame = getFame(currentValue, "team1");
            const themFame = getFame(currentValue, "team2");

            returnValue.us += currentValue.team1.points + usFame;
            returnValue.them += currentValue.team2.points + themFame;

            return returnValue;
        },
        { us: 0, them: 0 },
    );

    return (
        <Paper>
            <Typography variant="h6">Totals</Typography>
            <Typography variant="h3">
                <code>{`${totals.us} `}</code>
                vs
                <code>{` ${totals.them}`}</code>
            </Typography>
        </Paper>
    );
}
