"use client";

import useScoreboardsQuery from "@/queries/use-scoreboards-query";
import useScoreboardsStatsQuery from "@/queries/use-scoreboards-stats-query";
import GameItem from "@/page-components/root/game-item";
import { Button } from "@/components/ui/button";
import {
    Loader2Icon,
    Plus,
    Sparkles,
    BarChart3,
    TrendingUp,
    Target,
    Check,
    X,
    Minus,
} from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import CreateGameDialog from "@/page-components/root/create-game-dialog";
import { useMemo, useState } from "react";
import { CreateKlaverjasGameDialog } from "@/page-components/root/create-klaverjas-game-dialog";
import { UUID } from "crypto";
import { GAME_TYPE } from "@/constants/gameType";
import { useRouter } from "@/i18n/navigation";
import CreateBoerenbridgeScoreboardDialog from "@/page-components/root/create-boerenbridge-scoreboard-dialog";
import Paper from "@/components/paper";
import { CardVisual } from "@/page-components/how-to-play/shared/card-visual";
import { MahjongStoneVisual } from "@/page-components/how-to-play/shared/mahjong-stone-visual";
import { ButtonGroup } from "@/components/ui/button-group";
import { AppGameType } from "@/models/app/scoreboard/game-type";
import CreateMahjongScoreboardDialog from "@/page-components/root/create-mahjong-scoreboard-dialog";

