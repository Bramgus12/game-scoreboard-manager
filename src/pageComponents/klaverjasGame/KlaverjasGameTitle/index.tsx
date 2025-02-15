import { Paper, Typography } from "@mui/material";
import { UUID } from "crypto";
import { getTranslations } from "next-intl/server";
import { getTeamNames } from "@/actions/klaverjasActions";

export default async function KlaverjasGameTitle({ id }: { id: UUID }) {
    const t = await getTranslations("scoreboardCurrentPage");

    const data = await getTeamNames(id);

    return (
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h4">
                <code>{t("oneVsTwo", { one: data.us, two: data.them })}</code>
            </Typography>
        </Paper>
    );
}
