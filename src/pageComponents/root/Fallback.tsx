import { Skeleton, Stack } from "@mui/material";

export default function RootFallback() {
    return (
        <Stack spacing={2}>
            {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} variant="rounded" sx={{ height: 105 }} />
            ))}
        </Stack>
    );
}
