import { Button, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useUserLoginMutation from "utils/auth/mutators/useUserLoginMutation";

export default function LoginPage() {
    const [searchParams] = useSearchParams();

    const [state, setState] = useState({
        email: "",
        password: "",
    });

    const from = searchParams.get("from");

    const { mutateAsync } = useUserLoginMutation();

    async function signInUser(event: FormEvent) {
        event.preventDefault();

        const userResult = await mutateAsync({
            email: state.email,
            password: state.password,
        });

        if (userResult.session != null) {
            window.location.href = from ?? "/";
        }
    }

    return (
        <form onSubmit={signInUser}>
            <Grid2 container spacing={10}>
                <Grid2 xs={12}>
                    <Typography variant="subtitle1">Login to your account to keep track of your games!</Typography>
                </Grid2>
                <Grid2 xs={12} container spacing={2} justifyContent="flex-end">
                    <Grid2 xs={12}>
                        <TextField
                            type="email"
                            autoComplete="userName"
                            label="Email"
                            value={state.email}
                            onChange={(event) => {
                                setState((prevState) => ({ ...prevState, email: event.target.value }));
                            }}
                        />
                    </Grid2>
                    <Grid2 xs={12}>
                        <TextField
                            label="Password"
                            autoComplete="current-password"
                            type="password"
                            value={state.password}
                            onChange={(event) => {
                                setState((prevState) => ({ ...prevState, password: event.target.value }));
                            }}
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
