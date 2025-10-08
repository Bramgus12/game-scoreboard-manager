"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm, useWatch } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useKlaverjasTeamsQuery from "@/queries/use-klaverjas-teams-query";
import { UUID } from "crypto";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppCreateKlaverjasRound } from "@/models/app/klaverjas-round/create-klaverjas-round";
import {
    createRound,
    getRoundNumber,
    updateRound,
} from "@/actions/klaverjas-actions";
import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Asterisk, Droplets, Loader2Icon, Sparkles } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import QUERY_KEY from "@/constants/query-key";
import { MergedRound } from "@/models/app/klaverjas-round/merged-round";
import { AppUpdateKlaverjasRound } from "@/models/app/klaverjas-round/update-klaverjas-round";
import { getFame } from "@/utils/funcs/get-fame";

const createRoundSchema = z
    .object({
        isGoingTeam: z.uuid().optional(),
        us: z.object({
            points: z
                .number({ message: "Value must be a number" })
                .min(0, { message: "Value must be a number" })
                .nullable(),
            fame: z
                .number({ message: "Value must be a number" })
                .min(0, { message: "Value must be a number" })
                .nullable(),
            isWet: z.boolean(),
            isPit: z.boolean(),
        }),
        them: z.object({
            points: z
                .number({ message: "Value must be a number" })
                .min(0, { message: "Value must be a number" })
                .nullable(),
            fame: z
                .number({ message: "Value must be a number" })
                .min(0, { message: "Value must be a number" })
                .nullable(),
            isWet: z.boolean(),
            isPit: z.boolean(),
        }),
    })
    .superRefine((data, ctx) => {
        if (data.isGoingTeam == null) {
            ctx.addIssue({
                code: "custom",
                message: "You must select which team is going",
                path: ["isGoingTeam"],
            });
        }

        if (
            data.us.points == null ||
            data.them.points == null ||
            data.us.points + data.them.points !== 162
        ) {
            ctx.addIssue({
                code: "custom",
                message: "The total points must be 162",
                path: ["us", "points"],
            });
            ctx.addIssue({
                code: "custom",
                message: "The total points must be 162",
                path: ["them", "points"],
            });
        }
    });

type CreateRoundForm = z.output<typeof createRoundSchema>;

type Props = {
    scoreboardId: UUID;
    editRound?: MergedRound;
    isEditMode?: boolean;
    onOpenChange?: (open: boolean) => void;
};

