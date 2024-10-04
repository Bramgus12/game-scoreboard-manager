import { Grid2, Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { NewRoundForm } from "pages/app.scoreboard.$scoreboardId/components/NewRoundDialog/index";
import FameInput from "pages/app.scoreboard.$scoreboardId/components/NewRoundDialog/components/StepTwo/components/FameInput";

export default function StepTwo(props: { control: Control<NewRoundForm> }) {
    const { control } = props;

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={12}>
                <Typography variant="h5">Keep track of fame</Typography>
            </Grid2>
            <Grid2 size={6}>
                <Controller
                    defaultValue={0}
                    render={(renderProps) => (
                        <FameInput field={renderProps.field} label="Us" />
                    )}
                    control={control}
                    name="usFame"
                />
            </Grid2>
            <Grid2 size={6}>
                <Controller
                    defaultValue={0}
                    render={(renderProps) => (
                        <FameInput field={renderProps.field} label="Them" />
                    )}
                    control={control}
                    name="themFame"
                />
            </Grid2>
        </Grid2>
    );
}
