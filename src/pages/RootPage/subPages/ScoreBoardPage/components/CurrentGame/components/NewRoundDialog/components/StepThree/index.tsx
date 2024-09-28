import { Button, ButtonGroup, Grid2, TextField, Typography } from "@mui/material";

export default function StepThree() {
    return (
        <Grid2 container spacing={2}>
            <Grid2 size={12}>
                <Typography variant="h6">Count the cards</Typography>
            </Grid2>
            <Grid2 container justifyContent="center" size={6}>
                <Grid2 size={12}>
                    <TextField label="Us" />
                </Grid2>
                <Grid2>
                    <ButtonGroup>
                        <Button variant="contained">Pit</Button>
                        <Button>Wet</Button>
                    </ButtonGroup>
                </Grid2>
            </Grid2>
            <Grid2 container justifyContent="center" size="grow">
                <Grid2 size={12}>
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
