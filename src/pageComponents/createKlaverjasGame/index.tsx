"use client";

import { Button, Divider, Grid2, Link, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { ReactNode } from "react";
import FormTextField from "@/components/formTextField";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createKlaverjasGame } from "@/actions/scoreboardActions";
import { useTranslations } from "next-intl";

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

const validationScheme = z.object({
    ourTeamName: z.string().nonempty(),
    scoreboardName: z.string().nonempty(),
    theirTeamName: z.string().nonempty(),
});

export type CreateKlaverjasGameForm = z.infer<typeof validationScheme>;

export default function CreateKlaverjasGame() {
    const t = useTranslations("scoreboardCreatePage");

    const { control, handleSubmit } = useForm<CreateKlaverjasGameForm>({
        defaultValues: { ourTeamName: "", scoreboardName: "", theirTeamName: "" },
        resolver: zodResolver(validationScheme),
        mode: "onChange",
    });

    return (
        <form onSubmit={handleSubmit(createKlaverjasGame)}>
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
                    <FormTextField
                        controller={{ control, name: "scoreboardName" }}
                        label={t("gameName")}
                        required
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
                        <FormTextField
                            controller={{ control, name: "ourTeamName" }}
                            label={t("yourTeamName")}
                            required
                        />
                    </Grid2>
                </Grid2>
                <Grid2 container spacing={2} size={12}>
                    <Grid2 size={12}>
                        <Typography variant="body1">{t("theirTeam")}</Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <FormTextField
                            controller={{ control, name: "theirTeamName" }}
                            label={t("theirTeamName")}
                            required
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
