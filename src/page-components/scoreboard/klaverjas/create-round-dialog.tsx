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
import { createRound, getRoundNumber } from "@/actions/klaverjas-actions";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Asterisk, Droplets, Sparkles } from "lucide-react";

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
};

export default function CreateRoundDialog(props: Props) {
    const { scoreboardId } = props;

    const t = useTranslations("klaverjas.createRoundDialog");

    const { data: teams, isPending, isError } = useKlaverjasTeamsQuery(scoreboardId);

    const [open, setOpen] = useState(false);

    const form = useForm<CreateRoundForm>({
        mode: "onChange",
        resolver: zodResolver(createRoundSchema),
        defaultValues: {
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
        },
    });

    const [isGoingTeam, isUsWet, isUsPit, isThemWet, isThemPit] = useWatch({
        control: form.control,
        name: ["isGoingTeam", "us.isWet", "us.isPit", "them.isWet", "them.isPit"],
    });

    function handleClose() {
        form.reset();
        setOpen(false);
    }

    async function submitRound(data: CreateRoundForm) {
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

        handleClose();
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
            <Button variant="default" onClick={() => setOpen(true)}>
                {t("newRound")}
            </Button>
            <Dialog
                open={open}
                onOpenChange={(isOpen) => {
                    if (isOpen) {
                        setOpen(true);
                    } else {
                        handleClose();
                    }
                }}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{t("title")}</DialogTitle>
                        <DialogDescription>{t("description")}</DialogDescription>
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
                        <Button onClick={form.handleSubmit(submitRound)}>
                            {t("confirmButton")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
