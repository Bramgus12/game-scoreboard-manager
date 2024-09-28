import { AddRounded, LogoutRounded, ScoreboardRounded } from "@mui/icons-material";
import {
    Button,
    Grid2,
    IconButton,
    Link as MuiLink,
    Typography,
    useTheme,
} from "@mui/material";
import { Link, useFetcher } from "react-router-dom";

export default function Header() {
    const fetcher = useFetcher();

    const theme = useTheme();

    return (
        <Grid2 container alignItems="center" padding={2} spacing={2}>
            <Grid2 height={30}>
                <Link to="/">
                    <ScoreboardRounded
                        color="primary"
                        sx={{ height: 30, width: 30 }}
                    />
                </Link>
            </Grid2>
            <Grid2 size="grow">
                <MuiLink
                    component={Link}
                    to="/"
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
                        to="/scoreboard"
                    >
                        Create new scoreboard
                    </Button>
                </Grid2>
                <Grid2>
                    <fetcher.Form method="post" action="/logout">
                        <IconButton type="submit">
                            <LogoutRounded />
                        </IconButton>
                    </fetcher.Form>
                </Grid2>
            </Grid2>
        </Grid2>
    );
}
