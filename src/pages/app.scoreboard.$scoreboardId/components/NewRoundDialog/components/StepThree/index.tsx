import { Button, ButtonGroup, Grid2, TextField, Typography } from "@mui/material";
import { Control, Controller, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { NewRoundForm } from "pages/app.scoreboard.$scoreboardId/components/NewRoundDialog/index";
import { TEAM_TYPE } from "constants/teamType";
import { useTranslation } from "react-i18next";
import { StarRounded, WaterDropRounded } from "@mui/icons-material";

export default function StepThree(props: {
    control: Control<NewRoundForm>;
    watch: UseFormWatch<NewRoundForm>;
    setValue: UseFormSetValue<NewRoundForm>;
}) {
    const { control, watch, setValue } = props;

    const { t } = useTranslation("scoreboardCurrentPage");

    const { usPit, usWet, themPit, themWet, goingTeam } = watch();

    const textFieldsDisabled =
        usPit || themPit || themWet === true || usWet === true;

    function handleWetOrPitChange(
        field: "usPit" | "usWet" | "themPit" | "themWet",
        isChecked: boolean,
    ) {
        if (!isChecked) {
            return;
        }

        if (field === "usPit" || field === "themWet") {
            setValue("usPoints", "162");
            setValue("themPoints", "0");
        }
        if (field === "usWet" || field === "themPit") {
            setValue("usPoints", "0");
            setValue("themPoints", "162");
        }
    }

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={12}>
                <Typography variant="h6">
                    {t("roundDialog.step3.countCards")}
                </Typography>
            </Grid2>
            <Grid2
                container
                justifyContent="center"
                size={{
                    xs: 12,
                    md: 6,
                }}
            >
                <Grid2 size={12}>
                    <Controller
                        render={({ field }) => (
                            <TextField
                                disabled={textFieldsDisabled}
                                label={t("roundDialog.us")}
                                onChange={field.onChange}
                                value={field.value}
                                onBlur={field.onBlur}
                                name={field.name}
                            />
                        )}
                        defaultValue={""}
                        name="usPoints"
                        control={control}
                    />
                </Grid2>
                <Grid2>
                    <ButtonGroup>
                        <Controller
                            defaultValue={false}
                            render={({ field }) => {
                                const disabled =
                                    themPit || themWet === true || usWet === true;

                                return (
                                    <Button
                                        disabled={disabled}
                                        variant={
                                            field.value ? "contained" : "outlined"
                                        }
                                        startIcon={<StarRounded />}
                                        onClick={() => {
                                            field.onChange(!field.value);
                                            handleWetOrPitChange(
                                                "usPit",
                                                !field.value,
                                            );
                                        }}
                                    >
                                        {t("roundDialog.step3.pit")}
                                    </Button>
                                );
                            }}
                            name="usPit"
                            control={control}
                        />
                        {goingTeam === TEAM_TYPE.US ? (
                            <Controller
                                render={({ field }) => {
                                    const disabled = usPit || themPit || themWet;

                                    return (
                                        <Button
                                            disabled={disabled}
                                            variant={
                                                field.value === true
                                                    ? "contained"
                                                    : "outlined"
                                            }
                                            onClick={() => {
                                                field.onChange(
                                                    field.value === false,
                                                );
                                                handleWetOrPitChange(
                                                    "usWet",
                                                    field.value === false,
                                                );
                                            }}
                                            startIcon={<WaterDropRounded />}
                                        >
                                            {t("roundDialog.step3.wet")}
                                        </Button>
                                    );
                                }}
                                defaultValue={false}
                                name="usWet"
                                control={control}
                            />
                        ) : null}
                    </ButtonGroup>
                </Grid2>
            </Grid2>
            <Grid2
                container
                justifyContent="center"
                size={{
                    xs: 12,
                    md: 6,
                }}
            >
                <Grid2 size={12}>
                    <Controller
                        render={({ field }) => (
                            <TextField
                                disabled={textFieldsDisabled}
                                label={t("roundDialog.them")}
                                onBlur={field.onBlur}
                                onChange={field.onChange}
                                value={field.value}
                            />
                        )}
                        defaultValue={""}
                        name={"themPoints"}
                        control={control}
                    />
                </Grid2>
                <Grid2>
                    <ButtonGroup>
                        <Controller
                            defaultValue={false}
                            render={({ field }) => {
                                const disabled =
                                    usPit || usWet === true || themWet === true;

                                return (
                                    <Button
                                        variant={
                                            field.value ? "contained" : "outlined"
                                        }
                                        onClick={() => {
                                            field.onChange(!field.value);
                                            handleWetOrPitChange(
                                                "themPit",
                                                !field.value,
                                            );
                                        }}
                                        startIcon={<StarRounded />}
                                        disabled={disabled}
                                    >
                                        {t("roundDialog.step3.pit")}
                                    </Button>
                                );
                            }}
                            name="themPit"
                            control={control}
                        />
                        {goingTeam === TEAM_TYPE.THEM ? (
                            <Controller
                                render={({ field }) => {
                                    const disabled =
                                        usPit || usWet === true || themPit;

                                    return (
                                        <Button
                                            variant={
                                                field.value === true
                                                    ? "contained"
                                                    : "outlined"
                                            }
                                            disabled={disabled}
                                            onClick={() => {
                                                field.onChange(
                                                    field.value === false,
                                                );
                                                handleWetOrPitChange(
                                                    "themWet",
                                                    field.value === false,
                                                );
                                            }}
                                            startIcon={<WaterDropRounded />}
                                        >
                                            {t("roundDialog.step3.wet")}
                                        </Button>
                                    );
                                }}
                                defaultValue={false}
                                name="themWet"
                                control={control}
                            />
                        ) : null}
                    </ButtonGroup>
                </Grid2>
            </Grid2>
        </Grid2>
    );
}
