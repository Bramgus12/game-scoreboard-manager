"use client";

import {
    Button,
    Divider,
    Grid2,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { CreateScoreBoardForm } from "@/app/[lng]/scoreboard/interfaces";
import { createScoreBoard } from "@/app/[lng]/scoreboard/actions";

function WikipediaLink({ children }: { children?: ReactNode }) {
    return (
        <Link
            href="https://en.wikipedia.org/wiki/Klaverjas"
            target="_blank"
            rel="noreferrer"
        >
            {children}
        </Link>
    );
}

export default function ScoreboardPage() {
    const { register, handleSubmit } = useForm<CreateScoreBoardForm>({
        defaultValues: { ourTeamName: "", scoreboardName: "", theirTeamName: "" },
    });

    return (
        <Grid2 container spacing={2}>
            <Grid2>
                <Typography variant="h4">{"Create new scoreboard"}</Typography>
            </Grid2>
            <Grid2 size={12}>
                <Paper>
                    <form onSubmit={handleSubmit(createScoreBoard)}>
                        <Grid2 container spacing={3}>
                            <Grid2>
                                <Typography variant="h5">
                                    {"Create a new scoreboard"}
                                </Typography>
                            </Grid2>
                            <Grid2 size={12}>
                                <Typography variant="body1">
                                    {
                                        "You will be starting a new scoreboard for the game "
                                    }
                                    <WikipediaLink>{"Klaverjas"}</WikipediaLink>
                                </Typography>
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label={"Game Name"}
                                    {...register("scoreboardName", {
                                        required: true,
                                    })}
                                />
                            </Grid2>
                            <Grid2 size={12}>
                                <Divider />
                            </Grid2>
                            <Grid2 size={12}>
                                <Typography variant="h6">{"Teams"}</Typography>
                            </Grid2>
                            <Grid2 container spacing={2} size={12}>
                                <Grid2 size={12}>
                                    <Typography variant="body1">
                                        {"Your team"}
                                    </Typography>
                                </Grid2>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        label={"Your team name"}
                                        {...register("ourTeamName", {
                                            required: true,
                                        })}
                                    />
                                </Grid2>
                            </Grid2>
                            <Grid2 container spacing={2} size={12}>
                                <Grid2 size={12}>
                                    <Typography variant="body1">
                                        {"Their team"}
                                    </Typography>
                                </Grid2>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        label={"Their team name"}
                                        {...register("theirTeamName", {
                                            required: true,
                                        })}
                                    />
                                </Grid2>
                            </Grid2>
                            <Grid2 size="grow" />
                            <Grid2>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    {"Start game"}
                                </Button>
                            </Grid2>
                        </Grid2>
                    </form>
                </Paper>
            </Grid2>
        </Grid2>
    );
}
