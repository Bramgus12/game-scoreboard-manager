import { Paper, Typography } from "@mui/material";
import { UUID } from "crypto";
import { getTotals } from "@/app/[lng]/scoreboard/[id]/actions";
import { Language } from "@/app/i18n/settings";
import { translation } from "@/app/i18n";

export default async function Totals({ id, lng }: { id: UUID; lng: Language }) {
    const data = await getTotals(id);

    const { t } = await translation(lng, "scoreboardCurrentPage");

    return (
        <Paper>
            <Typography variant="h6">{t("totals.title")}</Typography>
            <Typography variant="h3">
                <code>{t("oneVsTwo", { one: data.us, two: data.them })}</code>
            </Typography>
        </Paper>
    );
}
