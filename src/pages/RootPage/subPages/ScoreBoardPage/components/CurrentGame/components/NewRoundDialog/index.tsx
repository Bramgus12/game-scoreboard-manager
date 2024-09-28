import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid2,
    Step,
    StepButton,
    Stepper,
} from "@mui/material";
import StepThree from "./components/StepThree";

export default function NewRoundDialog() {
    return (
        <Dialog open fullWidth PaperProps={{ sx: { borderRadius: 5, padding: 2 } }}>
            <DialogTitle>
                <Grid2 container direction="column" spacing={2}>
                    <Grid2>
                        <Stepper activeStep={2}>
                            <Step>
                                <StepButton
                                    sx={{ borderRadius: 4 }}
                                    onClick={() => {}}
                                >
                                    Step 1
                                </StepButton>
                            </Step>
                            <Step>
                                <StepButton
                                    sx={{ borderRadius: 4 }}
                                    onClick={() => {}}
                                >
                                    Step 2
                                </StepButton>
                            </Step>
                            <Step>
                                <StepButton
                                    sx={{ borderRadius: 4 }}
                                    onClick={() => {}}
                                >
                                    Step 3
                                </StepButton>
                            </Step>
                        </Stepper>
                    </Grid2>
                    <Grid2>
                        <Divider />
                    </Grid2>
                </Grid2>
            </DialogTitle>
            <DialogContent>
                <StepThree />
            </DialogContent>
            <DialogActions>
                <Button>Next</Button>
            </DialogActions>
        </Dialog>
    );
}
