"use client";

import {
    Button,
    CssBaseline,
    Grid2,
    ThemeProvider,
    Typography,
} from "@mui/material";
import theme from "@/theme";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto",
});

export default function GlobalError() {
    return (
        <html>
            <body className={roboto.variable}>
                <ThemeProvider theme={theme}>
                    <Grid2
                        sx={{ height: "100vh" }}
                        container
                        direction="column"
                        spacing={4}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid2>
                            <Typography variant="h5">
                                Something went wrong
                            </Typography>
                        </Grid2>
                        <Grid2>
                            <Button
                                variant="contained"
                                onClick={() => window.location.reload()}
                            >
                                Reload the page
                            </Button>
                        </Grid2>
                    </Grid2>
                    <CssBaseline />
                </ThemeProvider>
            </body>
        </html>
    );
}
