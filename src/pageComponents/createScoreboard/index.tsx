"use client";

import { Language } from "@/app/i18n/settings";
import { createScoreBoard } from "@/app/[lng]/scoreboard/actions";
import { Button, Divider, Grid2, Link, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { CreateScoreBoardForm } from "@/app/[lng]/scoreboard/interfaces";
import { ReactNode } from "react";
import { useTranslation } from "@/app/i18n/client";

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

export default function CreateScoreboard(props: { lng: Language }) {
    const { lng } = props;

    const { register, handleSubmit } = useForm<CreateScoreBoardForm>({
        defaultValues: { ourTeamName: "", scoreboardName: "", theirTeamName: "" },
    });

    const { t } = useTranslation(lng, "scoreboardCreatePage");

    return (
        <form onSubmit={handleSubmit(createScoreBoard)}>
            <Grid2 container spacing={3}>
                <Grid2>
                    <Typography variant="h5">{t("newKlaverjasGame")}</Typography>
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
                    <Typography variant="h6">{t("teamNamesTitle")}</Typography>
                </Grid2>
                <Grid2 container spacing={2} size={12}>
                    <Grid2 size={12}>
                        <Typography variant="body1">{t("yourTeam")}</Typography>
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
                        <Typography variant="body1">{t("theirTeam")}</Typography>
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
                    <Button type="submit" variant="contained" color="primary">
                        {t("startGame")}
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
}
