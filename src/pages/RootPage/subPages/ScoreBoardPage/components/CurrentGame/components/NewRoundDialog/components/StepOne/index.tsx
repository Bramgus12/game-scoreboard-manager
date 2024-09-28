import {
    FormControlLabel,
    Grid2,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";

export default function StepOne() {
    return (
        <RadioGroup value={2}>
            <Grid2 container alignItems="center" height={300}>
                <Grid2>
                    <FormControlLabel value={1} control={<Radio />} label="name 1" />
                </Grid2>
                <Grid2
                    container
                    height={1}
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                    size="grow"
                >
                    <Grid2>
                        <FormControlLabel
                            labelPlacement="bottom"
                            value={2}
                            control={<Radio />}
                            label="name 2"
                        />
                    </Grid2>
                    <Grid2>
                        <Typography variant="body2">Who is going?</Typography>
                    </Grid2>
                    <Grid2>
                        <FormControlLabel
                            labelPlacement="top"
                            value={3}
                            control={<Radio />}
                            label="name 3"
                        />
                    </Grid2>
                </Grid2>
                <Grid2 justifySelf="flex-end">
                    <FormControlLabel
                        labelPlacement="start"
                        value={4}
                        control={<Radio />}
                        label="name 4"
                    />
                </Grid2>
            </Grid2>
        </RadioGroup>
    );
}
