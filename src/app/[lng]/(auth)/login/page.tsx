"use client";

import { Button, Grid2, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { login } from "@/app/[lng]/(auth)/login/actions";

export default function LoginPage() {
    const { register, handleSubmit } = useForm<{ email: string; password: string }>({
        defaultValues: { email: "", password: "" },
    });

    return (
        <form
            onSubmit={handleSubmit(({ email, password }) => login(email, password))}
        >
            <Grid2 container spacing={10}>
                <Grid2 size={12}>
                    <Typography variant="subtitle1">
                        {"Login to Game Scoreboard Manager"}
                    </Typography>
                </Grid2>
                <Grid2 container spacing={2} justifyContent="flex-end" size={12}>
                    <Grid2 size={12}>
                        <TextField
                            type="email"
                            autoComplete="userName"
                            label={"Email"}
                            {...register("email", { required: true })}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            label={"Password"}
                            autoComplete="current-password"
                            type="password"
                            {...register("password", { required: true })}
                        />
                    </Grid2>
                    <Grid2>
                        <Button onClick={() => {}}>Register</Button>
                    </Grid2>
                    <Grid2>
                        <Button type="submit" variant="contained">
                            Sign in
                        </Button>
                    </Grid2>
                </Grid2>
            </Grid2>
        </form>
    );
}
