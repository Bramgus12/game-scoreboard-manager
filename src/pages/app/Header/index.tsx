import {
    AddRounded,
    LogoutRounded,
    MenuOutlined,
    ScoreboardRounded,
} from "@mui/icons-material";
import {
    Button,
    Grid2,
    IconButton,
    Link as MuiLink,
    Menu,
    MenuItem,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "utils/auth/useAuth";
import { useState } from "react";

export default function Header() {
    const theme = useTheme();

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const mdDown = useMediaQuery(theme.breakpoints.down("md"));

    if (mdDown) {
        return (
            <Grid2 container alignItems="center" padding={2} spacing={2}>
                <Grid2 height={30} size="grow">
                    <Link to="/app">
                        <ScoreboardRounded
                            color="primary"
                            sx={{ height: 30, width: 30 }}
                        />
                    </Link>
                </Grid2>
                <Grid2>
                    <IconButton
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                    >
                        <MenuOutlined />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem
                            onClick={() => {
                                void navigate({ to: "/app/scoreboard" });
                                setAnchorEl(null);
                            }}
                        >
                            <Stack spacing={1} direction="row" alignItems="center">
                                <AddRounded
                                    sx={{
                                        height: 20,
                                        width: 20,
                                        color: theme.palette.primary.main,
                                    }}
                                />
                                <Typography variant="body2">
                                    Create new scoreboard
                                </Typography>
                            </Stack>
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                void supabase.auth.signOut();
                                void navigate({ to: "/auth/login" });
                            }}
                        >
                            <Stack spacing={1} direction="row" alignItems="center">
                                <LogoutRounded
                                    sx={{
                                        height: 20,
                                        width: 20,
                                        color: theme.palette.primary.main,
                                    }}
                                />
                                <Typography variant="body2">Sign out</Typography>
                            </Stack>
                        </MenuItem>
                    </Menu>
                </Grid2>
            </Grid2>
        );
    }

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
