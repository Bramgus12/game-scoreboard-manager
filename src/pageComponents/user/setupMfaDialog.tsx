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
import { challengeMfa, enrollMfa, verifyMfa } from "@/app/[lng]/user/actions";
import { Controller, useForm } from "react-hook-form";
import { AuthError } from "@supabase/auth-js";
import { ErrorOutlineRounded } from "@mui/icons-material";

type Props = {
    open: boolean;
    name?: string;
    onClose: () => void;
};

type MfaVerifyForm = {
    code: string;
};

export default function SetupMfaDialog(props: Props) {
    const { open, onClose, name } = props;

    const { control, handleSubmit } = useForm<MfaVerifyForm>({
        defaultValues: { code: "" },
    });

    const [qrCode, setQrCode] = useState<string>();
    const [qrCodeText, setQrCodeText] = useState<string>();
    const [factorId, setFactorId] = useState<string>();
    const [error, setError] = useState<AuthError>();

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

    function handleClose() {
        onClose();
        setQrCode(undefined);
        setQrCodeText(undefined);
        setFactorId(undefined);
        setError(undefined);
    }

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
    }

    const isLoading = (qrCode == null || qrCodeText == null) && error == null;

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Setup Multi-Factor Authentication</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(handleVerify)}>
                    <Grid2
                        spacing={2}
                        container
                        alignItems="center"
                        direction="column"
                    >
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
                                <Grid2 paddingBottom={5}>
                                    <Typography variant="body2" fontWeight={700}>
                                        {error.message}
                                    </Typography>
                                </Grid2>
                            </>
                        ) : null}
                        {error == null && !isLoading ? (
                            <>
                                <Grid2>
                                    <Typography>
                                        Scan the QR code with your authenticator app
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
                                        <img src={qrCode} alt="QR code" />
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
                                <Grid2>
                                    <Controller
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                inputRef={field.ref}
                                                label="Verification code"
                                                required
                                            />
                                        )}
                                        name="code"
                                        control={control}
                                        rules={{ required: true }}
                                    />
                                </Grid2>
                            </>
                        ) : null}
                        <Grid2 alignSelf="end">
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isLoading || error != null}
                            >
                                Verify
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
            </DialogContent>
        </Dialog>
    );
}
