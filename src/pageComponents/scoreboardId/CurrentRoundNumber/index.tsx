import { Paper, Typography } from "@mui/material";
import { UUID } from "crypto";
import { getRoundNumber } from "@/app/[lng]/scoreboard/[id]/actions";

export default async function CurrentRoundNumber({ id }: { id: UUID }) {
    const data = await getRoundNumber(id);

    return (
        <Paper>
            <Typography variant="h6">{"Current round no."}</Typography>
            <Typography variant="h2">
                <code>{data}</code>
            </Typography>
        </Paper>
    );
}
