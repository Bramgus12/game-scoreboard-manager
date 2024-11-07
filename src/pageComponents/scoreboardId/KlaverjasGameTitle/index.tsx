import { Paper, Skeleton, Typography } from "@mui/material";
import { UUID } from "crypto";
import { useQuery } from "@tanstack/react-query";
import { getTeamNames } from "@/app/scoreboard/[id]/actions";

export default function KlaverjasGameTitle({ id }: { id: UUID }) {
    const { data, isPending, isError } = useQuery({
        queryKey: ["klaverjasGameTitle", { id }],
        queryFn: () => getTeamNames(id),
    });

    if (isPending) {
        return <Skeleton sx={{ height: 75 }} />;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h4">
                <code>{`${data.us} vs ${data.them}`}</code>
            </Typography>
        </Paper>
    );
}
