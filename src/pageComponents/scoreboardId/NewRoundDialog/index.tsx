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
import { UUID } from "crypto";
import { AppTeamType } from "@/models/app/klaverjasTeam/TeamType";
import { MergedRound } from "@/pageComponents/scoreboardId/KlaverjasTable/interfaces";
import StepOne from "@/pageComponents/scoreboardId/NewRoundDialog/components/StepOne";
import StepTwo from "@/pageComponents/scoreboardId/NewRoundDialog/components/StepTwo";
import StepThree from "@/pageComponents/scoreboardId/NewRoundDialog/components/StepThree";
import useRoundMutator from "@/utils/api/mutators/useRoundMutator";
import { AppCreateKlaverjasRound } from "@/models/app/klaverjasRound/CreateKlaverjasRound";
import stringToNumber from "@/utils/funcs/stringToNumber";
import useTeamsQuery from "@/utils/api/queries/useTeamsQuery";
import { useRoundQuery } from "@/utils/api/queries/useRoundQuery";

export type NewRoundForm = {
    goingTeam: AppTeamType | null;
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
    id: UUID;
    open: boolean;
    onClose: () => void;
    initialState?: MergedRound;
}) {
    const { id, open, onClose, initialState } = props;

    const [activeStep, setActiveStep] = useState(0);

    const { createRoundMutation, updateRoundMutation } = useRoundMutator();

    const { handleSubmit, control, watch, setValue, reset } =
        useForm<NewRoundForm>();

    const { data: teams } = useTeamsQuery(id);

    const { data, isError, isPending } = useRoundQuery(id, teams?.[0].id ?? null);

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
            await updateRoundMutation(id, teams[0].id, {
                ...klaverjasRoundTeamUs,
                id: initialState.team1.id,
            });
            await updateRoundMutation(id, teams[1].id, {
                ...klaverjasRoundTeamThem,
                id: initialState.team2.id,
            });
            onClose();
            return;
        }

        await createRoundMutation(id, teams[0].id, klaverjasRoundTeamUs);
        await createRoundMutation(id, teams[1].id, klaverjasRoundTeamThem);

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
                                <StepLabel>{"Step 1"}</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>{"Step 2"}</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>{"Step 3"}</StepLabel>
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
                    <Button onClick={handleSubmit(saveRound)}>{"Save round"}</Button>
                ) : (
                    <Button
                        onClick={() => setActiveStep((prevState) => prevState + 1)}
                    >
                        {"Next"}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
