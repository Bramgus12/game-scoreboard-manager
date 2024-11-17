"use client";

import { Button, Grid2, TextField, Typography } from "@mui/material";
import { Language } from "@/app/i18n/settings";
import { Controller, useForm } from "react-hook-form";
import { verifyMfa } from "@/app/[lng]/(auth)/mfa/actions";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

type MfaVerifyForm = {
    verifyCode: string;
};

export default function MfaVerify(props: { lng: Language }) {
    const { lng } = props;

    const { t } = useTranslation(lng, "auth");

    const router = useRouter();

    const { control, handleSubmit } = useForm<MfaVerifyForm>({
        defaultValues: { verifyCode: "" },
    });

    async function onValid(data: MfaVerifyForm) {
        try {
            await verifyMfa(data.verifyCode);

            router.push(`/${lng}/`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onValid)}>
            <Grid2 container spacing={10}>
                <Grid2 size={12}>
                    <Typography variant="subtitle1">{t("mfa.enterCode")}</Typography>
                </Grid2>
                <Grid2 container spacing={2} justifyContent="flex-end" size={12}>
                    <Grid2 size={12}>
                        <Controller
                            render={({ field }) => (
                                <TextField
                                    label={t("mfa.code")}
                                    autoComplete="one-time-code"
                                    inputRef={field.ref}
                                    {...field}
                                />
                            )}
                            name="verifyCode"
                            control={control}
                        />
                    </Grid2>
                    <Button type="submit">{t("mfa.verify")}</Button>
                </Grid2>
            </Grid2>
        </form>
    );
}
