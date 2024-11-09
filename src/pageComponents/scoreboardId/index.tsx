import { Grid2 } from "@mui/material";
import KlaverjasGameTitle from "@/pageComponents/scoreboardId/KlaverjasGameTitle";
import CurrentRoundNumber from "@/pageComponents/scoreboardId/CurrentRoundNumber";
import Totals from "@/pageComponents/scoreboardId/Totals";
import { UUID } from "crypto";
import DialogsAndTable from "@/pageComponents/scoreboardId/DialogsAndTable";
import { Language } from "@/app/i18n/settings";

export default function ScoreboardId({ id, lng }: { id: UUID; lng: Language }) {
    return (
        <>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <KlaverjasGameTitle id={id} lng={lng} />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <DialogsAndTable id={id} lng={lng} />
                </Grid2>
                <Grid2 container direction="column" size={{ xs: 12, md: 6 }}>
                    <Grid2>
                        <CurrentRoundNumber id={id} lng={lng} />
                    </Grid2>
                    <Grid2>
                        <Totals id={id} lng={lng} />
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    );
}
