"use client";

import * as React from "react";
import { ReactNode, useState } from "react";
import { Link } from "@/i18n/navigation";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Trash } from "lucide-react";
import { AppScoreboard } from "@/models/app/scoreboard/scoreboard";
import { useFormatter, useNow, useTranslations } from "next-intl";
import { UUID } from "crypto";
import { deleteScoreboardById } from "@/actions/scoreboard-actions";
import QUERY_KEY from "@/constants/query-key";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
    scoreboard: AppScoreboard;
    isLastItem: boolean;
};

export default function GameItem(props: Props) {
    const { scoreboard, isLastItem } = props;
    const queryClient = useQueryClient();
    const format = useFormatter();
    const now = useNow({ updateInterval: 60000 });
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const t = useTranslations("gamesTable");

    async function deleteScoreboard(id: UUID) {
        setIsDeleting(true);
        await deleteScoreboardById(id);

        setIsDeleting(false);
        setIsDeleteDialogOpen(false);

        void queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.SCOREBOARDS_FOR_USER],
        });
    }

    const subText = [
        <span
            key="created"
            title={format.dateTime(scoreboard.createdAt, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
            })}
        >
            {t("created", { value: format.relativeTime(scoreboard.createdAt, now) })}
        </span>,
        <span
            key="updated"
            title={format.dateTime(scoreboard.createdAt, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
            })}
        >
            {t("updated", { value: format.relativeTime(scoreboard.updatedAt, now) })}
        </span>,
        <span key="type">{t(scoreboard.gameType)}</span>,
    ];

    const subTextWithDivider = subText.reduce<Array<ReactNode>>(
        (prev, curr) => (prev.length === 0 ? [curr] : [...prev, " • ", curr]),
        [],
    );

    return (
        <div
            key={scoreboard.id}
            className={`flex flex-row p-4 ${!isLastItem ? "border-b border-b-gray-700" : ""}`}
        >
            <div className="flex flex-1 flex-col">
                <Link
                    className="text-md font-medium hover:text-gray-400 active:text-gray-200 hover:dark:text-gray-400 active:dark:text-gray-600"
                    href={`/scoreboard/${scoreboard.id}`}
                >
                    {scoreboard.scoreboardName}
                </Link>
                <span className="text-xs">{subTextWithDivider}</span>
            </div>
            <div>
                <AlertDialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                >
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Trash className="h-[1.2rem] w-[1.2rem]" />
                            <span className="sr-only">
                                {t("deleteButton", {
                                    value: scoreboard.scoreboardName,
                                })}
                            </span>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {t("deleteDialog.title")}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {t("deleteDialog.description")}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <Button
                                onClick={() => setIsDeleteDialogOpen(false)}
                                variant="outline"
                                disabled={isDeleting}
                            >
                                {t("deleteDialog.cancelButton")}
                            </Button>
                            <Button
                                variant="default"
                                disabled={isDeleting}
                                onClick={() => void deleteScoreboard(scoreboard.id)}
                            >
                                {isDeleting ? (
                                    <Loader2Icon className="animate-spin" />
                                ) : null}
                                {t("deleteDialog.confirmButton")}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
