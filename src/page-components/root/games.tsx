"use client";

import useScoreboardsQuery from "@/queries/use-scoreboards-query";
import GameItem from "@/page-components/root/game-item";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import CreateGameDialog from "@/page-components/root/create-game-dialog";
import { useState } from "react";

export default function Games() {
    const { data, isPending, isError, isRefetching } = useScoreboardsQuery();
    const t = useTranslations("gamesTable");
    const [isCreateGameDialogOpen, setIsCreateGameDialogOpen] = useState(false);

    if (isPending || isError) {
        return null;
    }

    return (
        <>
            <div className="flex justify-center py-10">
                <div className="container flex flex-col overflow-hidden rounded-lg border border-gray-400 dark:border-gray-700">
                    <div className="flex flex-row items-center gap-4 border-b border-b-gray-400 bg-gray-300 px-4 py-2 dark:border-b-gray-700 dark:bg-gray-900">
                        <div className="flex flex-col">
                            <span className="text-lg font-medium">
                                {t("yourGames")}
                            </span>
                            <span className="text-xs">
                                {t("numberOfTotalGames", { count: data.length })}
                            </span>
                        </div>
                        {isRefetching ? (
                            <Loader2Icon className="animate-spin" />
                        ) : null}
                        <Button
                            className="ml-auto"
                            variant="default"
                            onClick={() => setIsCreateGameDialogOpen(true)}
                        >
                            <Plus />
                            {t("createGameButton")}
                        </Button>
                    </div>
                    {data?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-5 py-20">
                            <span className="flex flex-col items-center gap-1">
                                <span className="text-lg">{t("noGames")}</span>
                                <span className="text-sm text-gray-500">
                                    {t("createGame")}
                                </span>
                            </span>
                            <Button
                                variant="default"
                                onClick={() => setIsCreateGameDialogOpen(true)}
                            >
                                <Plus />
                                {t("createGameButton")}
                            </Button>
                        </div>
                    ) : null}
                    {data
                        ?.sort(
                            (scoreboardA, scoreboardB) =>
                                scoreboardB.createdAt.valueOf() -
                                scoreboardA.createdAt.valueOf(),
                        )
                        .map((scoreboard, index) => {
                            return (
                                <GameItem
                                    scoreboard={scoreboard}
                                    isLastItem={index === data?.length - 1}
                                    key={scoreboard.id}
                                />
                            );
                        })}
                </div>
            </div>
            <CreateGameDialog
                open={isCreateGameDialogOpen}
                onOpenChange={setIsCreateGameDialogOpen}
            />
        </>
    );
}
