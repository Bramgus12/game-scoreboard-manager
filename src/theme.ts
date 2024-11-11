"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    cssVariables: true,
    typography: {
        fontFamily: "var(--font-roboto)",
    },
    palette: {
        mode: "dark",
        primary: {
            main: "#00ff00",
            light: "#ccffbe",
            dark: "#009900",
            contrastText: "#000",
        },
        secondary: {
            main: "#ff00ff",
            light: "#ffb5fe",
            dark: "#7800e0",
            contrastText: "#000",
        },
        background: {
            default: "#000",
            paper: "#222",
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
            defaultProps: {
                fullWidth: true,
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    padding: 16,
                },
            },
            defaultProps: {
                elevation: 0,
            },
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
            defaultProps: {
                variant: "rounded",
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderRadius: 16,
                    padding: 8,
                },
                list: {
                    paddingTop: 0,
                    paddingBottom: 0,
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    border: "2px solid #00ff00",
                    padding: "4px 8px",
                    backgroundColor: "black",
                    fontSize: 14,
                    color: "#00ff00",
                    fontWeight: 700,
                },
            },
        },
    },
});

export default theme;
