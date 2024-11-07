"use client";

import { ReactNode } from "react";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import Header from "@/app/header";

export default function ScoreboardLayout(props: { children: ReactNode }) {
    const { children } = props;

    const theme = useTheme();

    const mdDown = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Stack>
            <Header />
            <Box sx={{ padding: theme.spacing(mdDown ? 2 : 5, mdDown ? 2 : 10) }}>
                {children}
            </Box>
        </Stack>
    );
}
