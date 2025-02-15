"use client";

import { Button, Grid2, Step, StepLabel, Stepper } from "@mui/material";
import { MergedRound } from "@/pageComponents/klaverjasGame/KlaverjasTable/interfaces";
import { AppKlaverjasTeam } from "@/models/app/klaverjasTeam/KlaverjasTeam";
import { useState } from "react";
import { useForm } from "react-hook-form";
import StepOne from "@/pageComponents/round/components/StepOne";
import StepTwo from "@/pageComponents/round/components/StepTwo";
import StepThree from "@/pageComponents/round/components/StepThree";
import stringToNumber from "@/utils/funcs/stringToNumber";
import { AppCreateKlaverjasRound } from "@/models/app/klaverjasRound/CreateKlaverjasRound";
import { UUID } from "crypto";
import { AppTeamType } from "@/models/app/klaverjasTeam/TeamType";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { createRound, updateRound } from "@/actions/klaverjasActions";

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
    teams: {
        us: AppKlaverjasTeam;
        them: AppKlaverjasTeam;
    };
    roundNumber: number;
    initialState?: MergedRound;
}) {
    const t = useTranslations("scoreboardCurrentPage");

    const router = useRouter();

    const [activeStep, setActiveStep] = useState(0);

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
            await updateRound(teams.us.id, {
                ...klaverjasRoundTeamUs,
                id: initialState.team1.id,
            });
            await updateRound(teams.them.id, {
                ...klaverjasRoundTeamThem,
                id: initialState.team2.id,
            });

            router.push(`/scoreboard/${scoreboardId}`);

            return;
        }

        await createRound(teams.us.id, klaverjasRoundTeamUs);
        await createRound(teams.them.id, klaverjasRoundTeamThem);

        router.push(`/scoreboard/${scoreboardId}`);
    }

    return (
        <Grid2 container spacing={4} justifyContent="end">
            <Grid2 size={12}>
                <Stepper activeStep={activeStep}>
                    <Step>
                        <StepLabel>{t("roundDialog.step1.title")}</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>{t("roundDialog.step2.title")}</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>{t("roundDialog.step3.title")}</StepLabel>
                    </Step>
                </Stepper>
            </Grid2>
            <Grid2 size={12}>{steps[activeStep]}</Grid2>
            <Grid2>
                {activeStep === steps.length - 1 ? (
                    <Button onClick={handleSubmit(saveRound)}>
                        {t("roundDialog.finish")}
                    </Button>
                ) : (
                    <Button
                        onClick={() => setActiveStep((prevState) => prevState + 1)}
                    >
                        {t("roundDialog.next")}
                    </Button>
                )}
            </Grid2>
        </Grid2>
    );
}
