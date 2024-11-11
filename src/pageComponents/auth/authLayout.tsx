"use client";

import { ReactNode } from "react";
import { Language } from "@/app/i18n/settings";
import {
    Box,
    Grid2,
    IconButton,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useTranslation } from "@/app/i18n/client";
import "./magicpattern.css";
import Link from "next/link";

export default function AuthLayout(props: { children: ReactNode; lng: Language }) {
    const { children, lng } = props;

    const { t } = useTranslation(lng, "auth");

    const theme = useTheme();

    const mdDown = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Grid2
            container
            justifyContent={mdDown ? "center" : "flex-start"}
            alignItems={mdDown ? "center" : undefined}
            sx={{ height: "calc(100vh - 5px)" }}
        >
            <Grid2
                width={400}
                container
                direction="column"
                justifyContent="space-between"
                sx={{
                    borderRight: mdDown
                        ? "unset"
                        : `1px solid ${theme.palette.primary.main}`,
                }}
            >
                <Grid2 size={12}>
                    <Paper
                        sx={(theme) => ({
                            padding: 3,
                            borderRadius: 0,
                            height: "100%",
                            backgroundColor: theme.palette.background.default,
                        })}
                        elevation={0}
                    >
                        <Typography variant="h4">
                            <code>{t("title")}</code>
                        </Typography>
                        {children}
                    </Paper>
                </Grid2>
                <Grid2 container justifyContent="end">
                    <Grid2>
                        <IconButton
                            sx={{ width: 52, height: 52 }}
                            component={Link}
                            href={lng === "en" ? "/nl/login" : "/en/login"}
                        >
                            {lng === "en" ? "🇳🇱" : "🇬🇧"}
                        </IconButton>
                    </Grid2>
                </Grid2>
            </Grid2>
            {mdDown ? null : (
                <Grid2 size="grow">
                    <Box className="magicpattern" />
                </Grid2>
            )}
        </Grid2>
    );
}
