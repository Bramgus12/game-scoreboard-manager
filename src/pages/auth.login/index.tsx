import { useForm } from "react-hook-form";
import useUserLoginMutation from "utils/auth/mutators/useUserLoginMutation";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { LoginForm } from "pages/auth.login/interfaces";
import { useTranslation } from "react-i18next";

export default function Login() {
    const { register, handleSubmit } = useForm<LoginForm>();

    const { t } = useTranslation("auth");

    const { mutateAsync } = useUserLoginMutation();

    const navigate = useNavigate();

    async function signInUser(data: LoginForm) {
        const userResult = await mutateAsync({
            email: data.email,
            password: data.password,
        });

        if (userResult.session != null) {
            void navigate({ to: "/app" });
        }
    }

    return (
        <form onSubmit={handleSubmit(signInUser)}>
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
                        <Button
                            onClick={() => {
                                void navigate({ to: "/auth/register" });
                            }}
                        >
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