export default function CreateRoundDialog(props: Props) {
    const { scoreboardId, editRound, isEditMode = false, onOpenChange } = props;

    const queryClient = useQueryClient();

    const t = useTranslations("klaverjas.createRoundDialog");

    const { data: teams, isPending, isError } = useKlaverjasTeamsQuery(scoreboardId);

    const [open, setOpen] = useState(isEditMode);
    const [isLoading, setIsLoading] = useState(false);

    // Effect to handle external open state control for edit mode
    useEffect(() => {
        if (isEditMode) {
            setOpen(true);
        }
    }, [isEditMode]);

    // Helper function to get default values for edit mode
    const getDefaultValues = useCallback((): CreateRoundForm => {
        if (isEditMode && editRound && teams) {
            // Determine which team is going
            const isGoingTeamId = editRound.team1.isGoing
                ? teams.us.id
                : editRound.team2.isGoing
                  ? teams.them.id
                  : undefined;

            return {
                isGoingTeam: isGoingTeamId,
                us: {
                    points: editRound.team1.points,
                    fame: editRound.team1.fame,
                    isWet: editRound.team1.isWet,
                    isPit: editRound.team1.isPit,
                },
                them: {
                    points: editRound.team2.points,
                    fame: editRound.team2.fame,
                    isWet: editRound.team2.isWet,
                    isPit: editRound.team2.isPit,
                },
            };
        }

        return {
            isGoingTeam: undefined,
            us: {
                points: null,
                fame: null,
                isWet: false,
                isPit: false,
            },
            them: {
                points: null,
                fame: null,
                isWet: false,
                isPit: false,
            },
        };
    }, [isEditMode, editRound, teams]);

    const form = useForm<CreateRoundForm>({
        mode: "onChange",
        resolver: zodResolver(createRoundSchema),
        defaultValues: getDefaultValues(),
    });

    // Reset form when teams data loads or editRound changes
    useEffect(() => {
        if (teams && (isEditMode ? editRound : true)) {
            form.reset(getDefaultValues());
        }
    }, [teams, editRound, isEditMode, form, getDefaultValues]);

    const [isGoingTeam, isUsWet, isUsPit, isThemWet, isThemPit] = useWatch({
        control: form.control,
        name: ["isGoingTeam", "us.isWet", "us.isPit", "them.isWet", "them.isPit"],
    });

    function handleClose() {
        form.reset();
        setOpen(false);
        if (onOpenChange) {
            onOpenChange(false);
        }
    }

    // Helper function to calculate fame values for both teams
    function calculateFameValues(data: CreateRoundForm) {
        let ourFame = data.us.fame ?? 0;
        let theirFame = data.them.fame ?? 0;

        if (data.us.isWet) {
            ourFame = 0;
            theirFame += data.us.fame ?? 0;
        }
        if (data.them.isWet) {
            theirFame = 0;
            ourFame += data.them.fame ?? 0;
        }
        if (data.us.isPit) {
            ourFame += 100;
        }
        if (data.them.isPit) {
            theirFame += 100;
        }

        return { ourFame, theirFame };
    }

    // Helper function to handle server updates/creation
    async function handleServerUpdate(
        data: CreateRoundForm,
        ourFame: number,
        theirFame: number,
    ) {
        if (teams == null || isGoingTeam == null) {
            return;
        }

        if (isEditMode && editRound) {
            // Edit mode: update existing round
            const ourRound: AppUpdateKlaverjasRound = {
                id: editRound.team1.id,
                roundNumber: editRound.roundNumber,
                points: data.us.points ?? 0,
                fame: ourFame,
                isWet: data.us.isWet,
                isPit: data.us.isPit,
                isGoing: isGoingTeam === teams.us.id,
            };

            const theirRound: AppUpdateKlaverjasRound = {
                id: editRound.team2.id,
                roundNumber: editRound.roundNumber,
                points: data.them.points ?? 0,
                fame: theirFame,
                isWet: data.them.isWet,
                isPit: data.them.isPit,
                isGoing: isGoingTeam === teams.them.id,
            };

            await updateRound(teams.us.id, ourRound);
            await updateRound(teams.them.id, theirRound);
        } else {
            // Create mode: create new round
            const currentRoundNumber = await getRoundNumber(scoreboardId);

            const ourRound: AppCreateKlaverjasRound = {
                roundNumber: currentRoundNumber,
                points: data.us.points ?? 0,
                fame: ourFame,
                isWet: data.us.isWet,
                isPit: data.us.isPit,
                isGoing: isGoingTeam === teams.us.id,
            };

            const theirRound: AppCreateKlaverjasRound = {
                roundNumber: currentRoundNumber,
                points: data.them.points ?? 0,
                fame: theirFame,
                isWet: data.them.isWet,
                isPit: data.them.isPit,
                isGoing: isGoingTeam === teams.them.id,
            };

            await createRound(teams.us.id, ourRound);
            await createRound(teams.them.id, theirRound);
        }
    }

    // Helper function to update optimistic query data
    function updateOptimisticData(
        data: CreateRoundForm,
        ourFame: number,
        theirFame: number,
    ) {
        if (teams == null || isGoingTeam == null) {
            return;
        }

        // Get current rounds data
        const currentRounds =
            queryClient.getQueryData<Array<MergedRound>>([
                QUERY_KEY.KLAVERJAS_ROUNDS_FOR_SCOREBOARD,
                { scoreboardId },
            ]) || [];

        let updatedRounds: Array<MergedRound>;

        if (isEditMode && editRound) {
            // Update existing round
            updatedRounds = currentRounds.map((round) =>
                round.roundNumber === editRound.roundNumber
                    ? {
                          ...round,
                          team1: {
                              ...round.team1,
                              points: data.us.points ?? 0,
                              fame: ourFame,
                              isWet: data.us.isWet,
                              isPit: data.us.isPit,
                              isGoing: isGoingTeam === teams.us.id,
                          },
                          team2: {
                              ...round.team2,
                              points: data.them.points ?? 0,
                              fame: theirFame,
                              isWet: data.them.isWet,
                              isPit: data.them.isPit,
                              isGoing: isGoingTeam === teams.them.id,
                          },
                      }
                    : round,
            );
        } else {
            // Add new round
            const newRoundNumber =
                Math.max(...currentRounds.map((r) => r.roundNumber), 0) + 1;
            const now = new Date();
            const newRound: MergedRound = {
                roundNumber: newRoundNumber,
                team1: {
                    id: teams.us.id,
                    createdAt: now,
                    updatedAt: now,
                    roundNumber: newRoundNumber,
                    points: data.us.points ?? 0,
                    fame: ourFame,
                    isWet: data.us.isWet,
                    isPit: data.us.isPit,
                    isGoing: isGoingTeam === teams.us.id,
                    klaverjasTeam: teams.us.id,
                },
                team2: {
                    id: teams.them.id,
                    createdAt: now,
                    updatedAt: now,
                    roundNumber: newRoundNumber,
                    points: data.them.points ?? 0,
                    fame: theirFame,
                    isWet: data.them.isWet,
                    isPit: data.them.isPit,
                    isGoing: isGoingTeam === teams.them.id,
                    klaverjasTeam: teams.them.id,
                },
            };
            updatedRounds = [...currentRounds, newRound].sort(
                (a, b) => a.roundNumber - b.roundNumber,
            );
        }

        // Calculate new totals using the same logic as the server
        const newTotals = calculateTotalsFromRounds(updatedRounds);

        console.log({ updatedRounds, newTotals });

        // Set the optimistic data
        queryClient.setQueryData(
            [QUERY_KEY.KLAVERJAS_ROUNDS_FOR_SCOREBOARD, { scoreboardId }],
            updatedRounds,
        );

        queryClient.setQueryData(
            [QUERY_KEY.KLAVERJAS_TOTALS_FOR_SCOREBOARD, { scoreboardId }],
            newTotals,
        );
    }

    // Helper function to calculate totals from rounds
    function calculateTotalsFromRounds(rounds: Array<MergedRound>) {
        return rounds.reduce(
            (acc, round) => {
                // Use the getFame function to calculate fame correctly
                const team1Fame = getFame(round, "team1");
                const team2Fame = getFame(round, "team2");

                return {
                    us: acc.us + round.team1.points + team1Fame,
                    them: acc.them + round.team2.points + team2Fame,
                };
            },
            { us: 0, them: 0 },
        );
    }

    // Helper function to invalidate queries
    function invalidateQueries() {
        void queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.KLAVERJAS_ROUNDS_FOR_SCOREBOARD],
        });

        void queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.KLAVERJAS_TOTALS_FOR_SCOREBOARD],
        });
    }

    async function submitRound(data: CreateRoundForm) {
        try {
            setIsLoading(true);

            // Calculate fame values
            const { ourFame, theirFame } = calculateFameValues(data);

            // Handle server update/creation
            await handleServerUpdate(data, ourFame, theirFame);

            // Update optimistic data
            updateOptimisticData(data, ourFame, theirFame);

            // Invalidate to ensure server sync
            invalidateQueries();

            handleClose();
        } finally {
            setIsLoading(false);
        }
    }

    if (isPending) {
        return (
            <Button variant="default" disabled>
                {t("loadingButton")}
            </Button>
        );
    }

    if (isError || !teams) {
        return null;
    }

    return (
        <>
            {!isEditMode && (
                <Button variant="default" onClick={() => setOpen(true)}>
                    {t("newRound")}
                </Button>
            )}
            <Dialog
                open={isEditMode || open}
                onOpenChange={(isOpen) => {
                    if (isEditMode) {
                        if (onOpenChange) {
                            onOpenChange(isOpen);
                        }
                    } else {
                        if (isOpen) {
                            setOpen(true);
                        } else {
                            handleClose();
                        }
                    }
                }}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {isEditMode ? t("editTitle") : t("title")}
                        </DialogTitle>
                        <DialogDescription>
                            {isEditMode ? t("editDescription") : t("description")}
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={form.handleSubmit(submitRound)}
                        >
                            <FormField
                                control={form.control}
                                name="isGoingTeam"
                                rules={{
                                    onChange: () => {
                                        form.setValue("us.isPit", false);
                                        form.setValue("them.isPit", false);
                                        form.setValue("us.isWet", false);
                                        form.setValue("them.isWet", false);
                                    },
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <Asterisk size={16} />
                                            {t("isGoingSelectLabel")}
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={teams.us.id}>
                                                    {teams.us.name}
                                                </SelectItem>
                                                <SelectItem value={teams.them.id}>
                                                    {teams.them.name}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-1 flex-row gap-4">
                                <FormField
                                    control={form.control}
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex-1">
                                                <FormLabel>
                                                    {teams.us.name}
                                                </FormLabel>
                                                <FormDescription>
                                                    {t("fameScoredByLabel", {
                                                        value: teams?.us.name,
                                                    })}
                                                </FormDescription>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Fame"
                                                        value={field.value ?? ""}
                                                        onChange={(event) => {
                                                            const next =
                                                                event.target.value;

                                                            field.onChange(
                                                                next === ""
                                                                    ? null
                                                                    : Number(next),
                                                            );
                                                        }}
                                                        onBlur={field.onBlur}
                                                        name={field.name}
                                                        ref={field.ref}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                    name="us.fame"
                                />
                                <FormField
                                    control={form.control}
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex-1">
                                                <FormLabel>
                                                    {teams.them.name}
                                                </FormLabel>
                                                <FormDescription>
                                                    {t("fameScoredByLabel", {
                                                        value: teams?.them.name,
                                                    })}
                                                </FormDescription>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Fame"
                                                        value={field.value ?? ""}
                                                        onChange={(event) => {
                                                            const next =
                                                                event.target.value;

                                                            field.onChange(
                                                                next === ""
                                                                    ? null
                                                                    : Number(next),
                                                            );
                                                        }}
                                                        onBlur={field.onBlur}
                                                        name={field.name}
                                                        ref={field.ref}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                    name="them.fame"
                                />
                            </div>
                            <div className="flex flex-1 flex-row gap-4">
                                <FormField
                                    control={form.control}
                                    rules={{
                                        deps: ["them.points"],
                                    }}
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex-1">
                                                <FormDescription>
                                                    {t("pointsScoredByLabel", {
                                                        value: teams?.us.name,
                                                    })}
                                                </FormDescription>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Points"
                                                        value={field.value ?? ""}
                                                        disabled={
                                                            isUsPit ||
                                                            isThemPit ||
                                                            isUsWet ||
                                                            isThemWet
                                                        }
                                                        onChange={(event) => {
                                                            const next =
                                                                event.target.value;

                                                            field.onChange(
                                                                next === ""
                                                                    ? null
                                                                    : Number(next),
                                                            );
                                                        }}
                                                        onBlur={field.onBlur}
                                                        name={field.name}
                                                        ref={field.ref}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                    name="us.points"
                                />
                                <FormField
                                    control={form.control}
                                    rules={{
                                        deps: ["us.points"],
                                    }}
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex-1">
                                                <FormDescription>
                                                    {t("pointsScoredByLabel", {
                                                        value: teams?.them.name,
                                                    })}
                                                </FormDescription>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Points"
                                                        value={field.value ?? ""}
                                                        disabled={
                                                            isUsPit ||
                                                            isThemPit ||
                                                            isUsWet ||
                                                            isThemWet
                                                        }
                                                        onChange={(event) => {
                                                            const next =
                                                                event.target.value;

                                                            field.onChange(
                                                                next === ""
                                                                    ? null
                                                                    : Number(next),
                                                            );
                                                        }}
                                                        onBlur={field.onBlur}
                                                        name={field.name}
                                                        ref={field.ref}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                    name="them.points"
                                />
                            </div>
                            <div className="flex flex-1 flex-row gap-4">
                                {isGoingTeam === teams.us.id ? (
                                    <FormField
                                        control={form.control}
                                        name="us.isWet"
                                        rules={{
                                            onChange: (value) => {
                                                if (value === false) {
                                                    return;
                                                }

                                                form.setValue("them.points", 162);
                                                form.setValue("us.points", 0, {
                                                    shouldValidate: true,
                                                });
                                            },
                                        }}
                                        render={({ field }) => {
                                            return (
                                                <FormItem className="flex flex-1 flex-row items-center gap-2">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={(
                                                                checked,
                                                            ) => {
                                                                field.onChange(
                                                                    checked,
                                                                );
                                                            }}
                                                            onBlur={field.onBlur}
                                                            disabled={
                                                                isThemPit ||
                                                                isUsPit ||
                                                                isThemWet
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-sm font-normal">
                                                        {t("wet")}
                                                        <Droplets size={16} />
                                                    </FormLabel>
                                                </FormItem>
                                            );
                                        }}
                                    />
                                ) : (
                                    <span className="flex-1" />
                                )}
                                {isGoingTeam === teams.them.id ? (
                                    <FormField
                                        control={form.control}
                                        name="them.isWet"
                                        rules={{
                                            onChange: (value) => {
                                                if (value === false) {
                                                    return;
                                                }

                                                form.setValue("us.points", 162);
                                                form.setValue("them.points", 0, {
                                                    shouldValidate: true,
                                                });
                                            },
                                        }}
                                        render={({ field }) => {
                                            return (
                                                <FormItem className="flex flex-1 flex-row items-center gap-2">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={(
                                                                checked,
                                                            ) => {
                                                                field.onChange(
                                                                    checked,
                                                                );
                                                            }}
                                                            onBlur={field.onBlur}
                                                            disabled={
                                                                isUsPit ||
                                                                isThemPit ||
                                                                isUsWet
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-sm font-normal">
                                                        {t("wet")}
                                                        <Droplets size={16} />
                                                    </FormLabel>
                                                </FormItem>
                                            );
                                        }}
                                    />
                                ) : null}
                            </div>
                            <div className="flex flex-1 flex-row gap-4">
                                <FormField
                                    control={form.control}
                                    name="us.isPit"
                                    rules={{
                                        onChange: (value) => {
                                            if (value === false) {
                                                return;
                                            }

                                            form.setValue("us.points", 162);
                                            form.setValue("them.points", 0, {
                                                shouldValidate: true,
                                            });
                                        },
                                    }}
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex flex-1 flex-row items-center gap-2">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={(
                                                            checked,
                                                        ) => {
                                                            field.onChange(checked);
                                                        }}
                                                        onBlur={field.onBlur}
                                                        disabled={
                                                            isThemWet ||
                                                            isUsWet ||
                                                            isThemPit
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-sm font-normal">
                                                    {t("pit")}
                                                    <Sparkles size={16} />
                                                </FormLabel>
                                            </FormItem>
                                        );
                                    }}
                                />
                                <FormField
                                    control={form.control}
                                    name="them.isPit"
                                    rules={{
                                        onChange: (value) => {
                                            if (value === false) {
                                                return;
                                            }

                                            form.setValue("them.points", 162);
                                            form.setValue("us.points", 0, {
                                                shouldValidate: true,
                                            });
                                        },
                                    }}
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex flex-1 flex-row items-center gap-2">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={(
                                                            checked,
                                                        ) => {
                                                            field.onChange(checked);
                                                        }}
                                                        disabled={
                                                            isUsWet ||
                                                            isThemWet ||
                                                            isUsPit
                                                        }
                                                        onBlur={field.onBlur}
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-sm font-normal">
                                                    {t("pit")}
                                                    <Sparkles size={16} />
                                                </FormLabel>
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                        </form>
                    </Form>
                    <DialogFooter>
                        <Button
                            disabled={isLoading}
                            onClick={form.handleSubmit(submitRound)}
                        >
                            {isLoading ? (
                                <Loader2Icon className="animate-spin" />
                            ) : null}
                            {isEditMode ? t("updateButton") : t("confirmButton")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
