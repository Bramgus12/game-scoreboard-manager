import { Typography, Paper, Divider, TextField, Button, Link } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function CreateScoreBoard() {
    return (
        <Grid2 container spacing={2}>
            <Grid2>
                <Typography variant="h4">Create New Scoreboard</Typography>
            </Grid2>
            <Grid2 xs={12}>
                <Paper elevation={0} sx={{ padding: 2, borderRadius: 4 }}>
                    <Grid2 container spacing={3}>
                        <Grid2>
                            <Typography variant="h5">New Klaverjas game</Typography>
                        </Grid2>
                        <Grid2 xs={12}>
                            <Typography variant="body1">
                                You will be starting a new scoreboard for the game{" "}
                                <Link href="https://en.wikipedia.org/wiki/Klaverjas" target="_blank">
                                    &quot;Klaverjas&quot;
                                </Link>
                                .
                            </Typography>
                        </Grid2>
                        <Grid2 xs={12}>
                            <Divider />
                        </Grid2>
                        <Grid2 xs={12}>
                            <Typography variant="h6">Enter the names of the players</Typography>
                        </Grid2>
                        <Grid2 container spacing={2} xs={12}>
                            <Grid2 xs={12}>
                                <Typography variant="body1">Your team:</Typography>
                            </Grid2>
                            <Grid2 xs={6}>
                                <TextField label="Player 1" />
                            </Grid2>
                            <Grid2 xs={6}>
                                <TextField label="Player 2" />
                            </Grid2>
                        </Grid2>
                        <Grid2 container spacing={2} xs={12}>
                            <Grid2 xs={12}>
                                <Typography variant="body1">Their team:</Typography>
                            </Grid2>
                            <Grid2 xs={6}>
                                <TextField label="Player 3" />
                            </Grid2>
                            <Grid2 xs={6}>
                                <TextField label="Player 4" />
                            </Grid2>
                        </Grid2>
                        <Grid2 xs />
                        <Grid2>
                            <Button variant="contained" color="primary">
                                Start game
                            </Button>
                        </Grid2>
                    </Grid2>
                </Paper>
            </Grid2>
        </Grid2>
    );
}
