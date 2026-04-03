"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

type Props = {
    open: boolean;
    scoreboardId: UUID;
    players: Array<AppBoerenbridgePlayer>;
    roundNumber: number;
    editRound?: AppBoerenbridgeRoundRow;
    onOpenChange: (open: boolean) => void;
};

function getValuesForStepOne(
    players: Array<AppBoerenbridgePlayer>,
    roundNumber: number,
    editRound?: AppBoerenbridgeRoundRow,
): CreateBoerenbridgeRoundFormInput {
    if (editRound != null) {
        return {
            roundNumber: String(editRound.roundNumber),
            entries: players.map((player) => {
                const entry = editRound.entries.find(
                    (roundEntry) => roundEntry.playerId === player.id,
                );

                return {
                    playerId: player.id,
                    expectedWins: String(entry?.expectedWins ?? 0),
                    actualWins: String(entry?.actualWins ?? 0),
                };
            }),
        };
    }

    return {
        roundNumber: String(roundNumber),
        entries: players.map((player) => ({
            playerId: player.id,
            expectedWins: "0",
            actualWins: "0",
        })),
    };
}

function getExpectedWinsValidationError(
    expectedWins: number,
    currentRound: number,
): string | null {
    if (expectedWins < 0 || expectedWins > currentRound) {
        return "Expected wins must be between 0 and current round";
    }

    return null;
}

export default function BoerenbridgeRoundDialog(props: Props) {
    const { open, scoreboardId, players, roundNumber, editRound, onOpenChange } =
        props;

    const t = useTranslations("boerenbridge.roundDialog");
    const createRoundMutation = useCreateBoerenbridgeRoundMutation();
    const updateRoundMutation = useUpdateBoerenbridgeRoundMutation();

    const initialValues = useMemo(
        () => getValuesForStepOne(players, roundNumber, editRound),
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
            const expectedWinsError = getExpectedWinsValidationError(
                entry.expectedWins,
                roundNumber,
            );

            if (expectedWinsError != null) {
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
                    <DialogTitle>
                        {isEditMode ? t("editTitle") : t("title")}
                    </DialogTitle>
                    <DialogDescription>
                        {step === 1
                            ? t("stepOneDescription")
                            : t("stepTwoDescription")}
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
                            <div
                                key={player.id}
                                className="grid grid-cols-12 items-center gap-2"
                            >
                                <div className="col-span-12 sm:col-span-4">
                                    <span className="text-sm font-medium">
                                        {player.name}
                                    </span>
                                </div>
                                {step === 1 ? (
                                    <FormField
                                        control={form.control}
                                        name={`entries.${index}.expectedWins`}
                                        render={({ field }) => (
                                            <FormItem className="col-span-12 sm:col-span-8">
                                                <FormLabel>
                                                    {t("expectedWins")}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        value={field.value ?? ""}
                                                        onChange={field.onChange}
                                                        onBlur={field.onBlur}
                                                        name={field.name}
                                                        ref={field.ref}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ) : (
                                    <FormField
                                        control={form.control}
                                        name={`entries.${index}.actualWins`}
                                        render={({ field }) => (
                                            <FormItem className="col-span-12 sm:col-span-8">
                                                <FormLabel>
                                                    {t("actualWins")}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        value={field.value ?? ""}
                                                        onChange={field.onChange}
                                                        onBlur={field.onBlur}
                                                        name={field.name}
                                                        ref={field.ref}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>
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
