import { Fab, Grid2 } from "@mui/material";
import KlaverjasTable from "./components/KlaverjasTable";
import { FiberNewRounded } from "@mui/icons-material";
import NewRoundDialog from "./components/NewRoundDialog";
import { useState } from "react";
import CurrentRoundNumber from "./components/CurrentRoundNumber";
import Totals from "./components/Totals";
import KlaverjasGameTitle from "./components/KlaverjasGameTitle";
import { useIsFetching } from "@tanstack/react-query";

export default function CurrentGame() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const isFetching = useIsFetching();

    return (
        <>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <KlaverjasGameTitle />
                </Grid2>
                <Grid2 size={6}>
                    <KlaverjasTable
                        onNewRoundClick={() => setIsDialogOpen(true)}
                        onEditClick={() => {}}
                    />
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
                disabled={isFetching > 0}
            >
                <FiberNewRounded sx={{ marginRight: 1 }} />
                New round
            </Fab>
            <NewRoundDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
        </>
    );
}
