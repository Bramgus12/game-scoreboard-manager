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
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Asterisk, Droplets, Loader2Icon, Sparkles } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import QUERY_KEY from "@/constants/query-key";
import { MergedRound } from "@/models/app/klaverjas-round/merged-round";
import { AppUpdateKlaverjasRound } from "@/models/app/klaverjas-round/update-klaverjas-round";
import {
    createKlaverjasRoundsForBothTeams,
    getRoundNumber,
    updateKlaverjasRoundsForBothTeams,
} from "@/server/service/klaverjas";

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
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function RoundDialog(props: Props) {
    const {
        scoreboardId,
        editRound,
        isEditMode = false,
        open,
        onOpenChange,
    } = props;

    const queryClient = useQueryClient();

    const t = useTranslations("klaverjas.createRoundDialog");

    const { data: teams, isPending, isError } = useKlaverjasTeamsQuery(scoreboardId);

    const [isLoading, setIsLoading] = useState(false);

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
        onOpenChange(false);
    }

    async function submitRound(data: CreateRoundForm) {
        try {
            setIsLoading(true);
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

                await updateKlaverjasRoundsForBothTeams(
                    scoreboardId,
                    ourRound,
                    theirRound,
                );
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

                await createKlaverjasRoundsForBothTeams(
                    scoreboardId,
                    ourRound,
                    theirRound,
                );
            }

            void queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.KLAVERJAS_ROUNDS_FOR_SCOREBOARD],
            });

            void queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.KLAVERJAS_TOTALS_FOR_SCOREBOARD],
            });

            handleClose();
        } finally {
            setIsLoading(false);
        }
    }

    if (isPending) {
        return null;
    }

    if (isError || !teams) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
                                            <FormLabel>{teams.us.name}</FormLabel>
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
                                            <FormLabel>{teams.them.name}</FormLabel>
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
                                                            field.onChange(checked);
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
                                                            field.onChange(checked);
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
                                                    onCheckedChange={(checked) => {
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
                                                    onCheckedChange={(checked) => {
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
                        {isLoading ? <Loader2Icon className="animate-spin" /> : null}
                        {isEditMode ? t("updateButton") : t("confirmButton")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
