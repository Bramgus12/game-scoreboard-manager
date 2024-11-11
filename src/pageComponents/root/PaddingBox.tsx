"use client";

import { ReactNode } from "react";
import { Box } from "@mui/material";

export default function PaddingBox({ children }: { children: ReactNode }) {
    return (
        <Box
            sx={(theme) => ({
                [theme.breakpoints.down("md")]: {
                    padding: theme.spacing(2),
                },
                padding: theme.spacing(5, 10),
            })}
        >
            {children}
        </Box>
    );
}
