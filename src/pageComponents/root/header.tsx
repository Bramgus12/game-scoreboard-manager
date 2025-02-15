"use client";

import {
    AddRounded,
    LanguageRounded,
    MenuOutlined,
    MenuRounded,
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
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import PlayingCardsIcon from "@/components/icons/PlayingCardsIcon";

export default function Header() {
    const t = useTranslations("header");

    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const mdDown = useMediaQuery(theme.breakpoints.down("md"));

    const pathname = usePathname();
    const params = useParams();
    const locale = useLocale();

    const router = useRouter();

    function handleLocaleChange() {
        router.replace(
            // @ts-expect-error -- TypeScript will validate that only known `params` are used in combination with a given `pathname`.
            // Since the two will always match for the current route, we can skip runtime checks.
            { pathname, params },
            { locale: locale === "en" ? "nl" : "en" },
        );
    }

    if (mdDown) {
        return (
            <Grid2 container alignItems="center" padding={2} spacing={2}>
                <Grid2 height={30} size="grow" component={Link} href={`/`}>
                    <PlayingCardsIcon
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
                            component={Link}
                            href={`/scoreboard`}
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
                        <MenuItem onClick={handleLocaleChange}>
                            <Stack spacing={1} direction="row" alignItems="center">
                                <LanguageRounded
                                    sx={{
                                        height: 20,
                                        width: 20,
                                    }}
                                />
                                <Typography variant="body2">
                                    {locale === "en"
                                        ? "Nederlands 🇳🇱"
                                        : "English 🇬🇧"}
                                </Typography>
                            </Stack>
                        </MenuItem>
                    </Menu>
                </Grid2>
                <Grid2>
                    <UserButton />
                </Grid2>
            </Grid2>
        );
    }

    return (
        <Grid2 container alignItems="center" padding={2} spacing={2}>
            <Grid2 height={30} component={Link} href={`/`}>
                <PlayingCardsIcon
                    color="primary"
                    sx={{
                        height: 30,
                        width: 30,
                    }}
                />
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
                    <Button
                        variant="contained"
                        component={Link}
                        href={`/scoreboard`}
                        startIcon={<AddRounded />}
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
                        <MenuItem onClick={handleLocaleChange}>
                            <Stack spacing={1} direction="row" alignItems="center">
                                <LanguageRounded
                                    sx={{
                                        height: 20,
                                        width: 20,
                                    }}
                                />
                                <Typography variant="body2">
                                    {locale === "en"
                                        ? "Nederlands 🇳🇱"
                                        : "English 🇬🇧"}
                                </Typography>
                            </Stack>
                        </MenuItem>
                    </Menu>
                </Grid2>
            </Grid2>
            <Grid2>
                <UserButton />
            </Grid2>
        </Grid2>
    );
}
