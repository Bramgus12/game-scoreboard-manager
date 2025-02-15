import { Grid2 } from "@mui/material";
import KlaverjasGameTitle from "@/pageComponents/klaverjasGame/KlaverjasGameTitle";
import CurrentRoundNumber from "@/pageComponents/klaverjasGame/CurrentRoundNumber";
import Totals from "@/pageComponents/klaverjasGame/Totals";
import { UUID } from "crypto";
import DialogsAndTable from "@/pageComponents/klaverjasGame/DialogsAndTable";

export default function KlaverjasGame({ id }: { id: UUID }) {
    return (
        <>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <KlaverjasGameTitle id={id} />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <DialogsAndTable id={id} />
                </Grid2>
                <Grid2 container direction="column" size={{ xs: 12, md: 6 }}>
                    <Grid2>
                        <CurrentRoundNumber id={id} />
                    </Grid2>
                    <Grid2>
                        <Totals id={id} />
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    );
}
