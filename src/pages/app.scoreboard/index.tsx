import {
    Button,
    Divider,
    Grid2,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import useScoreboardMutation from "utils/api/mutators/useScoreboardMutation";
import { useKlaverjasTeamMutation } from "utils/api/mutators/useKlaverjasTeamMutation";
import { GAME_TYPE } from "constants/gameType";
import { TEAM_TYPE } from "constants/teamType";
import { CreateScoreBoardForm } from "pages/app.scoreboard/interfaces";
import { useNavigate } from "@tanstack/react-router";

export default function CreateScoreBoard() {
    const { register, handleSubmit } = useForm<CreateScoreBoardForm>();

    const navigate = useNavigate();

    const { createScoreboard } = useScoreboardMutation();
    const { createKlaverjasTeam } = useKlaverjasTeamMutation();

    async function saveData(data: CreateScoreBoardForm) {
        const createdScoreboard = await createScoreboard({
            scoreboardName: data.scoreboardName,
            gameType: GAME_TYPE.KLAVERJAS,
        });

        await createKlaverjasTeam(createdScoreboard.id, [
            { type: TEAM_TYPE.THEM, name: data.theirTeamName },
            { type: TEAM_TYPE.US, name: data.ourTeamName },
        ]);

        await navigate({
            to: "/app/scoreboard/$scoreboardId",
            params: { scoreboardId: createdScoreboard.id },
        });
    }

    return (
        <Grid2 container spacing={2}>
            <Grid2>
                <Typography variant="h4">Create New Scoreboard</Typography>
            </Grid2>
            <Grid2 size={12}>
                <Paper>
                    <form onSubmit={handleSubmit(saveData)}>
                        <Grid2 container spacing={3}>
                            <Grid2>
                                <Typography variant="h5">
                                    New Klaverjas game
                                </Typography>
                            </Grid2>
                            <Grid2 size={12}>
                                <Typography variant="body1">
                                    You will be starting a new scoreboard for the
                                    game{" "}
                                    <Link
                                        href="https://en.wikipedia.org/wiki/Klaverjas"
                                        target="_blank"
                                    >
                                        &quot;Klaverjas&quot;
                                    </Link>
                                    .
                                </Typography>
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="How do you want to call your game?"
                                    {...register("scoreboardName", {
                                        required: true,
                                    })}
                                />
                            </Grid2>
                            <Grid2 size={12}>
                                <Divider />
                            </Grid2>
                            <Grid2 size={12}>
                                <Typography variant="h6">
                                    Enter the names of the teams
                                </Typography>
                            </Grid2>
                            <Grid2 container spacing={2} size={12}>
                                <Grid2 size={12}>
                                    <Typography variant="body1">
                                        Your team:
                                    </Typography>
                                </Grid2>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        label="Your team name"
                                        {...register("ourTeamName", {
                                            required: true,
                                        })}
                                    />
                                </Grid2>
                            </Grid2>
                            <Grid2 container spacing={2} size={12}>
                                <Grid2 size={12}>
                                    <Typography variant="body1">
                                        Their team:
                                    </Typography>
                                </Grid2>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        label="Their team name"
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
