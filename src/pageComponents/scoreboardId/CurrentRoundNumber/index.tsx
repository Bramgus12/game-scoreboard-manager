import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import { UUID } from "crypto";
import { ErrorOutlineRounded } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { getRoundNumber } from "@/app/scoreboard/[id]/actions";

export default function CurrentRoundNumber({ id }: { id: UUID }) {
    const { data, isPending, isError } = useQuery({
        queryKey: ["currentRoundNumber", { id }],
        queryFn: () => getRoundNumber(id),
    });

    if (isPending) {
        return <Skeleton sx={{ height: 136 }} />;
    }

    if (isError) {
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
                        {"Failed to get round no."}
                    </Typography>
                </Stack>
            </Paper>
        );
    }

    return (
        <Paper>
            <Typography variant="h6">{"Current round no."}</Typography>
            <Typography variant="h2">
                <code>{data}</code>
            </Typography>
        </Paper>
    );
}
