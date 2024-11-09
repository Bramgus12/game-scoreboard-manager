import { Paper, Typography } from "@mui/material";
import { UUID } from "crypto";
import { getTeamNames } from "@/app/[lng]/scoreboard/[id]/actions";

export default async function KlaverjasGameTitle({ id }: { id: UUID }) {
    const data = await getTeamNames(id);

    return (
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h4">
                <code>{`${data.us} vs ${data.them}`}</code>
            </Typography>
        </Paper>
    );
}
