"use client";

import { ReactNode } from "react";
import {
    Box,
    Grid2,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import "./magicpattern.css";

export default function Layout(props: { children: ReactNode }) {
    const { children } = props;

    const theme = useTheme();

    const mdDown = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Grid2
            container
            justifyContent={mdDown ? "center" : "flex-start"}
            alignItems={mdDown ? "center" : undefined}
            sx={{ height: "calc(100vh - 5px)" }}
        >
            <Grid2 width={400}>
                <Paper
                    sx={(theme) => ({
                        padding: 3,
                        borderRight: mdDown
                            ? "unset"
                            : `1px solid ${theme.palette.primary.main}`,
                        borderRadius: 0,
                        height: "100%",
                        backgroundColor: theme.palette.background.default,
                    })}
                    elevation={0}
                >
                    <Typography variant="h4">
                        <code>Game Scoreboard Manager</code>
                    </Typography>
                    {children}
                </Paper>
            </Grid2>
            {mdDown ? null : (
                <Grid2 size="grow">
                    <Box className="magicpattern" />
                </Grid2>
            )}
        </Grid2>
    );
}
