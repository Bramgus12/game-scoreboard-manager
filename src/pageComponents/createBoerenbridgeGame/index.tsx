import { Button, Grid2, IconButton, Typography } from "@mui/material";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextField from "@/components/formTextField";
import { AddRounded, DeleteRounded } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { createBoerenbridgeGame } from "@/actions/scoreboardActions";

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

export default function CreateBoerenbridgeGame() {
    const t = useTranslations("scoreboardCreatePage");

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
                    <Typography variant="h5">{t("newBoerenbridgeGame")}</Typography>
                </Grid2>
                <Grid2>
                    <FormTextField
                        controller={{ control, name: "scoreboardName" }}
                        label={t("gameName")}
                    />
                </Grid2>
                <Grid2>
                    <FormTextField
                        controller={{ control, name: "pointsPerCorrectGuess" }}
                        label={t("pointsPerCorrectGuess")}
                    />
                </Grid2>
                <Grid2>
                    <Typography variant="subtitle1">{t("players")}</Typography>
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
                                label={t("playerNumber", { number: index + 1 })}
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
                        {t("addPlayer")}
                    </Button>
                </Grid2>
                <Grid2 alignSelf="end">
                    <Button type="submit" variant="contained">
                        {t("startGame")}
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
}
