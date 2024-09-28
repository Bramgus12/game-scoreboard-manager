import { Fab, Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import KlaverjasTable from "./components/KlaverjasTable";
import { FiberNewRounded } from "@mui/icons-material";
import NewRoundDialog from "./components/NewRoundDialog";

export default function CurrentGame() {
    return (
        <>
            <Grid2 container spacing={2}>
                <Grid2>
                    <Typography variant="h4">Klaverjas game with: name, name, name, name</Typography>
                </Grid2>
                <Grid2 xs={6}>
                    <Paper>
                        <KlaverjasTable />
                    </Paper>
                </Grid2>
                <Grid2 container xs={6} direction="column">
                    <Grid2>
                        <Paper>
                            <Typography variant="h6">Current round no.</Typography>
                            <Typography variant="h2">
                                <code>13</code>
                            </Typography>
                        </Paper>
                    </Grid2>
                    <Grid2>
                        <Paper>
                            <Typography variant="h6">Totals</Typography>
                            <Typography variant="h3">
                                <code>1200 </code>
                                vs
                                <code> 900</code>
                            </Typography>
                        </Paper>
                    </Grid2>
                </Grid2>
            </Grid2>
            <Fab color="primary" variant="extended" sx={{ position: "fixed", bottom: 25, right: 25 }}>
                <FiberNewRounded sx={{ marginRight: 1 }} />
                New round
            </Fab>
            <NewRoundDialog />
        </>
    );
}
