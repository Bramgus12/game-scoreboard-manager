import { Paper, Typography } from "@mui/material";
import { UUID } from "crypto";
import { getTranslations } from "next-intl/server";
import { getRoundNumber } from "@/actions/klaverjasActions";

export default async function CurrentRoundNumber({ id }: { id: UUID }) {
    const data = await getRoundNumber(id);

    const t = await getTranslations("scoreboardCurrentPage");

    return (
        <Paper>
            <Typography variant="h6">{t("currentRoundNumber.title")}</Typography>
            <Typography variant="h2">
                <code>{data}</code>
            </Typography>
        </Paper>
    );
}
