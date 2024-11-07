import {
    FormControlLabel,
    Grid2,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { NewRoundForm } from "@/pageComponents/scoreboardId/NewRoundDialog";
import { TEAM_TYPE } from "@/constants/teamType";

function StepOne(props: { control: Control<NewRoundForm> }) {
    const { control } = props;

    return (
        <Controller
            render={(controllerProps) => (
                <RadioGroup
                    onChange={controllerProps.field.onChange}
                    onBlur={controllerProps.field.onBlur}
                    name={controllerProps.field.name}
                    ref={controllerProps.field.ref}
                    value={controllerProps.field.value}
                >
                    <Grid2 container direction="column" spacing={2}>
                        <Grid2>
                            <Typography variant="h6">
                                {"Select the team that is going?"}
                            </Typography>
                        </Grid2>
                        <Grid2>
                            <FormControlLabel
                                value={TEAM_TYPE.US}
                                control={<Radio />}
                                label={"Us"}
                            />
                        </Grid2>
                        <Grid2>
                            <FormControlLabel
                                value={TEAM_TYPE.THEM}
                                control={<Radio />}
                                label={"Them"}
                            />
                        </Grid2>
                    </Grid2>
                </RadioGroup>
            )}
            defaultValue={null}
            name="goingTeam"
            control={control}
        />
    );
}

export default StepOne;
