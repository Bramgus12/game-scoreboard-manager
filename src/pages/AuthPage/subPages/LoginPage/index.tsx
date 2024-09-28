import { Button, Grid2, TextField, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import useUserLoginMutation from "utils/auth/mutators/useUserLoginMutation";
import { useForm } from "react-hook-form";
import { LoginForm } from "./interfaces";

export default function LoginPage() {
    const [searchParams] = useSearchParams();

    const from = searchParams.get("from");

    const { register, handleSubmit } = useForm<LoginForm>();

    const { mutateAsync } = useUserLoginMutation();

    async function signInUser(data: LoginForm) {
        const userResult = await mutateAsync({
            email: data.email,
            password: data.password,
        });

        if (userResult.session != null) {
            window.open(from ?? "/");
        }
    }

    return (
        <form onSubmit={handleSubmit(signInUser)}>
            <Grid2 container spacing={10}>
                <Grid2 size={12}>
                    <Typography variant="subtitle1">
                        Login to your account to keep track of your games!
                    </Typography>
                </Grid2>
                <Grid2 container spacing={2} justifyContent="flex-end" size={12}>
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
                            autoComplete="current-password"
                            type="password"
                            {...register("password", { required: true })}
                        />
                    </Grid2>
                    <Grid2>
                        <Button
                            onClick={() => {
                                const url = ["/auth/register"];

                                if (searchParams.size > 0) {
                                    url.push(searchParams.toString());
                                }

                                window.location.href = url.join("?");
                            }}
                        >
                            Register
                        </Button>
                    </Grid2>
                    <Grid2>
                        <Button type="submit" variant="contained">
                            Sign In
                        </Button>
                    </Grid2>
                </Grid2>
            </Grid2>
        </form>
    );
}
