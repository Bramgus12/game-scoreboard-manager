import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useUserSignupMutation from "utils/auth/mutators/useUserSignupMutation";
import { useUserMutation } from "../../../../utils/api/mutators/useUserMutation";

export default function RegisterPage() {
    const [searchParams] = useSearchParams();

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",
    });

    const { mutateAsync } = useUserSignupMutation();

    const { createUser } = useUserMutation();

    const from = searchParams.get("from");

    async function registerUser(event: FormEvent) {
        event.preventDefault();

        const userResult = await mutateAsync({
            email: state.email,
            password: state.password,
        });

        await createUser({
            firstName: state.firstName,
            lastName: state.lastName,
        });

        if (userResult.session != null) {
            window.location.href = from ?? "/";
        }
    }

    return (
        <form onSubmit={registerUser}>
            <Grid2 container spacing={5}>
                <Grid2 xs={12}>
                    <Typography variant="subtitle1">Register a new account to keep track of your games!</Typography>
                </Grid2>
                <Grid2 container xs={12} spacing={2} justifyContent="flex-end">
                    <Grid2 xs={12}>
                        <TextField
                            label="First Name"
                            value={state.firstName}
                            onChange={(event) => {
                                setState((prevState) => ({ ...prevState, firstName: event.target.value }));
                            }}
                        />
                    </Grid2>
                    <Grid2 xs={12}>
                        <TextField
                            label="Last Name"
                            value={state.lastName}
                            onChange={(event) => {
                                setState((prevState) => ({ ...prevState, lastName: event.target.value }));
                            }}
                        />
                    </Grid2>
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
                            autoComplete="new-password"
                            type="password"
                            value={state.password}
                            onChange={(event) => {
                                setState((prevState) => ({ ...prevState, password: event.target.value }));
                            }}
                        />
                    </Grid2>
                    <Grid2 xs={12}>
                        <TextField
                            label="Repeat Password"
                            autoComplete="new-password"
                            type="password"
                            value={state.repeatPassword}
                            onChange={(event) => {
                                setState((prevState) => ({ ...prevState, repeatPassword: event.target.value }));
                            }}
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
