import { useUserQuery } from "../../../../utils/api/queries/useUserQuery";
import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import ScoreboardList from "./components/ScoreboardList";

export default function HomePage() {
    const theme = useTheme();

    const { data, isPending, isError } = useUserQuery();

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <Box sx={{ padding: theme.spacing(10, 15) }}>
            <Stack spacing={2}>
                <Typography variant="h4">
                    Welcome, {data?.firstName} {data?.lastName}!
                </Typography>
                <Paper>
                    <Stack spacing={2}>
                        <Typography variant="h5">Recent games</Typography>
                        <ScoreboardList />
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    );
}
