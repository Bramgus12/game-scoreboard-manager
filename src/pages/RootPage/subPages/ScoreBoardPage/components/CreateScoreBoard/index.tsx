import { Button, Divider, Link, Paper, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";
import { CreateScoreBoardForm } from "./interfaces";

export default function CreateScoreBoard() {
    const { register, handleSubmit } = useForm<CreateScoreBoardForm>();

    return (
        <Grid2 container spacing={2}>
            <Grid2>
                <Typography variant="h4">Create New Scoreboard</Typography>
            </Grid2>
            <Grid2 xs={12}>
                <Paper elevation={0} sx={{ padding: 2, borderRadius: 4 }}>
                    <form onSubmit={handleSubmit((data) => console.log(data))}>
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
                            <Grid2 xs={6}>
                                <TextField label="How do you want to call your game?" {...register("scoreboardName")} />
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
                                    <TextField label="Your name" {...register("us.name1")} />
                                </Grid2>
                                <Grid2 xs={6}>
                                    <TextField
                                        label="The name of the player that is sitting across from you"
                                        {...register("us.name2")}
                                    />
                                </Grid2>
                            </Grid2>
                            <Grid2 container spacing={2} xs={12}>
                                <Grid2 xs={12}>
                                    <Typography variant="body1">Their team:</Typography>
                                </Grid2>
                                <Grid2 xs={6}>
                                    <TextField
                                        label="Player that is sitting on your left"
                                        {...register("them.name1")}
                                    />
                                </Grid2>
                                <Grid2 xs={6}>
                                    <TextField
                                        label="Player that is sitting on your right"
                                        {...register("them.name2")}
                                    />
                                </Grid2>
                            </Grid2>
                            <Grid2 xs />
                            <Grid2>
                                <Button type="submit" variant="contained" color="primary">
                                    Start game
                                </Button>
                            </Grid2>
                        </Grid2>
                    </form>
                </Paper>
            </Grid2>
        </Grid2>
    );
}
