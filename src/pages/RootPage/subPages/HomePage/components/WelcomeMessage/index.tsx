import { Skeleton, Stack, Typography } from "@mui/material";
import { ErrorOutlineRounded } from "@mui/icons-material";
import { useUserQuery } from "utils/api/queries/useUserQuery";

export default function WelcomeMessage() {
    const { data, isPending, isError } = useUserQuery();

    if (isPending) {
        return <Skeleton height={45} />;
    }

    if (isError) {
        return (
            <Stack direction="row" alignItems="center" spacing={2}>
                <ErrorOutlineRounded />
                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    Error happened while getting the user data
                </Typography>
            </Stack>
        );
    }

    return (
        <Typography variant="h4">
            Welcome, {data?.firstName} {data?.lastName}!
        </Typography>
    );
}
