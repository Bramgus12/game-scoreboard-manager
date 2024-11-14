"use client";

import { Button, Grid2, IconButton, TextField, Typography } from "@mui/material";
import { Language } from "@/app/i18n/settings";
import { useTranslation } from "@/app/i18n/client";
import SetupMfaDialog from "@/pageComponents/user/setupMfaDialog";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getAllMfaFactors, removeMfa } from "@/app/[lng]/user/actions";
import { DeleteRounded, KeyRounded } from "@mui/icons-material";

type MfaForm = {
    name: string;
};

export default function Mfa(props: {
    lng: Language;
    mfaFactors: Awaited<ReturnType<typeof getAllMfaFactors>>;
}) {
    const { lng, mfaFactors } = props;

    const { t } = useTranslation(lng, "accountSettings");

    const { control, handleSubmit, reset } = useForm<MfaForm>({
        defaultValues: { name: "" },
    });

    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>();

    function openDialog() {
        setOpen(true);
    }

    const closeDialog = useCallback(() => {
        setOpen(false);
        setName(undefined);
    }, []);

    function handleFormValid(data: MfaForm) {
        setName(data.name);
        openDialog();
        reset();
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleFormValid)}>
                <Grid2 container spacing={2} justifyContent="flex-end">
                    {(mfaFactors.data?.totp.length ?? 0) >= 0 && (
                        <Grid2 container spacing={2}>
                            <Grid2 size={12}>
                                <Typography variant="subtitle1" fontWeight={700}>
                                    {t("existingMfaKeys.title")}
                                </Typography>
                            </Grid2>
                            {mfaFactors.data?.totp.map((factor) => (
                                <Grid2 size={12} container key={factor.id}>
                                    <Grid2>
                                        <KeyRounded />
                                    </Grid2>
                                    <Grid2 size="grow">
                                        <Typography key={factor.id}>
                                            {factor.friendly_name}
                                        </Typography>
                                    </Grid2>
                                    <Grid2>
                                        <IconButton
                                            onClick={() => removeMfa(factor.id)}
                                        >
                                            <DeleteRounded />
                                        </IconButton>
                                    </Grid2>
                                </Grid2>
                            ))}
                        </Grid2>
                    )}
                    <Grid2 size={12}>
                        <Typography variant="subtitle1" fontWeight={700}>
                            {t("mfa.title")}
                        </Typography>
                    </Grid2>
                    <Grid2 size={12}>
                        <Controller
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    inputRef={field.ref}
                                    label={t("mfa.friendlyName")}
                                    required
                                />
                            )}
                            name="name"
                            control={control}
                            rules={{ required: true }}
                        />
                    </Grid2>
                    <Grid2>
                        <Button variant="contained" type="submit">
                            {t("mfa.createFactor")}
                        </Button>
                    </Grid2>
                </Grid2>
            </form>
            <SetupMfaDialog
                open={open}
                onClose={closeDialog}
                name={name}
                lng={lng}
            />
        </>
    );
}
