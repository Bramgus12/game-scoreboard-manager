"use client";

import { Grid2, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import ChooseGameType from "@/pageComponents/chooseGameType";
import { AppGameType } from "@/models/app/scoreboard/GameType";
import ScoreboardDetails from "../ScoreboardDetails";
import { useTranslations } from "next-intl";

export default function CreateScoreboard() {
    const t = useTranslations("scoreboardCreatePage");

    const [chosenGameType, setChosenGameType] = useState<AppGameType | null>(null);

    const isGameTypeChosen = chosenGameType != null;

    return (
        <Grid2 container direction="column" spacing={2}>
            <Grid2>
                <Stepper>
                    <Step completed={isGameTypeChosen}>
                        <StepLabel>{t("chooseGameType")}</StepLabel>
                    </Step>
                    <Step active={isGameTypeChosen}>
                        <StepLabel>{t("enterDetails")}</StepLabel>
                    </Step>
                </Stepper>
            </Grid2>
            <Grid2>
                {isGameTypeChosen ? (
                    <ScoreboardDetails gameType={chosenGameType} />
                ) : (
                    <ChooseGameType onSubmit={setChosenGameType} />
                )}
            </Grid2>
        </Grid2>
    );
}
