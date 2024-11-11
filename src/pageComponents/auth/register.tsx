"use client";

import { useForm } from "react-hook-form";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Language } from "@/app/i18n/settings";
import { useTranslation } from "@/app/i18n/client";
import Link from "next/link";
import { registerUser } from "@/app/[lng]/(auth)/register/actions";

export type RegisterForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
};

export default function Register(props: { lng: Language }) {
    const { lng } = props;

    const { t } = useTranslation(lng, "auth");

    const { register, handleSubmit } = useForm<RegisterForm>();

    return (
        <form onSubmit={handleSubmit(registerUser)}>
            <Grid2 container spacing={5}>
                <Grid2 size={12}>
                    <Typography variant="subtitle1">
                        {t("register.title")}
                    </Typography>
                </Grid2>
                <Grid2 container spacing={2} justifyContent="flex-end" size={12}>
                    <Grid2 size={12}>
                        <TextField
                            label={t("register.firstName")}
                            {...register("firstName", { required: true })}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            label={t("register.lastName")}
                            {...register("lastName", { required: true })}
                        />
                    </Grid2>
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
                            label={t("register.password")}
                            autoComplete="new-password"
                            type="password"
                            {...register("password", { required: true })}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            label={t("register.repeatPassword")}
                            autoComplete="new-password"
                            type="password"
                            {...register("repeatPassword", { required: true })}
                        />
                    </Grid2>
                    <Grid2 size="grow">
                        <Button
                            startIcon={<KeyboardArrowLeftRounded />}
                            component={Link}
                            href={`/${lng}/login`}
                        >
                            {t("register.backToLogin")}
                        </Button>
                    </Grid2>
                    <Grid2>
                        <Button type="submit" variant="contained">
                            {t("register.register")}
                        </Button>
                    </Grid2>
                </Grid2>
            </Grid2>
        </form>
    );
}
