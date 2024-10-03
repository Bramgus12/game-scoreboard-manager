import { createTheme } from "@mui/material";

const theme = createTheme({
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
    },
});

export default theme;
