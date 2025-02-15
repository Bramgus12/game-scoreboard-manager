import { UUID } from "crypto";
import KlaverjasTable from "@/pageComponents/klaverjasGame/KlaverjasTable";
import { Fab } from "@mui/material";
import { FiberNewRounded } from "@mui/icons-material";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function DialogsAndTable({ id }: { id: UUID }) {
    const t = await getTranslations("scoreboardCurrentPage");

    return (
        <>
            <KlaverjasTable id={id} />
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
