import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid2,
    Step,
    StepLabel,
    Stepper,
} from "@mui/material";
import StepThree from "./components/StepThree";
import StepTwo from "./components/StepTwo";
import StepOne from "./components/StepOne";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AppTeamType } from "models/app/klaverjasTeam/TeamType";
import useKlaverjasRoundMutation from "../../../../../../../../utils/api/mutators/useKlaverjasRoundMutation";
import useKlaverjasRoundQuery from "../../../../../../../../utils/api/queries/useKlaverjasRoundQuery";
import { AppKlaverjasTeam } from "../../../../../../../../models/app/klaverjasTeam/KlaverjasTeam";
import { useParams } from "react-router-dom";
import { UUID } from "crypto";
import { AppCreateKlaverjasRound } from "../../../../../../../../models/app/klaverjasRound/CreateKlaverjasRound";

export type NewRoundForm = {
    goingTeam: AppTeamType;
    usFame: number;
    themFame: number;
    usPoints: number;
    themPoints: number;
    usPit: boolean;
    themPit: boolean;
    usWet: boolean;
    themWet: boolean;
};

export default function NewRoundDialog(props: {
    open: boolean;
    onClose: () => void;
    teams: AppKlaverjasTeam[];
}) {
    const { open, onClose, teams } = props;
    const { id } = useParams<{ id: UUID }>();

    const [activeStep, setActiveStep] = useState(0);

    const { data, isPending, isError } = useKlaverjasRoundQuery(id, teams[0].id);

    const { createKlaverjasRound } = useKlaverjasRoundMutation();

    const { register, handleSubmit, control, watch, setValue, reset } =
        useForm<NewRoundForm>();

    const steps = [
        <StepOne key={0} goingTeamRadioProps={register("goingTeam")} />,
        <StepTwo key={1} control={control} />,
        <StepThree key={2} control={control} watch={watch} setValue={setValue} />,
    ];

    async function saveRound(round: NewRoundForm) {
        if (isPending || isError || id == null) {
            throw new Error("Cannot save round");
        }

        const klaverjasRoundTeamUs: AppCreateKlaverjasRound = {
            fame: round.usFame,
            points: round.usPoints,
            isPit: round.usPit,
            isWet: round.usWet,
            roundNumber: data.length + 1,
        };

        const klaverjasRoundTeamThem: AppCreateKlaverjasRound = {
            fame: round.themFame,
            points: round.themPoints,
            isPit: round.themPit,
            isWet: round.themWet,
            roundNumber: data.length + 1,
        };

        await createKlaverjasRound(id, teams[0].id, klaverjasRoundTeamUs);
        await createKlaverjasRound(id, teams[1].id, klaverjasRoundTeamThem);

        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={() => onClose()}
            TransitionProps={{
                onExited: () => {
                    reset();
                    setActiveStep(0);
                },
            }}
            fullWidth
            PaperProps={{ sx: { borderRadius: 5, padding: 2 } }}
        >
            <DialogTitle>
                <Grid2 container direction="column" spacing={2}>
                    <Grid2>
                        <Stepper activeStep={activeStep}>
                            <Step>
                                <StepLabel>Who is going?</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Register fame</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Count points</StepLabel>
                            </Step>
                        </Stepper>
                    </Grid2>
                    <Grid2>
                        <Divider />
                    </Grid2>
                </Grid2>
            </DialogTitle>
            <DialogContent>{steps[activeStep]}</DialogContent>
            <DialogActions>
                {activeStep === steps.length - 1 ? (
                    <Button onClick={handleSubmit(saveRound)}>Finish</Button>
                ) : (
                    <Button
                        onClick={() => setActiveStep((prevState) => prevState + 1)}
                    >
                        Next
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
