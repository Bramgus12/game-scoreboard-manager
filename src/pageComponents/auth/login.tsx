"use client";

import { Button, Grid2, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { login } from "@/app/[lng]/(auth)/login/actions";
import { Language } from "@/app/i18n/settings";
import { useTranslation } from "@/app/i18n/client";
import Link from "next/link";

export default function Login(props: { lng: Language }) {
    const { lng } = props;

    const { t } = useTranslation(lng, "auth");

    const { register, handleSubmit } = useForm<{ email: string; password: string }>({
        defaultValues: { email: "", password: "" },
    });

    return (
        <form
            onSubmit={handleSubmit(({ email, password }) => login(email, password))}
        >
            <Grid2 container spacing={10}>
                <Grid2 size={12}>
                    <Typography variant="subtitle1">{t("login.title")}</Typography>
                </Grid2>
                <Grid2 container spacing={2} justifyContent="flex-end" size={12}>
                    <Grid2 size={12}>
                        <TextField
                            type="email"
                            autoComplete="userName"
                            label={t("login.email")}
                            {...register("email", { required: true })}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            label={t("login.password")}
                            autoComplete="current-password"
                            type="password"
                            {...register("password", { required: true })}
                        />
                    </Grid2>
                    <Grid2>
                        <Button component={Link} href={`/${lng}/register`}>
                            {t("register.register")}
                        </Button>
                    </Grid2>
                    <Grid2>
                        <Button type="submit" variant="contained">
                            {t("login.signIn")}
                        </Button>
                    </Grid2>
                </Grid2>
            </Grid2>
        </form>
    );
}
