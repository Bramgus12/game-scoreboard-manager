import { Paper, Typography } from "@mui/material";
import { UUID } from "crypto";
import { getRoundNumber } from "@/app/[lng]/scoreboard/[id]/actions";
import { Language } from "@/app/i18n/settings";
import { translation } from "@/app/i18n";

export default async function CurrentRoundNumber({
    id,
    lng,
}: {
    id: UUID;
    lng: Language;
}) {
    const data = await getRoundNumber(id);

    const { t } = await translation(lng, "scoreboardCurrentPage");

    return (
        <Paper>
            <Typography variant="h6">{t("currentRoundNumber.title")}</Typography>
            <Typography variant="h2">
                <code>{data}</code>
            </Typography>
        </Paper>
    );
}
