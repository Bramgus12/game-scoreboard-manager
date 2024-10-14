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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AppTeamType } from "models/app/klaverjasTeam/TeamType";
import useKlaverjasRoundMutation from "utils/api/mutators/useKlaverjasRoundMutation";
import useKlaverjasRoundQuery from "utils/api/queries/useKlaverjasRoundQuery";
import { UUID } from "crypto";
import { AppCreateKlaverjasRound } from "models/app/klaverjasRound/CreateKlaverjasRound";
import useKlaverjasTeamQuery from "utils/api/queries/useKlaverjasTeamQuery";
import { useParams } from "@tanstack/react-router";
import StepOne from "pages/app.scoreboard.$scoreboardId/components/NewRoundDialog/components/StepOne";
import StepTwo from "pages/app.scoreboard.$scoreboardId/components/NewRoundDialog/components/StepTwo";
import StepThree from "pages/app.scoreboard.$scoreboardId/components/NewRoundDialog/components/StepThree";
import { MergedRound } from "pages/app.scoreboard.$scoreboardId/components/KlaverjasTable/interfaces";
import stringToNumber from "utils/funcs/stringToNumber";

export type NewRoundForm = {
    goingTeam: AppTeamType;
    usFame: number;
    themFame: number;
    usPoints: string;
    themPoints: string;
    usPit: boolean;
    themPit: boolean;
    usWet?: boolean;
    themWet?: boolean;
};

export default function NewRoundDialog(props: {
    open: boolean;
    onClose: () => void;
    initialState?: MergedRound;
}) {
    const { open, onClose, initialState } = props;
    const { scoreboardId } = useParams({ from: "/app/scoreboard/$scoreboardId" });

    const id = scoreboardId as UUID;

    const [activeStep, setActiveStep] = useState(0);

    const { data: teams } = useKlaverjasTeamQuery(id);

    const { data, isPending, isError } = useKlaverjasRoundQuery(id, teams?.[0].id);

    const { createKlaverjasRound, updateKlaverjasRound } =
        useKlaverjasRoundMutation();

    const { handleSubmit, control, watch, setValue, reset } =
        useForm<NewRoundForm>();

    const steps = [
        <StepOne key={0} control={control} />,
        <StepTwo key={1} control={control} />,
        <StepThree key={2} control={control} watch={watch} setValue={setValue} />,
    ];

    async function saveRound(round: NewRoundForm) {
        if (isPending || isError || id == null || teams == null) {
            throw new Error("Cannot save round");
        }

        const usPoints = stringToNumber(round.usPoints);
        const themPoints = stringToNumber(round.themPoints);

        const klaverjasRoundTeamUs: AppCreateKlaverjasRound = {
            fame: round.usFame,
            points: usPoints,
            isPit: round.usPit,
            isWet: round.usWet ?? false,
            roundNumber: initialState?.roundNumber ?? data.length + 1,
            isGoing: round.goingTeam === "us",
        };

        const klaverjasRoundTeamThem: AppCreateKlaverjasRound = {
            fame: round.themFame,
            points: themPoints,
            isPit: round.themPit,
            isWet: round.themWet ?? false,
            roundNumber: initialState?.roundNumber ?? data.length + 1,
            isGoing: round.goingTeam === "them",
        };

        if (initialState != null) {
            await updateKlaverjasRound(id, teams[0].id, {
                ...klaverjasRoundTeamUs,
                id: initialState.team1.id,
            });
            await updateKlaverjasRound(id, teams[1].id, {
                ...klaverjasRoundTeamThem,
                id: initialState.team2.id,
            });
            onClose();
            return;
        }

        await createKlaverjasRound(id, teams[0].id, klaverjasRoundTeamUs);
        await createKlaverjasRound(id, teams[1].id, klaverjasRoundTeamThem);

        onClose();
    }

    useEffect(() => {
        if (initialState != null) {
            const { team1, team2 } = initialState;

            const newRoundFormObject: NewRoundForm = {
                goingTeam: team2.isGoing ? "them" : "us",
                usPit: team1.isPit,
                usWet: team1.isWet,
                usFame: team1.fame,
                usPoints: team1.points.toString(),
                themPit: team2.isPit,
                themWet: team2.isWet,
                themFame: team2.fame,
                themPoints: team2.points.toString(),
            };

            reset(newRoundFormObject);
            return;
        }
        reset();
    }, [initialState, reset]);

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
