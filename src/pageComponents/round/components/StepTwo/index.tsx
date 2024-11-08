import { Grid2, Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import FameInput from "@/pageComponents/round/components/StepTwo/components/FameInput";
import { NewRoundForm } from "@/pageComponents/round";

export default function StepTwo(props: { control: Control<NewRoundForm> }) {
    const { control } = props;

    return (
        <Grid2 container spacing={2} alignItems="center">
            <Grid2 size={12}>
                <Typography variant="h5">{"Keep track of the fame"}</Typography>
            </Grid2>
            <Grid2
                size={{
                    xs: 12,
                    md: 6,
                }}
            >
                <Controller
                    defaultValue={0}
                    render={(renderProps) => (
                        <FameInput field={renderProps.field} label={"Us"} />
                    )}
                    control={control}
                    name="usFame"
                />
            </Grid2>
            <Grid2
                size={{
                    xs: 12,
                    md: 6,
                }}
            >
                <Controller
                    defaultValue={0}
                    render={(renderProps) => (
                        <FameInput field={renderProps.field} label={"Them"} />
                    )}
                    control={control}
                    name="themFame"
                />
            </Grid2>
        </Grid2>
    );
}
