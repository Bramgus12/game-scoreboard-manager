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
            defaultProps: {
                InputProps: {
                    sx: {
                        borderRadius: 4,
                    },
                },
                fullWidth: true,
            },
        },
    },
});

export default theme;
