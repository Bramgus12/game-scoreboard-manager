import {
    AddRounded,
    LanguageRounded,
    LogoutRounded,
    MenuOutlined,
    MenuRounded,
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
import { useTranslation } from "react-i18next";
import i18n, { changeLanguage } from "i18next";

export default function Header() {
    const theme = useTheme();

    const { t } = useTranslation("header");

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const mdDown = useMediaQuery(theme.breakpoints.down("md"));

    function logout() {
        void supabase.auth.signOut();
        void navigate({ to: "/auth/login" });
    }

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
                                    {t("createNewScoreboard")}
                                </Typography>
                            </Stack>
                        </MenuItem>
                        <MenuItem onClick={logout}>
                            <Stack spacing={1} direction="row" alignItems="center">
                                <LogoutRounded
                                    sx={{
                                        height: 20,
                                        width: 20,
                                        color: theme.palette.primary.main,
                                    }}
                                />
                                <Typography variant="body2">
                                    {t("signOut")}
                                </Typography>
                            </Stack>
                        </MenuItem>
                        <MenuItem
                            onClick={() =>
                                changeLanguage(i18n.language === "nl" ? "en" : "nl")
                            }
                        >
                            <Stack spacing={1} direction="row" alignItems="center">
                                <LanguageRounded
                                    sx={{
                                        height: 20,
                                        width: 20,
                                        color: theme.palette.primary.main,
                                    }}
                                />
                                <Typography variant="body2">
                                    {i18n.language === "nl"
                                        ? "English"
                                        : "Nederlands"}
                                </Typography>
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
                    <Typography variant="h5">{t("title")}</Typography>
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
                        {t("createNewScoreboard")}
                    </Button>
                </Grid2>
                <Grid2>
                    <IconButton
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                    >
                        <MenuRounded />
                    </IconButton>
                    <Menu
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem onClick={logout}>
                            <Stack spacing={1} direction="row" alignItems="center">
                                <LogoutRounded
                                    sx={{
                                        height: 20,
                                        width: 20,
                                    }}
                                />
                                <Typography variant="body2">
                                    {t("signOut")}
                                </Typography>
                            </Stack>
                        </MenuItem>
                        <MenuItem
                            onClick={() =>
                                changeLanguage(i18n.language === "nl" ? "en" : "nl")
                            }
                        >
                            <Stack spacing={1} direction="row" alignItems="center">
                                <LanguageRounded
                                    sx={{
                                        height: 20,
                                        width: 20,
                                    }}
                                />
                                <Typography variant="body2">
                                    {i18n.language === "nl"
                                        ? "English"
                                        : "Nederlands"}
                                </Typography>
                            </Stack>
                        </MenuItem>
                    </Menu>
                </Grid2>
            </Grid2>
        </Grid2>
    );
}
