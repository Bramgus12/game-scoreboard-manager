import { Fab, Grid2 } from "@mui/material";
import KlaverjasTable from "./components/KlaverjasTable";
import { FiberNewRounded } from "@mui/icons-material";
import NewRoundDialog from "./components/NewRoundDialog";
import { useState } from "react";
import useKlaverjasTeamQuery from "../../../../../../utils/api/queries/useKlaverjasTeamQuery";
import { useParams } from "react-router-dom";
import { UUID } from "crypto";
import LoadingComponent from "./components/LoadingComponent";
import CurrentRoundNumber from "./components/CurrentRoundNumber";
import Totals from "./components/Totals";
import KlaverjasGameTitle from "./components/KlaverjasGameTitle";

export default function CurrentGame() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { id } = useParams<{ id: UUID }>();

    const { data, isPending, isError } = useKlaverjasTeamQuery(id);

    if (isPending) {
        return <LoadingComponent />;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <>
            <Grid2 container spacing={2}>
                <Grid2>
                    <KlaverjasGameTitle />
                </Grid2>
                <Grid2 size={6}>
                    <KlaverjasTable onNewRoundClick={() => setIsDialogOpen(true)} />
                </Grid2>
                <Grid2 container direction="column" size={6}>
                    <Grid2>
                        <CurrentRoundNumber />
                    </Grid2>
                    <Grid2>
                        <Totals />
                    </Grid2>
                </Grid2>
            </Grid2>
            <Fab
                color="primary"
                variant="extended"
                sx={{ position: "fixed", bottom: 25, right: 25 }}
                onClick={() => setIsDialogOpen(true)}
            >
                <FiberNewRounded sx={{ marginRight: 1 }} />
                New round
            </Fab>
            <NewRoundDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                teams={data}
            />
        </>
    );
}
