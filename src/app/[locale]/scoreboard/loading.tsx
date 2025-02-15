import { Skeleton, Stack } from "@mui/material";

export default function Loading() {
    return (
        <Stack spacing={2}>
            <Skeleton variant="rounded" sx={{ height: 35, width: "60%" }} />
            <Skeleton variant="rounded" sx={{ height: 600 }} />
        </Stack>
    );
}
