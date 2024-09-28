import { Grid2, Skeleton } from "@mui/material";

export default function LoadingComponent() {
    return (
        <Grid2 container alignItems="center" spacing={2}>
            <Grid2 size={8}>
                <Skeleton variant="text" sx={{ height: 45 }} />
            </Grid2>
            <Grid2 size={6}>
                <Skeleton sx={{ height: 680 }} />
            </Grid2>
            <Grid2 container size={6} alignSelf="flex-start">
                <Grid2 size={12}>
                    <Skeleton sx={{ height: 200 }} />
                </Grid2>
                <Grid2 size={12}>
                    <Skeleton sx={{ height: 200 }} />
                </Grid2>
            </Grid2>
        </Grid2>
    );
}
