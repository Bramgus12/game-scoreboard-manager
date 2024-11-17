import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid2,
    TextField,
    Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import {
    challengeMfa,
    enrollMfa,
    removeMfa,
    verifyMfa,
} from "@/app/[lng]/user/actions";
import { Controller, useForm } from "react-hook-form";
import { AuthError } from "@supabase/auth-js";
import { ErrorOutlineRounded } from "@mui/icons-material";
import { Language } from "@/app/i18n/settings";
import { useTranslation } from "@/app/i18n/client";

type Props = {
    open: boolean;
    name?: string;
    onClose: () => void;
    lng: Language;
};

type MfaVerifyForm = {
    code: string;
};

export default function SetupMfaDialog(props: Props) {
    const { open, onClose, name, lng } = props;

    const { t } = useTranslation(lng, "accountSettings");

    const { control, handleSubmit } = useForm<MfaVerifyForm>({
        defaultValues: { code: "" },
    });

    const [qrCode, setQrCode] = useState<string>();
    const [qrCodeText, setQrCodeText] = useState<string>();
    const [factorId, setFactorId] = useState<string>();
    const [error, setError] = useState<AuthError>();

    const handleClose = useCallback(() => {
        onClose();
        setQrCode(undefined);
        setQrCodeText(undefined);
        setFactorId(undefined);
        setError(undefined);
    }, [onClose]);

    const enroll = useCallback(async () => {
        if (name == null) {
            console.error("Name is required");
            return;
        }

        const { data, error } = await enrollMfa(name);

        if (error) {
            setError(error);
        }

        setFactorId(data?.id);

        setQrCode(data?.totp.qr_code);
        setQrCodeText(data?.totp.secret);
    }, [name]);

    useEffect(() => {
        if (open) {
            void enroll();
        }
    }, [enroll, open]);

    async function handleVerify(data: MfaVerifyForm) {
        if (factorId == null) {
            console.error("Factor ID is required");
            return;
        }

        const challenge = await challengeMfa(factorId);
        if (challenge.error) {
            setError(challenge.error);
            throw challenge.error;
        }

        const challengeId = challenge.data.id;

        const verify = await verifyMfa(factorId, challengeId, data.code);
        if (verify.error) {
            setError(verify.error);
            throw verify.error;
        }

        handleClose();
    }

    async function handleCancel() {
        handleClose();
        if (factorId != null) {
            await removeMfa(factorId);
        }
    }

    const isLoading = (qrCode == null || qrCodeText == null) && error == null;

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle fontWeight={700}>{t("mfaDialog.title")}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(handleVerify)}>
                    <Grid2 spacing={2} container justifyContent="center">
                        {isLoading ? (
                            <Grid2>
                                <CircularProgress />
                            </Grid2>
                        ) : null}
                        {error != null ? (
                            <>
                                <Grid2 paddingTop={5}>
                                    <ErrorOutlineRounded />
                                </Grid2>
                                <Grid2 paddingBottom={5} size={12}>
                                    <Typography
                                        sx={{ textAlign: "center" }}
                                        variant="body2"
                                        fontWeight={700}
                                    >
                                        {error.message}
                                    </Typography>
                                </Grid2>
                            </>
                        ) : null}
                        {error == null && !isLoading ? (
                            <>
                                <Grid2>
                                    <Typography>
                                        {t("mfaDialog.description")}
                                    </Typography>
                                </Grid2>
                                <Grid2>
                                    <Box
                                        sx={{
                                            background: "#ffffff",
                                            padding: 1,
                                            borderRadius: 2,
                                        }}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={qrCode}
                                            alt={t("mfaDialog.qrCodeAlt")}
                                        />
                                    </Box>
                                </Grid2>
                                <Grid2>
                                    <Box
                                        sx={(theme) => ({
                                            background:
                                                theme.palette.background.default,
                                            padding: 0.5,
                                            borderRadius: 1,
                                        })}
                                    >
                                        <code>{qrCodeText}</code>
                                    </Box>
                                </Grid2>
                                <Grid2 size={12}>
                                    <Controller
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                inputRef={field.ref}
                                                label={t("mfaDialog.code")}
                                                required
                                                fullWidth
                                            />
                                        )}
                                        name="code"
                                        control={control}
                                        rules={{ required: true }}
                                    />
                                </Grid2>
                            </>
                        ) : null}
                        <Grid2 size={12} container>
                            <Grid2 size={{ xs: 12, sm: 6 }}>
                                <Button
                                    onClick={handleCancel}
                                    fullWidth
                                    variant="contained"
                                    color="error"
                                >
                                    {t("mfaDialog.cancel")}
                                </Button>
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6 }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={isLoading || error != null}
                                >
                                    {t("mfaDialog.submit")}
                                </Button>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </form>
            </DialogContent>
        </Dialog>
    );
}
