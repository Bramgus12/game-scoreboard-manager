"use client";

import { UUID } from "crypto";
import useScoreboardByIdQuery from "@/queries/use-scoreboard-by-id-query";
import useMahjongGameQuery from "@/queries/use-mahjong-game-query";
import useMahjongPlayersQuery from "@/queries/use-mahjong-players-query";
import useMahjongHandsQuery from "@/queries/use-mahjong-hands-query";
import useMahjongTotalsQuery from "@/queries/use-mahjong-totals-query";
import useMahjongHandStateQuery from "@/queries/use-mahjong-hand-state-query";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, BookOpen, Loader2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import Paper from "@/components/paper";
import CreateMahjongHandButton from "@/page-components/scoreboard/mahjong/create-hand-button";
import { useMemo } from "react";
import { calculateMahjongHandDeltas } from "@/lib/mahjong-settlement";
import { MAHJONG_WIN_TYPE } from "@/constants/mahjong";

type Props = {
    scoreboardId: UUID;
};

export default function MahjongTable(props: Props) {
    const { scoreboardId } = props;
    const router = useRouter();
    const t = useTranslations();

    const {
        data: scoreboard,
        isPending: isScoreboardPending,
        isError: isScoreboardError,
    } = useScoreboardByIdQuery(scoreboardId);
    const {
        data: game,
        isPending: isGamePending,
        isError: isGameError,
    } = useMahjongGameQuery(scoreboardId);
    const {
        data: players,
        isPending: isPlayersPending,
        isError: isPlayersError,
    } = useMahjongPlayersQuery(scoreboardId);
    const {
        data: hands,
        isPending: isHandsPending,
        isError: isHandsError,
        isRefetching: isHandsRefetching,
    } = useMahjongHandsQuery(scoreboardId);
    const {
        data: totals,
        isPending: isTotalsPending,
        isError: isTotalsError,
    } = useMahjongTotalsQuery(scoreboardId);
    const {
        data: handState,
        isPending: isHandStatePending,
        isError: isHandStateError,
    } = useMahjongHandStateQuery(scoreboardId);

    const runningTotalsByHandAndPlayer = useMemo(() => {
        const map = new Map<string, number>();

        if (!players || !hands) {
            return map;
        }

        const running = new Map<UUID, number>();
        players.forEach((player) => {
            running.set(player.id, 0);
        });

        hands.forEach((hand) => {
            const deltas = calculateMahjongHandDeltas(hand, players);

            players.forEach((player) => {
                const nextTotal =
                    (running.get(player.id) ?? 0) + (deltas[player.id] ?? 0);
                running.set(player.id, nextTotal);
                map.set(`${hand.handNumber}-${player.id}`, nextTotal);
            });
        });

        return map;
    }, [hands, players]);

    if (
        isScoreboardPending ||
        isScoreboardError ||
        isGamePending ||
        isGameError ||
        isPlayersPending ||
        isPlayersError ||
        isHandsPending ||
        isHandsError ||
        isTotalsPending ||
        isTotalsError ||
        isHandStatePending ||
        isHandStateError
    ) {
        return null;
    }

    if (!game || !players || !hands || !totals || !handState) {
        return null;
    }

    return (
        <div className="flex justify-center pb-10">
            <div className="container m-4 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/scoreboards")}
                    >
                        <ArrowLeftIcon />
                        {t("scoreboard.backToGames")}
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/how-to-play/mahjong">
                            <BookOpen size={16} />
                            {t("mahjong.howToPlay")}
                        </Link>
                    </Button>
                </div>

                <Paper className="relative flex items-center justify-between gap-4 overflow-hidden border-2 border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-4 text-2xl dark:border-emerald-500/30 dark:from-emerald-950/30 dark:via-slate-950 dark:to-sky-950/20">
                    <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/20" />
                    <div className="relative flex items-center gap-4">
                        <div className="flex flex-col gap-1">
                            <span>{scoreboard?.scoreboardName}</span>
                            <span className="text-muted-foreground text-sm font-normal">
                                {handState.isFinished
                                    ? t("mahjong.progress.finished")
                                    : t("mahjong.progress.current", {
                                          hand: handState.nextHandNumber,
                                          handLimit: game.handLimit,
                                          prevailingWind: t(
                                              `mahjong.wind.${handState.prevailingWind}`,
                                          ),
                                      })}
                            </span>
                        </div>
                        {isHandsRefetching ? (
                            <Loader2Icon className="animate-spin" />
                        ) : null}
                    </div>
                    <div className="relative">
                        <CreateMahjongHandButton
                            scoreboardId={scoreboardId}
                            disabled={handState.isFinished}
                        />
                    </div>
                </Paper>

                <Paper className="relative overflow-hidden border-2 border-indigo-200/70 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-4 dark:border-indigo-500/30 dark:from-indigo-950/30 dark:via-slate-950 dark:to-sky-950/20">
                    <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-indigo-300/15 blur-3xl dark:bg-indigo-500/15" />
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-white/70 dark:bg-slate-950/40">
                                <TableHead className="w-[80px] font-bold">
                                    #
                                </TableHead>
                                <TableHead className="font-bold">
                                    {t("mahjong.table.prevailingWind")}
                                </TableHead>
                                <TableHead className="font-bold">
                                    {t("mahjong.table.result")}
                                </TableHead>
                                <TableHead className="font-bold">
                                    {t("mahjong.table.winnerPoints")}
                                </TableHead>
                                {players.map((player) => (
                                    <TableHead key={player.id} className="font-bold">
                                        <div className="flex flex-col">
                                            <span>{player.name}</span>
                                            <span className="text-muted-foreground text-xs font-normal">
                                                {t("mahjong.table.nextWind", {
                                                    wind: t(
                                                        `mahjong.wind.${handState.currentWindsByPlayerId[player.id]}`,
                                                    ),
                                                })}
                                            </span>
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {hands.map((hand) => {
                                const deltas = calculateMahjongHandDeltas(
                                    hand,
                                    players,
                                );

                                return (
                                    <TableRow key={hand.id}>
                                        <TableCell className="font-medium">
                                            {hand.handNumber}
                                        </TableCell>
                                        <TableCell>
                                            {t(
                                                `mahjong.wind.${hand.prevailingWind}`,
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {hand.winType === MAHJONG_WIN_TYPE.REMISE
                                                ? t("mahjong.table.remise")
                                                : t("mahjong.table.wonBy", {
                                                      winner:
                                                          players.find(
                                                              (player) =>
                                                                  player.id ===
                                                                  hand.winnerPlayerId,
                                                          )?.name ?? "-",
                                                      winType:
                                                          hand.winType ===
                                                          MAHJONG_WIN_TYPE.SELF_DRAW
                                                              ? t(
                                                                    "mahjong.handDialog.winTypeSelfDraw",
                                                                )
                                                              : t(
                                                                    "mahjong.handDialog.winTypeDiscard",
                                                                ),
                                                  })}
                                        </TableCell>
                                        <TableCell>{hand.winnerPoints}</TableCell>
                                        {players.map((player) => {
                                            const delta = deltas[player.id] ?? 0;
                                            const runningTotal =
                                                runningTotalsByHandAndPlayer.get(
                                                    `${hand.handNumber}-${player.id}`,
                                                ) ?? 0;

                                            return (
                                                <TableCell
                                                    key={`${hand.id}-${player.id}`}
                                                >
                                                    <span
                                                        className={
                                                            delta > 0
                                                                ? "text-emerald-600"
                                                                : delta < 0
                                                                  ? "text-rose-600"
                                                                  : "text-muted-foreground"
                                                        }
                                                    >
                                                        {delta > 0
                                                            ? `+${delta}`
                                                            : delta}
                                                    </span>
                                                    <span className="text-muted-foreground ml-2 text-xs">
                                                        {runningTotal}
                                                    </span>
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                            <TableRow className="bg-white/70 dark:bg-slate-950/40">
                                <TableCell className="font-bold" colSpan={4}>
                                    {t("mahjong.table.total")}
                                </TableCell>
                                {players.map((player) => (
                                    <TableCell
                                        key={`total-${player.id}`}
                                        className="font-bold"
                                    >
                                        {totals.find(
                                            (entry) => entry.playerId === player.id,
                                        )?.total ?? 0}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </div>
    );
}
