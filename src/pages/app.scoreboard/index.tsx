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
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";

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

export default function CreateScoreBoard() {
    const { register, handleSubmit } = useForm<CreateScoreBoardForm>();

    const { t } = useTranslation("scoreboardCreatePage");

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
                <Typography variant="h4">{t("createNewScoreboard")}</Typography>
            </Grid2>
            <Grid2 size={12}>
                <Paper>
                    <form onSubmit={handleSubmit(saveData)}>
                        <Grid2 container spacing={3}>
                            <Grid2>
                                <Typography variant="h5">
                                    {t("newKlaverjasGame")}
                                </Typography>
                            </Grid2>
                            <Grid2 size={12}>
                                <Typography variant="body1">
                                    {t("explanation")}
                                    <WikipediaLink>{t("klaverjas")}</WikipediaLink>
                                </Typography>
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label={t("gameName")}
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
                                    {t("teamNamesTitle")}
                                </Typography>
                            </Grid2>
                            <Grid2 container spacing={2} size={12}>
                                <Grid2 size={12}>
                                    <Typography variant="body1">
                                        {t("yourTeam")}
                                    </Typography>
                                </Grid2>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        label={t("yourTeamName")}
                                        {...register("ourTeamName", {
                                            required: true,
                                        })}
                                    />
                                </Grid2>
                            </Grid2>
                            <Grid2 container spacing={2} size={12}>
                                <Grid2 size={12}>
                                    <Typography variant="body1">
                                        {t("theirTeam")}
                                    </Typography>
                                </Grid2>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        label={t("theirTeamName")}
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
                                    {t("startGame")}
                                </Button>
                            </Grid2>
                        </Grid2>
                    </form>
                </Paper>
            </Grid2>
        </Grid2>
    );
}
