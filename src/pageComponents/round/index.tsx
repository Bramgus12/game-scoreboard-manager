"use client";

import { Button, Grid2, Step, StepLabel, Stepper } from "@mui/material";
import { MergedRound } from "@/pageComponents/scoreboardId/KlaverjasTable/interfaces";
import { AppKlaverjasTeam } from "@/models/app/klaverjasTeam/KlaverjasTeam";
import { useState } from "react";
import useRoundMutator from "@/utils/api/mutators/useRoundMutator";
import { useForm } from "react-hook-form";
import StepOne from "@/pageComponents/round/components/StepOne";
import StepTwo from "@/pageComponents/round/components/StepTwo";
import StepThree from "@/pageComponents/round/components/StepThree";
import stringToNumber from "@/utils/funcs/stringToNumber";
import { AppCreateKlaverjasRound } from "@/models/app/klaverjasRound/CreateKlaverjasRound";
import { UUID } from "crypto";
import { AppTeamType } from "@/models/app/klaverjasTeam/TeamType";
import { useRouter } from "next/navigation";

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

const emptyFormState: NewRoundForm = {
    goingTeam: null,
    usFame: 0,
    themFame: 0,
    usPoints: "",
    themPoints: "",
    usPit: false,
    themPit: false,
    usWet: false,
    themWet: false,
};

function getInitialFormState(round: MergedRound): NewRoundForm {
    const { team1, team2 } = round;

    return {
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
}

export default function Round({
    scoreboardId,
    teams,
    roundNumber,
    initialState,
}: {
    scoreboardId: UUID;
    teams: AppKlaverjasTeam[];
    roundNumber: number;
    initialState?: MergedRound;
}) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { push } = useRouter();

    const [activeStep, setActiveStep] = useState(0);

    const { createRoundMutation, updateRoundMutation } = useRoundMutator();

    const { handleSubmit, control, watch, setValue } = useForm<NewRoundForm>({
        defaultValues:
            initialState != null
                ? getInitialFormState(initialState)
                : emptyFormState,
    });

    const steps = [
        <StepOne key={0} control={control} />,
        <StepTwo key={1} control={control} />,
        <StepThree key={2} control={control} watch={watch} setValue={setValue} />,
    ];

    async function saveRound(round: NewRoundForm) {
        const usPoints = stringToNumber(round.usPoints);
        const themPoints = stringToNumber(round.themPoints);

        const klaverjasRoundTeamUs: AppCreateKlaverjasRound = {
            fame: round.usFame,
            points: usPoints,
            isPit: round.usPit,
            isWet: round.usWet ?? false,
            roundNumber: roundNumber,
            isGoing: round.goingTeam === "us",
        };

        const klaverjasRoundTeamThem: AppCreateKlaverjasRound = {
            fame: round.themFame,
            points: themPoints,
            isPit: round.themPit,
            isWet: round.themWet ?? false,
            roundNumber: roundNumber,
            isGoing: round.goingTeam === "them",
        };

        if (initialState != null) {
            await updateRoundMutation(scoreboardId, teams[0].id, {
                ...klaverjasRoundTeamUs,
                id: initialState.team1.id,
            });
            await updateRoundMutation(scoreboardId, teams[1].id, {
                ...klaverjasRoundTeamThem,
                id: initialState.team2.id,
            });

            push(`/scoreboard/${scoreboardId}`);

            return;
        }

        await createRoundMutation(scoreboardId, teams[0].id, klaverjasRoundTeamUs);
        await createRoundMutation(scoreboardId, teams[1].id, klaverjasRoundTeamThem);

        push(`/scoreboard/${scoreboardId}`);
    }

    return (
        <Grid2 container spacing={4} justifyContent="end">
            <Grid2 size={12}>
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
            <Grid2 size={12}>{steps[activeStep]}</Grid2>
            <Grid2>
                {activeStep === steps.length - 1 ? (
                    <Button onClick={handleSubmit(saveRound)}>Save round</Button>
                ) : (
                    <Button
                        onClick={() => setActiveStep((prevState) => prevState + 1)}
                    >
                        Next
                    </Button>
                )}
            </Grid2>
        </Grid2>
    );
}