export default function Games() {
    const { data, isPending, isError, isRefetching } = useScoreboardsQuery();
    const {
        data: statsData,
        isPending: isStatsPending,
        isError: isStatsError,
    } = useScoreboardsStatsQuery();
    const router = useRouter();
    const t = useTranslations("gamesTable");
    const format = useFormatter();

    const [selectedStatsType, setSelectedStatsType] = useState<AppGameType>(
        GAME_TYPE.BOERENBRIDGE,
    );
    const [isCreateGameDialogOpen, setIsCreateGameDialogOpen] = useState(false);
    const [createKlaverjasGameDialogState, setCreateKlaverjasGameDialogState] =
        useState<{ open: boolean; scoreboardId: UUID | null }>({
            open: false,
            scoreboardId: null,
        });
    const [
        createBoerenbridgeScoreboardDialogState,
        setCreateBoerenbridgeScoreboardDialogState,
    ] = useState<{ open: boolean; scoreboardName: string }>({
        open: false,
        scoreboardName: "",
    });
    const [
        createMahjongScoreboardDialogState,
        setCreateMahjongScoreboardDialogState,
    ] = useState<{ open: boolean; scoreboardName: string }>({
        open: false,
        scoreboardName: "",
    });

    const sortedScoreboards = useMemo(() => {
        const scoreboards = data ?? [];

        return [...scoreboards].sort(
            (scoreboardA, scoreboardB) =>
                scoreboardB.createdAt.valueOf() - scoreboardA.createdAt.valueOf(),
        );
    }, [data]);

    const scoreboardsByType = useMemo(
        () => ({
            [GAME_TYPE.BOERENBRIDGE]: sortedScoreboards.filter(
                (scoreboard) => scoreboard.gameType === GAME_TYPE.BOERENBRIDGE,
            ),
            [GAME_TYPE.KLAVERJAS]: sortedScoreboards.filter(
                (scoreboard) => scoreboard.gameType === GAME_TYPE.KLAVERJAS,
            ),
            [GAME_TYPE.MAHJONG]: sortedScoreboards.filter(
                (scoreboard) => scoreboard.gameType === GAME_TYPE.MAHJONG,
            ),
        }),
        [sortedScoreboards],
    );

    const activeStatsType = useMemo(() => {
        if (
            scoreboardsByType[selectedStatsType].length > 0 ||
            sortedScoreboards.length === 0
        ) {
            return selectedStatsType;
        }

        if (scoreboardsByType[GAME_TYPE.BOERENBRIDGE].length > 0) {
            return GAME_TYPE.BOERENBRIDGE;
        }

        if (scoreboardsByType[GAME_TYPE.KLAVERJAS].length > 0) {
            return GAME_TYPE.KLAVERJAS;
        }

        return GAME_TYPE.MAHJONG;
    }, [scoreboardsByType, selectedStatsType, sortedScoreboards.length]);

    const selectedScoreboards = scoreboardsByType[activeStatsType];
    const stats = statsData ?? null;
    const showStatsLoadingState =
        selectedScoreboards.length > 0 && isStatsPending && stats == null;
    const showStatsErrorState =
        selectedScoreboards.length > 0 && isStatsError && stats == null;

    if (isPending || isError || !data) {
        return null;
    }

    return (
        <>
            <div className="flex justify-center py-10">
                <div className="container flex flex-col gap-4">
                    <Paper className="relative overflow-hidden border-2 border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5 dark:border-emerald-500/30 dark:from-emerald-950/30 dark:via-slate-950 dark:to-sky-950/20">
                        <div className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/20" />
                        <div className="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/20" />

                        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-muted-foreground mb-1 flex items-center gap-1 text-xs font-semibold tracking-[0.2em] uppercase">
                                    <Sparkles size={12} />
                                    {t("overview.badge")}
                                </p>
                                <h2 className="text-2xl font-semibold">
                                    {t("overview.title")}
                                </h2>
                                <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                                    {t("overview.description")}
                                </p>
                            </div>

                            <div className="flex items-end gap-2">
                                <div className="hidden items-end gap-1 sm:flex">
                                    <div className="origin-bottom -rotate-10">
                                        <CardVisual
                                            suit="club"
                                            value="J"
                                            small
                                            isTrump
                                        />
                                    </div>
                                    <div className="origin-bottom -rotate-2">
                                        <CardVisual suit="diamond" value="A" small />
                                    </div>
                                    <div className="origin-bottom rotate-8">
                                        <CardVisual suit="heart" value="10" small />
                                    </div>
                                    <div className="origin-bottom translate-y-0.5 rotate-10">
                                        <MahjongStoneVisual
                                            kind="wind"
                                            value="E"
                                            tone="amber"
                                            small
                                        />
                                    </div>
                                </div>
                                <Button
                                    variant="default"
                                    onClick={() => setIsCreateGameDialogOpen(true)}
                                >
                                    <Plus />
                                    {t("createGameButton")}
                                </Button>
                            </div>
                        </div>
                    </Paper>

                    <Paper className="relative overflow-hidden border-2 border-sky-200/70 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-5 dark:border-sky-500/30 dark:from-sky-950/30 dark:via-slate-950 dark:to-indigo-950/20">
                        <div className="pointer-events-none absolute -top-14 -right-10 h-32 w-32 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/20" />

                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
                                    {t("stats.subtitle")}
                                </p>
                                <h3 className="text-lg font-semibold">
                                    {t("stats.title")}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    {t("stats.description", {
                                        gameType: t(activeStatsType),
                                    })}
                                </p>
                            </div>

                            <ButtonGroup className="self-start">
                                <Button
                                    size="sm"
                                    variant={
                                        activeStatsType === GAME_TYPE.BOERENBRIDGE
                                            ? "default"
                                            : "outline"
                                    }
                                    onClick={() =>
                                        setSelectedStatsType(GAME_TYPE.BOERENBRIDGE)
                                    }
                                >
                                    {t("boerenbridge")}
                                </Button>
                                <Button
                                    size="sm"
                                    variant={
                                        activeStatsType === GAME_TYPE.KLAVERJAS
                                            ? "default"
                                            : "outline"
                                    }
                                    onClick={() =>
                                        setSelectedStatsType(GAME_TYPE.KLAVERJAS)
                                    }
                                >
                                    {t("klaverjas")}
                                </Button>
                                <Button
                                    size="sm"
                                    variant={
                                        activeStatsType === GAME_TYPE.MAHJONG
                                            ? "default"
                                            : "outline"
                                    }
                                    onClick={() =>
                                        setSelectedStatsType(GAME_TYPE.MAHJONG)
                                    }
                                >
                                    {t("mahjong")}
                                </Button>
                            </ButtonGroup>
                        </div>

                        {selectedScoreboards.length === 0 ? (
                            <div className="text-muted-foreground rounded-lg border border-dashed p-4 text-sm">
                                {t("stats.empty", {
                                    gameType: t(activeStatsType),
                                })}
                            </div>
                        ) : showStatsLoadingState ? (
                            <div className="text-muted-foreground rounded-lg border border-dashed p-4 text-sm">
                                {t("stats.loading")}
                            </div>
                        ) : showStatsErrorState ? (
                            <div className="text-muted-foreground rounded-lg border border-dashed p-4 text-sm">
                                {t("stats.error")}
                            </div>
                        ) : stats == null ? (
                            <div className="text-muted-foreground rounded-lg border border-dashed p-4 text-sm">
                                {t("stats.error")}
                            </div>
                        ) : (
                            <>
                                {activeStatsType === GAME_TYPE.KLAVERJAS ? (
                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        <div className="rounded-lg border border-emerald-300/70 bg-emerald-100/60 p-3 dark:border-emerald-500/40 dark:bg-emerald-900/25">
                                            <div className="mb-1 flex items-center gap-1 text-xs">
                                                <BarChart3 size={12} />
                                                {t("stats.klaverjasPitCount")}
                                            </div>
                                            <p className="text-2xl font-semibold">
                                                {format.number(
                                                    stats.klaverjas.pitCount,
                                                )}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {t("stats.fromGames", {
                                                    count: stats.klaverjas.gameCount,
                                                })}
                                            </p>
                                        </div>

                                        <div className="rounded-lg border border-sky-300/70 bg-sky-100/60 p-3 dark:border-sky-500/40 dark:bg-sky-900/25">
                                            <div className="mb-1 flex items-center gap-1 text-xs">
                                                <TrendingUp size={12} />
                                                {t(
                                                    "stats.klaverjasAveragePointsPerTeam",
                                                )}
                                            </div>
                                            <p className="text-2xl font-semibold">
                                                {format.number(
                                                    stats.klaverjas
                                                        .averagePointsPerTeam,
                                                    {
                                                        maximumFractionDigits: 2,
                                                    },
                                                )}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {t("stats.fromGames", {
                                                    count: stats.klaverjas.gameCount,
                                                })}
                                            </p>
                                        </div>

                                        <div className="rounded-lg border border-indigo-300/70 bg-indigo-100/60 p-3 dark:border-indigo-500/40 dark:bg-indigo-900/25">
                                            <div className="mb-1 flex items-center gap-1 text-xs">
                                                <Target size={12} />
                                                {t(
                                                    "stats.klaverjasAverageNatPerGame",
                                                )}
                                            </div>
                                            <p className="text-2xl font-semibold">
                                                {format.number(
                                                    stats.klaverjas
                                                        .averageNatTimesPerGame,
                                                    {
                                                        maximumFractionDigits: 2,
                                                    },
                                                )}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {t("stats.fromGames", {
                                                    count: stats.klaverjas.gameCount,
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                ) : activeStatsType === GAME_TYPE.BOERENBRIDGE ? (
                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        <div className="rounded-lg border border-emerald-300/70 bg-emerald-100/60 p-3 dark:border-emerald-500/40 dark:bg-emerald-900/25">
                                            <div className="mb-1 flex items-center gap-1 text-xs">
                                                <Check size={12} />
                                                {t(
                                                    "stats.boerenbridgeCorrectGuesses",
                                                )}
                                            </div>
                                            <p className="text-2xl font-semibold">
                                                {format.number(
                                                    stats.boerenbridge
                                                        .correctGuessCount,
                                                )}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {t("stats.fromGames", {
                                                    count: stats.boerenbridge
                                                        .gameCount,
                                                })}
                                            </p>
                                        </div>

                                        <div className="rounded-lg border border-rose-300/70 bg-rose-100/60 p-3 dark:border-rose-500/40 dark:bg-rose-900/25">
                                            <div className="mb-1 flex items-center gap-1 text-xs">
                                                <X size={12} />
                                                {t("stats.boerenbridgeWrongGuesses")}
                                            </div>
                                            <p className="text-2xl font-semibold">
                                                {format.number(
                                                    stats.boerenbridge
                                                        .wrongGuessCount,
                                                )}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {t("stats.fromGames", {
                                                    count: stats.boerenbridge
                                                        .gameCount,
                                                })}
                                            </p>
                                        </div>

                                        <div className="rounded-lg border border-sky-300/70 bg-sky-100/60 p-3 dark:border-sky-500/40 dark:bg-sky-900/25">
                                            <div className="mb-1 flex items-center gap-1 text-xs">
                                                <TrendingUp size={12} />
                                                {t(
                                                    "stats.boerenbridgeAveragePointsPerPlayerPerGame",
                                                )}
                                            </div>
                                            <p className="text-2xl font-semibold">
                                                {format.number(
                                                    stats.boerenbridge
                                                        .averagePointsPerPlayerPerGame,
                                                    {
                                                        maximumFractionDigits: 2,
                                                    },
                                                )}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {t("stats.fromGames", {
                                                    count: stats.boerenbridge
                                                        .gameCount,
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        <div className="rounded-lg border border-emerald-300/70 bg-emerald-100/60 p-3 dark:border-emerald-500/40 dark:bg-emerald-900/25">
                                            <div className="mb-1 flex items-center gap-1 text-xs">
                                                <BarChart3 size={12} />
                                                {t("stats.mahjongWinningHands")}
                                            </div>
                                            <p className="text-2xl font-semibold">
                                                {format.number(
                                                    stats.mahjong.winningHandCount,
                                                )}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {t("stats.fromGames", {
                                                    count: stats.mahjong.gameCount,
                                                })}
                                            </p>
                                        </div>

                                        <div className="rounded-lg border border-sky-300/70 bg-sky-100/60 p-3 dark:border-sky-500/40 dark:bg-sky-900/25">
                                            <div className="mb-1 flex items-center gap-1 text-xs">
                                                <Minus size={12} />
                                                {t("stats.mahjongRemises")}
                                            </div>
                                            <p className="text-2xl font-semibold">
                                                {format.number(
                                                    stats.mahjong.remiseCount,
                                                )}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {t("stats.fromGames", {
                                                    count: stats.mahjong.gameCount,
                                                })}
                                            </p>
                                        </div>

                                        <div className="rounded-lg border border-indigo-300/70 bg-indigo-100/60 p-3 dark:border-indigo-500/40 dark:bg-indigo-900/25">
                                            <div className="mb-1 flex items-center gap-1 text-xs">
                                                <TrendingUp size={12} />
                                                {t(
                                                    "stats.mahjongAverageWinningPoints",
                                                )}
                                            </div>
                                            <p className="text-2xl font-semibold">
                                                {format.number(
                                                    stats.mahjong
                                                        .averageWinningPoints,
                                                    {
                                                        maximumFractionDigits: 2,
                                                    },
                                                )}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {t("stats.fromGames", {
                                                    count: stats.mahjong.gameCount,
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </Paper>

                    <Paper className="relative overflow-hidden border-2 border-emerald-200/70 bg-gradient-to-br from-emerald-50/80 via-white to-sky-50/70 p-0 dark:border-emerald-500/30 dark:from-emerald-950/20 dark:via-slate-950 dark:to-sky-950/10">
                        <div className="pointer-events-none absolute -top-10 -right-8 h-28 w-28 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/20" />
                        <div className="pointer-events-none absolute -bottom-10 -left-8 h-24 w-24 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/20" />
                        <div className="relative flex flex-row items-center gap-4 border-b border-b-emerald-200/70 bg-white/70 px-4 py-2 dark:border-b-emerald-500/30 dark:bg-slate-950/60">
                            <div className="flex flex-col">
                                <span className="text-lg font-medium">
                                    {t("yourGames")}
                                </span>
                                <span className="text-xs">
                                    {t("numberOfTotalGames", {
                                        count: sortedScoreboards.length,
                                    })}
                                </span>
                            </div>
                            {isRefetching ? (
                                <Loader2Icon className="animate-spin" />
                            ) : null}
                        </div>
                        {sortedScoreboards.length === 0 ? (
                            <div className="flex flex-col items-center justify-center gap-5 py-20">
                                <span className="flex flex-col items-center gap-1">
                                    <span className="text-lg">{t("noGames")}</span>
                                    <span className="text-sm text-gray-500">
                                        {t("createGame")}
                                    </span>
                                </span>
                            </div>
                        ) : null}
                        {sortedScoreboards.map((scoreboard, index) => {
                            return (
                                <GameItem
                                    scoreboard={scoreboard}
                                    isLastItem={
                                        index === sortedScoreboards.length - 1
                                    }
                                    key={scoreboard.id}
                                />
                            );
                        })}
                    </Paper>
                </div>
            </div>
            <CreateGameDialog
                open={isCreateGameDialogOpen}
                onClose={() => setIsCreateGameDialogOpen(false)}
                onGameCreated={(scoreboardId, gameType) => {
                    if (gameType === GAME_TYPE.KLAVERJAS) {
                        setCreateKlaverjasGameDialogState({
                            open: true,
                            scoreboardId,
                        });
                        return;
                    }
                    if (gameType === GAME_TYPE.BOERENBRIDGE) {
                        router.push(`/scoreboard/${scoreboardId}`);
                        return;
                    }
                    router.push(`/scoreboard/${scoreboardId}`);
                }}
                onBoerenbridgeCreationRequested={(scoreboardName) => {
                    setCreateBoerenbridgeScoreboardDialogState({
                        open: true,
                        scoreboardName,
                    });
                }}
                onMahjongCreationRequested={(scoreboardName) => {
                    setCreateMahjongScoreboardDialogState({
                        open: true,
                        scoreboardName,
                    });
                }}
            />
            <CreateKlaverjasGameDialog
                scoreboardId={createKlaverjasGameDialogState.scoreboardId}
                open={createKlaverjasGameDialogState.open}
                onClose={(created) => {
                    setCreateKlaverjasGameDialogState({
                        open: false,
                        scoreboardId: null,
                    });
                    if (
                        created &&
                        createKlaverjasGameDialogState.scoreboardId != null
                    ) {
                        router.push(
                            `/scoreboard/${createKlaverjasGameDialogState.scoreboardId}`,
                        );
                    }
                }}
            />
            <CreateBoerenbridgeScoreboardDialog
                open={createBoerenbridgeScoreboardDialogState.open}
                scoreboardName={
                    createBoerenbridgeScoreboardDialogState.scoreboardName
                }
                onClose={(createdScoreboardId) => {
                    setCreateBoerenbridgeScoreboardDialogState({
                        open: false,
                        scoreboardName: "",
                    });

                    if (createdScoreboardId != null) {
                        router.push(`/scoreboard/${createdScoreboardId}`);
                    }
                }}
            />
            <CreateMahjongScoreboardDialog
                open={createMahjongScoreboardDialogState.open}
                scoreboardName={createMahjongScoreboardDialogState.scoreboardName}
                onClose={(createdScoreboardId) => {
                    setCreateMahjongScoreboardDialogState({
                        open: false,
                        scoreboardName: "",
                    });

                    if (createdScoreboardId != null) {
                        router.push(`/scoreboard/${createdScoreboardId}`);
                    }
                }}
            />
        </>
    );
}
