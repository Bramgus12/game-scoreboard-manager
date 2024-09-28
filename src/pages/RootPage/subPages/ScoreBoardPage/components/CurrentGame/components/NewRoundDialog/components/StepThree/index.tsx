import { Button, ButtonGroup, Grid2, TextField, Typography } from "@mui/material";
import { Control, Controller, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { NewRoundForm } from "../../index";
import { useEffect } from "react";

export default function StepThree(props: {
    control: Control<NewRoundForm>;
    watch: UseFormWatch<NewRoundForm>;
    setValue: UseFormSetValue<NewRoundForm>;
}) {
    const { control, watch, setValue } = props;

    const { usPit, usWet, themPit, themWet } = watch();

    const textFieldsDisabled = usPit || usWet || themPit || themWet;

    useEffect(() => {
        if (usPit) {
            setValue("usPoints", 162);
            setValue("themPoints", 0);
        }
        if (usWet) {
            setValue("usPoints", 0);
            setValue("themPoints", 162);
        }
        if (themPit) {
            setValue("usPoints", 0);
            setValue("themPoints", 162);
        }
        if (themWet) {
            setValue("usPoints", 162);
            setValue("themPoints", 0);
        }
    }, [setValue, themPit, themWet, usPit, usWet]);

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={12}>
                <Typography variant="h6">Count the cards</Typography>
            </Grid2>
            <Grid2 container justifyContent="center" size={6}>
                <Grid2 size={12}>
                    <Controller
                        render={({ field }) => (
                            <TextField
                                disabled={textFieldsDisabled}
                                label="Us"
                                onChange={field.onChange}
                                value={field.value}
                                onBlur={field.onBlur}
                                name={field.name}
                            />
                        )}
                        defaultValue={0}
                        name="usPoints"
                        control={control}
                    />
                </Grid2>
                <Grid2>
                    <ButtonGroup>
                        <Controller
                            defaultValue={false}
                            render={({ field }) => {
                                const disabled = usWet || themPit || themWet;

                                return (
                                    <Button
                                        disabled={disabled}
                                        variant={
                                            field.value ? "contained" : "outlined"
                                        }
                                        onClick={() => field.onChange(!field.value)}
                                    >
                                        Pit
                                    </Button>
                                );
                            }}
                            name="usPit"
                            control={control}
                        />
                        <Controller
                            render={({ field }) => {
                                const disabled = usPit || themPit || themWet;

                                return (
                                    <Button
                                        disabled={disabled}
                                        variant={
                                            field.value ? "contained" : "outlined"
                                        }
                                        onClick={() => field.onChange(!field.value)}
                                    >
                                        Wet
                                    </Button>
                                );
                            }}
                            defaultValue={false}
                            name="usWet"
                            control={control}
                        />
                    </ButtonGroup>
                </Grid2>
            </Grid2>
            <Grid2 container justifyContent="center" size="grow">
                <Grid2 size={12}>
                    <Controller
                        render={({ field }) => (
                            <TextField
                                disabled={textFieldsDisabled}
                                label="Them"
                                onBlur={field.onBlur}
                                onChange={field.onChange}
                                value={field.value}
                            />
                        )}
                        defaultValue={0}
                        name={"themPoints"}
                        control={control}
                    />
                </Grid2>
                <Grid2>
                    <ButtonGroup>
                        <Controller
                            defaultValue={false}
                            render={({ field }) => {
                                const disabled = usPit || usWet || themWet;

                                return (
                                    <Button
                                        variant={
                                            field.value ? "contained" : "outlined"
                                        }
                                        onClick={() => field.onChange(!field.value)}
                                        disabled={disabled}
                                    >
                                        Pit
                                    </Button>
                                );
                            }}
                            name="themPit"
                            control={control}
                        />
                        <Controller
                            render={({ field }) => {
                                const disabled = usPit || usWet || themPit;

                                return (
                                    <Button
                                        variant={
                                            field.value ? "contained" : "outlined"
                                        }
                                        disabled={disabled}
                                        onClick={() => field.onChange(!field.value)}
                                    >
                                        Wet
                                    </Button>
                                );
                            }}
                            defaultValue={false}
                            name="themWet"
                            control={control}
                        />
                    </ButtonGroup>
                </Grid2>
            </Grid2>
        </Grid2>
    );
}
