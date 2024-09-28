import {
    FormControlLabel,
    Grid2,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import { TEAM_TYPE } from "constants/teamType";
import { ChangeEvent, FocusEventHandler, Ref } from "react";

function StepOne(props: {
    goingTeamRadioProps: {
        onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
        onBlur?: FocusEventHandler<HTMLDivElement>;
        name?: string;
        ref?: Ref<unknown>;
    };
}) {
    const {
        goingTeamRadioProps: { onChange, onBlur, name, ref },
    } = props;

    return (
        <RadioGroup onChange={onChange} onBlur={onBlur} name={name} ref={ref}>
            <Grid2 container direction="column" spacing={2}>
                <Grid2>
                    <Typography variant="h6">
                        Select the team that is going this round.
                    </Typography>
                </Grid2>
                <Grid2>
                    <FormControlLabel
                        value={TEAM_TYPE.US}
                        control={<Radio />}
                        label="Us"
                    />
                </Grid2>
                <Grid2>
                    <FormControlLabel
                        value={TEAM_TYPE.THEM}
                        control={<Radio />}
                        label="Them"
                    />
                </Grid2>
            </Grid2>
        </RadioGroup>
    );
}

export default StepOne;
