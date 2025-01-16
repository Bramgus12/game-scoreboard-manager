"use client";

import { Grid2, Step, StepLabel, Stepper } from "@mui/material";
import { Language } from "@/app/i18n/settings";
import { useState } from "react";
import ChooseGameType from "@/pageComponents/chooseGameType";
import { AppGameType } from "@/models/app/scoreboard/GameType";
import ScoreboardDetails from "../ScoreboardDetails";
import { useTranslation } from "@/app/i18n/client";

export default function CreateScoreboard(props: { lng: Language }) {
    const { lng } = props;

    const { t } = useTranslation(lng, "scoreboardCreatePage");

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
                    <ScoreboardDetails lng={lng} gameType={chosenGameType} />
                ) : (
                    <ChooseGameType onSubmit={setChosenGameType} lng={lng} />
                )}
            </Grid2>
        </Grid2>
    );
}
