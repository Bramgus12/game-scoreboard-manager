import useUserSignupMutation from "utils/auth/mutators/useUserSignupMutation";
import { useUserMutation } from "utils/api/mutators/useUserMutation";
import { useForm } from "react-hook-form";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { useNavigate } from "@tanstack/react-router";
import { RegisterForm } from "pages/auth.register/interfaces";

export default function Register() {
    const { mutateAsync } = useUserSignupMutation();

    const { createUser } = useUserMutation();

    const { register, handleSubmit } = useForm<RegisterForm>();

    const navigate = useNavigate();

    async function submitUser(data: RegisterForm) {
        const userResult = await mutateAsync({
            email: data.email,
            password: data.password,
        });

        await createUser({
            firstName: data.firstName,
            lastName: data.lastName,
        });

        if (userResult.session != null) {
            void navigate({ to: "/app" });
        }
    }

    return (
        <form onSubmit={handleSubmit(submitUser)}>
            <Grid2 container spacing={5}>
                <Grid2 size={12}>
                    <Typography variant="subtitle1">
                        Register a new account to keep track of your games!
                    </Typography>
                </Grid2>
                <Grid2 container spacing={2} justifyContent="flex-end" size={12}>
                    <Grid2 size={12}>
                        <TextField
                            label="First Name"
                            {...register("firstName", { required: true })}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            label="Last Name"
                            {...register("lastName", { required: true })}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            type="email"
                            autoComplete="userName"
                            label="Email"
                            {...register("email", { required: true })}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            label="Password"
                            autoComplete="new-password"
                            type="password"
                            {...register("password", { required: true })}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            label="Repeat Password"
                            autoComplete="new-password"
                            type="password"
                            {...register("repeatPassword", { required: true })}
                        />
                    </Grid2>
                    <Grid2 size="grow">
                        <Button
                            startIcon={<KeyboardArrowLeftRounded />}
                            onClick={() => {
                                void navigate({ to: "/auth/login" });
                            }}
                        >
                            Back to login
                        </Button>
                    </Grid2>
                    <Grid2>
                        <Button type="submit" variant="contained">
                            Register
                        </Button>
                    </Grid2>
                </Grid2>
            </Grid2>
        </form>
    );
}
