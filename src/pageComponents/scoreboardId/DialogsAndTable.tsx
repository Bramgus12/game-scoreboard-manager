import { UUID } from "crypto";
import KlaverjasTable from "@/pageComponents/scoreboardId/KlaverjasTable";
import { Fab } from "@mui/material";
import { FiberNewRounded } from "@mui/icons-material";
import Link from "next/link";

export default function DialogsAndTable({ id }: { id: UUID }) {
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
                {"New Round"}
            </Fab>
        </>
    );
}
