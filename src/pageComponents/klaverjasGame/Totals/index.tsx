import { Paper, Typography } from "@mui/material";
import { UUID } from "crypto";
import { getTranslations } from "next-intl/server";
import { getTotals } from "@/actions/klaverjasActions";

export default async function Totals({ id }: { id: UUID }) {
    const data = await getTotals(id);

    const t = await getTranslations("scoreboardCurrentPage");

    return (
        <Paper>
            <Typography variant="h6">{t("totals.title")}</Typography>
            <Typography variant="h3">
                <code>{t("oneVsTwo", { one: data.us, two: data.them })}</code>
            </Typography>
        </Paper>
    );
}
