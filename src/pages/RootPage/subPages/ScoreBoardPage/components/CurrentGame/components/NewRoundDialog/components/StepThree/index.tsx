import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function StepThree() {
    return (
        <Grid2 container spacing={2}>
            <Grid2 xs={12}>
                <Typography variant="h6">Count the cards</Typography>
            </Grid2>
            <Grid2 xs={6} container justifyContent="center">
                <Grid2 xs={12}>
                    <TextField label="Us" />
                </Grid2>
                <Grid2>
                    <ButtonGroup>
                        <Button variant="contained">Pit</Button>
                        <Button>Wet</Button>
                    </ButtonGroup>
                </Grid2>
            </Grid2>
            <Grid2 xs container justifyContent="center">
                <Grid2 xs={12}>
                    <TextField label="Them" />
                </Grid2>
                <Grid2>
                    <ButtonGroup>
                        <Button variant="contained">Pit</Button>
                        <Button>Wet</Button>
                    </ButtonGroup>
                </Grid2>
            </Grid2>
        </Grid2>
    );
}
