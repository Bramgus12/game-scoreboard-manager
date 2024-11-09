import { UUID } from "crypto";
import KlaverjasTable from "@/pageComponents/scoreboardId/KlaverjasTable";
import { Fab } from "@mui/material";
import { FiberNewRounded } from "@mui/icons-material";
import Link from "next/link";
import { Language } from "@/app/i18n/settings";
import { translation } from "@/app/i18n";

export default async function DialogsAndTable({
    id,
    lng,
}: {
    id: UUID;
    lng: Language;
}) {
    const { t } = await translation(lng, "scoreboardCurrentPage");

    return (
        <>
            <KlaverjasTable id={id} lng={lng} />
            <Fab
                color="primary"
                variant="extended"
                sx={{ position: "fixed", bottom: 25, right: 25 }}
                component={Link}
                href={`/scoreboard/${id}/round`}
            >
                <FiberNewRounded sx={{ marginRight: 1 }} />
                {t("newRound")}
            </Fab>
        </>
    );
}
