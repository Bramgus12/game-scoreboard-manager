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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    CreateKlaverjasGameForm,
    createKlaverjasGameSchema,
} from "@/validation/create-klaverjas-game-schema";
import { useTranslations } from "next-intl";
import { UUID } from "crypto";
import { createKlaverjasGame } from "@/actions/klaverjas-actions";
import { useQueryClient } from "@tanstack/react-query";
import QUERY_KEY from "@/constants/query-key";
import { useEffect, useState } from "react";
import useKlaverjasTeamsQuery from "@/queries/use-klaverjas-teams-query";

type Props = {
    scoreboardId: UUID;
};

export function CreateKlaverjasGameDialog(props: Props) {
    const { scoreboardId } = props;
    const [open, setOpen] = useState(false);
    const t = useTranslations("klaverjas.createGameDialog");
    const queryClient = useQueryClient();

    const form = useForm<CreateKlaverjasGameForm>({
        mode: "onBlur",
        resolver: zodResolver(createKlaverjasGameSchema),
        defaultValues: {
            ourTeamName: "",
            theirTeamName: "",
        },
    });

    function handleOpenChange(open: boolean) {
        form.reset();
        setOpen(open);
    }

    async function handleSubmitKlaverjasGame(data: CreateKlaverjasGameForm) {
        const teams = await createKlaverjasGame(data, scoreboardId);
        queryClient.setQueryData(
            [QUERY_KEY.KLAVERJAS_TEAMS_FOR_SCOREBOARD, { scoreboardId }],
            teams,
        );

        handleOpenChange(false);
    }

    const {
        data: teams,
        isPending: isTeamsPending,
        isError: isTeamsError,
    } = useKlaverjasTeamsQuery(scoreboardId);

    useEffect(() => {
        if (!isTeamsPending && !isTeamsError && teams === null && !open) {
            setOpen(true);
        }
    }, [teams, open, isTeamsError, isTeamsPending]);

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmitKlaverjasGame)}
                        className="flex flex-col gap-4"
                    >
                        <DialogHeader>
                            <DialogTitle>{t("title")}</DialogTitle>
                            <DialogDescription>{t("description")}</DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>{t("teamUsLabel")}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={t(
                                                        "teamUsPlaceholder",
                                                    )}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                                name="ourTeamName"
                            />
                            <FormField
                                control={form.control}
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>
                                                {t("teamThemLabel")}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={t(
                                                        "teamThemPlaceholder",
                                                    )}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                                name="theirTeamName"
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit">{t("confirmButton")}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
