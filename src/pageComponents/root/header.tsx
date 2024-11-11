"use client";

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
import { useState } from "react";
import { signOutAction } from "@/app/[lng]/actions";
import { Language } from "@/app/i18n/settings";
import { useTranslation } from "@/app/i18n/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header(props: { lng: Language }) {
    const { lng } = props;

    const { t } = useTranslation(lng, "header");

    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const mdDown = useMediaQuery(theme.breakpoints.down("md"));

    const router = useRouter();

    function changeLanguage() {
        if (lng === "en") {
            router.push("/nl");
        }

        router.push("/en");
    }

    if (mdDown) {
        return (
            <Grid2 container alignItems="center" padding={2} spacing={2}>
                <Grid2 height={30} size="grow">
                    <ScoreboardRounded
                        color="primary"
                        sx={{ height: 30, width: 30 }}
                    />
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
                        <MenuItem onClick={signOutAction}>
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
                        <MenuItem onClick={changeLanguage}>
                            <Stack spacing={1} direction="row" alignItems="center">
                                <LanguageRounded
                                    sx={{
                                        height: 20,
                                        width: 20,
                                        color: theme.palette.primary.main,
                                    }}
                                />
                                <Typography variant="body2">
                                    {t("language")}
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
                <ScoreboardRounded color="primary" sx={{ height: 30, width: 30 }} />
            </Grid2>
            <Grid2 size="grow">
                <MuiLink
                    sx={{
                        color: theme.palette.text.primary,
                        textDecoration: "none",
                    }}
                    component={Link}
                    href="/"
                >
                    <Typography variant="h5">{t("title")}</Typography>
                </MuiLink>
            </Grid2>
            <Grid2 container>
                <Grid2>
                    <Button variant="contained" startIcon={<AddRounded />}>
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
                        <MenuItem onClick={signOutAction}>
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
                            component={Link}
                            href={lng === "en" ? "/nl" : "/en"}
                        >
                            <Stack spacing={1} direction="row" alignItems="center">
                                <LanguageRounded
                                    sx={{
                                        height: 20,
                                        width: 20,
                                    }}
                                />
                                <Typography variant="body2">
                                    {lng === "en" ? "Nederlands 🇳🇱" : "English 🇬🇧"}
                                </Typography>
                            </Stack>
                        </MenuItem>
                    </Menu>
                </Grid2>
            </Grid2>
        </Grid2>
    );
}
