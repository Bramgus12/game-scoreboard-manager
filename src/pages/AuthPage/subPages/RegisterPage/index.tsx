import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useSearchParams } from "react-router-dom";
import useUserSignupMutation from "utils/auth/mutators/useUserSignupMutation";
import { useUserMutation } from "../../../../utils/api/mutators/useUserMutation";
import { useForm } from "react-hook-form";
import { RegisterForm } from "./interfaces";

export default function RegisterPage() {
    const [searchParams] = useSearchParams();

    const { mutateAsync } = useUserSignupMutation();

    const { createUser } = useUserMutation();

    const from = searchParams.get("from");

    const { register, handleSubmit } = useForm<RegisterForm>();

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
            window.open(from ?? "/");
        }
    }

    return (
        <form onSubmit={handleSubmit(submitUser)}>
            <Grid2 container spacing={5}>
                <Grid2 xs={12}>
                    <Typography variant="subtitle1">Register a new account to keep track of your games!</Typography>
                </Grid2>
                <Grid2 container xs={12} spacing={2} justifyContent="flex-end">
                    <Grid2 xs={12}>
                        <TextField label="First Name" {...register("firstName", { required: true })} />
                    </Grid2>
                    <Grid2 xs={12}>
                        <TextField label="Last Name" {...register("lastName", { required: true })} />
                    </Grid2>
                    <Grid2 xs={12}>
                        <TextField
                            type="email"
                            autoComplete="userName"
                            label="Email"
                            {...register("email", { required: true })}
                        />
                    </Grid2>
                    <Grid2 xs={12}>
                        <TextField
                            label="Password"
                            autoComplete="new-password"
                            type="password"
                            {...register("password", { required: true })}
                        />
                    </Grid2>
                    <Grid2 xs={12}>
                        <TextField
                            label="Repeat Password"
                            autoComplete="new-password"
                            type="password"
                            {...register("repeatPassword", { required: true })}
                        />
                    </Grid2>
                    <Grid2 xs>
                        <Button
                            startIcon={<KeyboardArrowLeftRounded />}
                            onClick={() => {
                                const url = ["/auth/login"];

                                if (searchParams.size > 0) {
                                    url.push(searchParams.toString());
                                }

                                window.location.href = url.join("?");
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
