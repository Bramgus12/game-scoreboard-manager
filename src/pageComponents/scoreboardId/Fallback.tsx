import { Grid2, Skeleton } from "@mui/material";

export default function ScoreboardIdFallback() {
    return (
        <Grid2 container spacing={2}>
            <Grid2 size={12}>
                <Skeleton variant="rounded" sx={{ height: 75 }} />
            </Grid2>
            <Grid2 container size={12}>
                <Grid2 size={6}>
                    <Skeleton variant="rounded" sx={{ height: 600 }} />
                </Grid2>
                <Grid2 container size={6} direction="column">
                    <Grid2>
                        <Skeleton variant="rounded" sx={{ height: 140 }} />
                    </Grid2>
                    <Grid2>
                        <Skeleton variant="rounded" sx={{ height: 120 }} />
                    </Grid2>
                </Grid2>
            </Grid2>
        </Grid2>
    );
}
