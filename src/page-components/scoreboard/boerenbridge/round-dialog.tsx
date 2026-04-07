"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    createBoerenbridgeRoundSchema,
    CreateBoerenbridgeRoundFormInput,
} from "@/validation/create-boerenbridge-round-schema";
import { UUID } from "crypto";
import { AppBoerenbridgePlayer } from "@/models/app/boerenbridge-player/boerenbridge-player";
import {
    useCreateBoerenbridgeRoundMutation,
    useUpdateBoerenbridgeRoundMutation,
} from "@/mutations/use-boerenbridge-mutations";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { AppBoerenbridgeRoundRow } from "@/models/app/boerenbridge-round/boerenbridge-round-row";
import {
    getActualWinsOptions,
    getExpectedWinsOptions,
    getInitialRoundDialogValues,
    hasExpectedWinsRangeError,
} from "@/page-components/scoreboard/boerenbridge/round-dialog-helpers";
import BoerenbridgeRoundDialogPlayerRow from "@/page-components/scoreboard/boerenbridge/round-dialog-player-row";

type Props = {
    open: boolean;
    scoreboardId: UUID;
    players: Array<AppBoerenbridgePlayer>;
    roundNumber: number;
    editRound?: AppBoerenbridgeRoundRow;
    onOpenChange: (open: boolean) => void;
};

export default function BoerenbridgeRoundDialog(props: Props) {
    const { open, scoreboardId, players, roundNumber, editRound, onOpenChange } =
        props;

    const t = useTranslations("boerenbridge.roundDialog");
    const createRoundMutation = useCreateBoerenbridgeRoundMutation();
    const updateRoundMutation = useUpdateBoerenbridgeRoundMutation();

    const initialValues = useMemo(
        () => getInitialRoundDialogValues(players, roundNumber, editRound),
        [players, roundNumber, editRound],
    );

    const [step, setStep] = useState<1 | 2>(1);
    const [stepOneData, setStepOneData] =
        useState<CreateBoerenbridgeRoundFormInput | null>(null);

    const form = useForm<CreateBoerenbridgeRoundFormInput>({
        mode: "onBlur",
        resolver: zodResolver(createBoerenbridgeRoundSchema, undefined, {
            raw: true,
        }),
        values: step === 1 ? initialValues : (stepOneData ?? initialValues),
    });

    const isEditMode = editRound != null;
    const actualWinsOptions = useMemo(
        () => getActualWinsOptions(roundNumber, players.length),
        [roundNumber, players.length],
    );

    function handleClose() {
        setStep(1);
        setStepOneData(null);
        form.reset(initialValues);
        onOpenChange(false);
    }

    function handleStepOneContinue(data: CreateBoerenbridgeRoundFormInput) {
        const parsedData = createBoerenbridgeRoundSchema.parse(data);
        let hasError = false;

        parsedData.entries.forEach((entry, index) => {
            if (hasExpectedWinsRangeError(entry.expectedWins, roundNumber)) {
                form.setError(`entries.${index}.expectedWins`, {
                    type: "manual",
                    message: t("expectedWinsRangeError", { round: roundNumber }),
                });
                hasError = true;
            }
        });

        const totalExpectedWins = parsedData.entries.reduce(
            (accumulator, entry) => accumulator + entry.expectedWins,
            0,
        );

        if (totalExpectedWins === roundNumber) {
            form.setError("entries", {
                type: "manual",
                message: t("expectedWinsSumError", { round: roundNumber }),
            });
            hasError = true;
        }

        if (hasError) {
            return;
        }

        setStepOneData(data);
        setStep(2);
    }

    async function handleStepTwoSubmit(data: CreateBoerenbridgeRoundFormInput) {
        const parsedData = createBoerenbridgeRoundSchema.parse(data);
        let hasError = false;

        parsedData.entries.forEach((entry, index) => {
            if (entry.actualWins < 0 || entry.actualWins > roundNumber) {
                form.setError(`entries.${index}.actualWins`, {
                    type: "manual",
                    message: t("actualWinsRangeError", { round: roundNumber }),
                });
                hasError = true;
            }
        });

        const actualWinsTotal = parsedData.entries.reduce(
            (accumulator, entry) => accumulator + entry.actualWins,
            0,
        );

        if (actualWinsTotal !== roundNumber) {
            form.setError("entries", {
                type: "manual",
                message: t("actualWinsSumError", { round: roundNumber }),
            });
            hasError = true;
        }

        if (hasError) {
            return;
        }

        if (isEditMode) {
            await updateRoundMutation.mutateAsync({
                scoreboardId,
                data: parsedData,
            });
        } else {
            await createRoundMutation.mutateAsync({
                scoreboardId,
                data: parsedData,
            });
        }

        handleClose();
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (isOpen) {
                    return;
                }
                handleClose();
            }}
        >
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? t("editTitle") : t("title")}</DialogTitle>
                    <DialogDescription>
                        {step === 1 ? t("stepOneDescription") : t("stepTwoDescription")}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={
                            step === 1
                                ? form.handleSubmit(handleStepOneContinue)
                                : form.handleSubmit(handleStepTwoSubmit)
                        }
                    >
                        {players.map((player, index) => (
                            <BoerenbridgeRoundDialogPlayerRow
                                key={player.id}
                                playerName={player.name}
                                playerIndex={index}
                                step={step}
                                form={form}
                                expectedWinsOptions={getExpectedWinsOptions(
                                    roundNumber,
                                    players.length,
                                )}
                                actualWinsOptions={actualWinsOptions}
                                expectedWinsLabel={t("expectedWins")}
                                actualWinsLabel={t("actualWins")}
                            />
                        ))}
                        {form.formState.errors.entries?.message ? (
                            <p className="text-destructive text-sm">
                                {form.formState.errors.entries.message}
                            </p>
                        ) : null}
                        <DialogFooter>
                            {step === 2 ? (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setStep(1)}
                                >
                                    {t("backButton")}
                                </Button>
                            ) : null}
                            <Button type="submit">
                                {step === 1
                                    ? t("continueButton")
                                    : isEditMode
                                      ? t("updateButton")
                                      : t("confirmButton")}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
