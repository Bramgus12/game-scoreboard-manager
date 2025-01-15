import { Language } from "@/app/i18n/settings";
import { Button, Grid2, IconButton, Typography } from "@mui/material";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextField from "@/components/formTextField";
import { AddRounded, DeleteRounded } from "@mui/icons-material";
import { createBoerenbridgeGame } from "@/app/[lng]/scoreboard/actions";

const validationScheme = z.object({
    scoreboardName: z.string().nonempty(),
    pointsPerCorrectGuess: z.coerce
        .number({ message: "Value must be a number" })
        .int()
        .min(1),
    players: z.array(z.object({ playerName: z.string().nonempty() })).nonempty(),
});

export type CreateBoerenbridgeGameForm = z.infer<typeof validationScheme>;

const emptyPlayer: CreateBoerenbridgeGameForm["players"][0] = { playerName: "" };

export default function CreateBoerenbridgeGame(props: { lng: Language }) {
    const { control, handleSubmit } = useForm<CreateBoerenbridgeGameForm>({
        mode: "onChange",
        resolver: zodResolver(validationScheme),
        defaultValues: {
            scoreboardName: "",
            players: [emptyPlayer],
            pointsPerCorrectGuess: 1,
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "players" });

    return (
        <form onSubmit={handleSubmit(createBoerenbridgeGame)}>
            <Grid2 container direction="column" spacing={3}>
                <Grid2>
                    <Typography variant="h5">
                        Create new boerenbridge game
                    </Typography>
                </Grid2>
                <Grid2>
                    <FormTextField
                        controller={{ control, name: "scoreboardName" }}
                        label="Name of the game"
                    />
                </Grid2>
                <Grid2>
                    <FormTextField
                        controller={{ control, name: "pointsPerCorrectGuess" }}
                        label="Points per correct guess"
                    />
                </Grid2>
                <Grid2>
                    <Typography variant="subtitle1">Players</Typography>
                </Grid2>
                {fields.map((field, index) => (
                    <Grid2 key={field.id} container size="grow" alignItems="center">
                        <Grid2 size="grow">
                            <FormTextField
                                controller={{
                                    control,
                                    name: `players.${index}.playerName`,
                                }}
                                variant="outlined"
                                label={`Player ${index + 1}`}
                            />
                        </Grid2>
                        <Grid2>
                            <IconButton
                                disabled={fields.length === 1}
                                onClick={() => remove(index)}
                            >
                                <DeleteRounded />
                            </IconButton>
                        </Grid2>
                    </Grid2>
                ))}
                <Grid2>
                    <Button
                        variant="text"
                        startIcon={<AddRounded />}
                        onClick={() => append(emptyPlayer)}
                    >
                        Add Player
                    </Button>
                </Grid2>
                <Grid2 alignSelf="end">
                    <Button type="submit" variant="contained">
                        Create game
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
}
