import { Paper, Typography } from "@mui/material";
import { UUID } from "crypto";
import { getTotals } from "@/app/[lng]/scoreboard/[id]/actions";

export default async function Totals({ id }: { id: UUID }) {
    const data = await getTotals(id);

    return (
        <Paper>
            <Typography variant="h6">{"Totals"}</Typography>
            <Typography variant="h3">
                <code>{`${data?.us} vs ${data?.them}`}</code>
            </Typography>
        </Paper>
    );
}
