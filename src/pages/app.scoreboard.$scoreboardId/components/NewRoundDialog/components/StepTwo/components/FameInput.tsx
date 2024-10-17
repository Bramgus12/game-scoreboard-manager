import { Box, Button, ButtonGroup, Grid2, Typography } from "@mui/material";
import { RestartAltRounded } from "@mui/icons-material";
import { ControllerRenderProps } from "react-hook-form";
import { NewRoundForm } from "pages/app.scoreboard.$scoreboardId/components/NewRoundDialog/index";

export default function FameInput({
    field,
    label,
}: {
    label: string;
    field: ControllerRenderProps<NewRoundForm, "usFame" | "themFame">;
}) {
    return (
        <Grid2 container direction="column" alignItems="center" spacing={2}>
            <Grid2>
                <Typography variant="body1">{label}</Typography>
            </Grid2>
            <Grid2>
                <Box
                    sx={{
                        border: (theme) => `1px solid ${theme.palette.primary.main}`,
                        padding: (theme) => theme.spacing(1, 1.5),
                        borderRadius: 4,
                    }}
                >
                    <Typography variant="h4" sx={{ width: 1, textAlign: "center" }}>
                        <code>{field.value}</code>
                    </Typography>
                </Box>
            </Grid2>
            <Grid2>
                <ButtonGroup>
                    <Button onClick={() => field.onChange(field.value + 20)}>
                        20
                    </Button>
                    <Button onClick={() => field.onChange(field.value + 50)}>
                        50
                    </Button>
                    <Button onClick={() => field.onChange(field.value + 100)}>
                        100
                    </Button>
                    <Button onClick={() => field.onChange(0)}>
                        <RestartAltRounded />
                    </Button>
                </ButtonGroup>
            </Grid2>
        </Grid2>
    );
}
