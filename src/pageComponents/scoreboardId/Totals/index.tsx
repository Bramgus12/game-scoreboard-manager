import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import { ErrorOutlineRounded } from "@mui/icons-material";
import { UUID } from "crypto";
import { useQuery } from "@tanstack/react-query";
import { getTotals } from "@/app/scoreboard/[id]/actions";

export default function Totals({ id }: { id: UUID }) {
    const { data, isPending, isError } = useQuery({
        queryKey: ["totals", id],
        queryFn: () => getTotals(id),
    });

    if (isPending) {
        return <Skeleton sx={{ height: 120 }} />;
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
                        {"Failed to get totals"}
                    </Typography>
                </Stack>
            </Paper>
        );
    }

    return (
        <Paper>
            <Typography variant="h6">{"Totals"}</Typography>
            <Typography variant="h3">
                <code>{`${data?.us} vs ${data?.them}`}</code>
            </Typography>
        </Paper>
    );
}
