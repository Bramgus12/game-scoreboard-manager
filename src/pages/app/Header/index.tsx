import { AddRounded, LogoutRounded, ScoreboardRounded } from "@mui/icons-material";
import {
    Button,
    Grid2,
    IconButton,
    Link as MuiLink,
    Typography,
    useTheme,
} from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "utils/auth/useAuth";

export default function Header() {
    const theme = useTheme();

    const navigate = useNavigate();

    return (
        <Grid2 container alignItems="center" padding={2} spacing={2}>
            <Grid2 height={30}>
                <Link to="/app">
                    <ScoreboardRounded
                        color="primary"
                        sx={{ height: 30, width: 30 }}
                    />
                </Link>
            </Grid2>
            <Grid2 size="grow">
                <MuiLink
                    component={Link}
                    to="/app"
                    sx={{
                        color: theme.palette.text.primary,
                        textDecoration: "none",
                    }}
                >
                    <Typography variant="h5">Game Scoreboard Manager</Typography>
                </MuiLink>
            </Grid2>
            <Grid2 container>
                <Grid2>
                    <Button
                        variant="contained"
                        startIcon={<AddRounded />}
                        component={Link}
                        to="/app/scoreboard"
                    >
                        Create new scoreboard
                    </Button>
                </Grid2>
                <Grid2>
                    <IconButton
                        onClick={() => {
                            void supabase.auth.signOut();
                            void navigate({ to: "/auth/login" });
                        }}
                    >
                        <LogoutRounded />
                    </IconButton>
                </Grid2>
            </Grid2>
        </Grid2>
    );
}
