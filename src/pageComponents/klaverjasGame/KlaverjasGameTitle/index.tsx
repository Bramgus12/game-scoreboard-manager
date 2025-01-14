import { Paper, Typography } from "@mui/material";
import { UUID } from "crypto";
import { getTeamNames } from "@/app/[lng]/scoreboard/[id]/actions";
import { Language } from "@/app/i18n/settings";
import { translation } from "@/app/i18n";

export default async function KlaverjasGameTitle({
    id,
    lng,
}: {
    id: UUID;
    lng: Language;
}) {
    const { t } = await translation(lng, "scoreboardCurrentPage");

    const data = await getTeamNames(id);

    return (
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h4">
                <code>{t("oneVsTwo", { one: data.us, two: data.them })}</code>
            </Typography>
        </Paper>
    );
}
