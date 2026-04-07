"use client";

import { UUID } from "crypto";
import useScoreboardByIdQuery from "@/queries/use-scoreboard-by-id-query";
import useBoerenbridgePlayersQuery from "@/queries/use-boerenbridge-players-query";
import useBoerenbridgeRoundsQuery from "@/queries/use-boerenbridge-rounds-query";
import useBoerenbridgeRoundNumberQuery from "@/queries/use-boerenbridge-round-number-query";
import useBoerenbridgeGameQuery from "@/queries/use-boerenbridge-game-query";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    ArrowLeftIcon,
    BookOpen,
    Edit,
    Loader2Icon,
    ClipboardList,
    TrendingUp,
    TrendingDown,
    Minus,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import Paper from "@/components/paper";
import CreateBoerenbridgeRoundButton from "@/page-components/scoreboard/boerenbridge/create-round-button";
import { Fragment, useMemo, useState } from "react";
import { AppBoerenbridgeRoundRow } from "@/models/app/boerenbridge-round/boerenbridge-round-row";
import BoerenbridgeRoundDialog from "@/page-components/scoreboard/boerenbridge/round-dialog";
import InitializeBoerenbridgeGameDialog from "@/page-components/scoreboard/boerenbridge/initialize-game-dialog";
import StandingsPodium from "@/page-components/scoreboard/boerenbridge/standings-podium";

type Props = {
    scoreboardId: UUID;
};

export default function BoerenbridgeTable(props: Props) {
    const { scoreboardId } = props;

    const router = useRouter();
    const t = useTranslations();

    const [editRound, setEditRound] = useState<AppBoerenbridgeRoundRow | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const {
        data: scoreboard,
        isPending: isScoreboardPending,
        isError: isScoreboardError,
    } = useScoreboardByIdQuery(scoreboardId);
    const {
        data: players,
        isPending: isPlayersPending,
        isError: isPlayersError,
    } = useBoerenbridgePlayersQuery(scoreboardId);
    const {
        data: rounds,
        isPending: isRoundsPending,
        isError: isRoundsError,
        isRefetching: isRoundsRefetching,
    } = useBoerenbridgeRoundsQuery(scoreboardId);
    const {
        data: roundState,
        isPending: isRoundStatePending,
        isError: isRoundStateError,
    } = useBoerenbridgeRoundNumberQuery(scoreboardId);
    const {
        data: game,
        isPending: isGamePending,
        isError: isGameError,
    } = useBoerenbridgeGameQuery(scoreboardId);

    const { cumulativeScoresByRoundAndPlayer, scoreChangeByRoundAndPlayer } =
        useMemo(() => {
            const cumulativeMap = new Map<string, number>();
            const deltaMap = new Map<string, number>();

            if (!players || !rounds || !game) {
                return {
                    cumulativeScoresByRoundAndPlayer: cumulativeMap,
                    scoreChangeByRoundAndPlayer: deltaMap,
                };
            }

            const runningTotals = new Map<UUID, number>();

            players.forEach((player) => {
                runningTotals.set(player.id, 0);
            });

            rounds.forEach((round) => {
                players.forEach((player) => {
                    const entry = round.entries.find(
                        (roundEntry) => roundEntry.playerId === player.id,
                    );

                    const previousTotal = runningTotals.get(player.id) ?? 0;

                    if (!entry) {
                        cumulativeMap.set(
                            `${round.roundNumber}-${player.id}`,
                            previousTotal,
                        );
                        deltaMap.set(`${round.roundNumber}-${player.id}`, 0);

                        return;
                    }

                    const roundScore =
                        entry.expectedWins === entry.actualWins
                            ? 10 + entry.actualWins * game.pointsPerCorrectGuess
                            : -Math.abs(entry.expectedWins - entry.actualWins) *
                              game.pointsPerCorrectGuess;

                    const nextTotal = previousTotal + roundScore;

                    runningTotals.set(player.id, nextTotal);
                    cumulativeMap.set(
                        `${round.roundNumber}-${player.id}`,
                        nextTotal,
                    );
                    deltaMap.set(`${round.roundNumber}-${player.id}`, roundScore);
                });
            });

            return {
                cumulativeScoresByRoundAndPlayer: cumulativeMap,
                scoreChangeByRoundAndPlayer: deltaMap,
            };
        }, [game, players, rounds]);

    if (
        isScoreboardPending ||
        isScoreboardError ||
        isPlayersPending ||
        isPlayersError ||
        isRoundsPending ||
        isRoundsError ||
        isRoundStatePending ||
        isRoundStateError ||
        isGamePending ||
        isGameError
    ) {
        return null;
    }

    if (!players || !rounds || !roundState || !game) {
        return null;
    }

    if (players.length === 0) {
        return <InitializeBoerenbridgeGameDialog scoreboardId={scoreboardId} open />;
    }

    const maxRound =
        typeof roundState.maxRound === "number" &&
        Number.isFinite(roundState.maxRound) &&
        roundState.maxRound > 0
            ? roundState.maxRound
            : Math.max(1, Math.floor(52 / players.length));
    const currentRound =
        typeof roundState.roundNumber === "number" &&
        Number.isFinite(roundState.roundNumber) &&
        roundState.roundNumber > 0
            ? roundState.roundNumber
            : 1;
    const isFinished = roundState.isFinished === true;
    const totalTurns = maxRound * 2;
    const completedTurns = rounds.length;

    return (
        <>
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
                            <Link href="/how-to-play/boerenbridge">
                                <BookOpen size={16} />
                                {t("boerenbridge.howToPlay")}
                            </Link>
                        </Button>
                    </div>
                    <Paper className="relative flex items-center justify-between gap-4 overflow-hidden border-2 border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-4 text-2xl dark:border-emerald-500/30 dark:from-emerald-950/30 dark:via-slate-950 dark:to-sky-950/20">
                        <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/20" />
                        <div className="relative flex items-center gap-4">
                            <div className="flex flex-col gap-1">
                                <span>{scoreboard?.scoreboardName}</span>
                                <span className="text-muted-foreground text-sm font-normal">
                                    {isFinished
                                        ? t("boerenbridge.roundProgress.finished")
                                        : t("boerenbridge.roundProgress.current", {
                                              currentRound,
                                              maxRound,
                                              completedTurns,
                                              totalTurns,
                                          })}
                                </span>
                            </div>
                            {isRoundsRefetching ? (
                                <Loader2Icon className="animate-spin" />
                            ) : null}
                        </div>
                        <div className="relative">
                            <CreateBoerenbridgeRoundButton scoreboardId={scoreboardId} />
                        </div>
                    </Paper>
                    {rounds.length === 0 ? (
                        <Paper className="relative overflow-hidden border-2 border-sky-200/70 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-12 text-center dark:border-sky-500/30 dark:from-sky-950/30 dark:via-slate-950 dark:to-indigo-950/20">
                            <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/20" />
                            <ClipboardList className="text-muted-foreground h-12 w-12" />
                            <h3 className="text-lg font-semibold">
                                {t("boerenbridge.emptyState.title")}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                {t("boerenbridge.emptyState.description")}
                            </p>
                        </Paper>
                    ) : (
                        <>
                            <StandingsPodium scoreboardId={scoreboardId} />
                            <Paper className="relative overflow-hidden border-2 border-indigo-200/70 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-4 dark:border-indigo-500/30 dark:from-indigo-950/30 dark:via-slate-950 dark:to-sky-950/20">
                                <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-indigo-300/15 blur-3xl dark:bg-indigo-500/15" />
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-white/70 dark:bg-slate-950/40">
                                            <TableHead className="w-[100px] font-bold">
                                                #
                                            </TableHead>
                                            {players.map((player) => (
                                                <TableHead
                                                    className="border-l text-center font-bold"
                                                    colSpan={2}
                                                    key={`header-${player.id}`}
                                                >
                                                    {player.name}
                                                </TableHead>
                                            ))}
                                            <TableHead className="w-[100px] font-bold">
                                                {t("boerenbridge.table.actions")}
                                            </TableHead>
                                        </TableRow>
                                        <TableRow className="bg-white/60 dark:bg-slate-950/30">
                                            <TableHead className="font-medium">
                                                {t("boerenbridge.table.cards")}
                                            </TableHead>
                                            {players.map((player) => (
                                                <Fragment
                                                    key={`subheaders-${player.id}`}
                                                >
                                                    <TableHead className="border-l font-medium">
                                                        {t(
                                                            "boerenbridge.table.expectedWins",
                                                        )}
                                                    </TableHead>
                                                    <TableHead className="font-medium">
                                                        {t(
                                                            "boerenbridge.table.runningTotal",
                                                        )}
                                                    </TableHead>
                                                </Fragment>
                                            ))}
                                            <TableHead>{/* actions */}</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {rounds.map((round) => (
                                            <TableRow
                                                key={`round-${round.roundNumber}`}
                                            >
                                                <TableCell className="font-medium">
                                                    {round.roundNumber}
                                                </TableCell>
                                                {players.map((player) => {
                                                    const entry = round.entries.find(
                                                        (roundEntry) =>
                                                            roundEntry.playerId ===
                                                            player.id,
                                                    );

                                                    if (!entry) {
                                                        return (
                                                            <Fragment
                                                                key={`empty-${player.id}`}
                                                            >
                                                                <TableCell className="border-l">
                                                                    -
                                                                </TableCell>
                                                                <TableCell>
                                                                    <span className="flex items-center gap-1">
                                                                        {cumulativeScoresByRoundAndPlayer.get(
                                                                            `${round.roundNumber}-${player.id}`,
                                                                        ) ?? 0}
                                                                    </span>
                                                                </TableCell>
                                                            </Fragment>
                                                        );
                                                    }

                                                    return (
                                                        <Fragment
                                                            key={`entry-${player.id}`}
                                                        >
                                                            <TableCell className="border-l">
                                                                {entry.expectedWins}
                                                            </TableCell>
                                                            <TableCell>
                                                                {(() => {
                                                                    const total =
                                                                        cumulativeScoresByRoundAndPlayer.get(
                                                                            `${round.roundNumber}-${player.id}`,
                                                                        ) ?? 0;
                                                                    const delta =
                                                                        scoreChangeByRoundAndPlayer.get(
                                                                            `${round.roundNumber}-${player.id}`,
                                                                        ) ?? 0;

                                                                    return (
                                                                        <span className="flex items-center gap-1">
                                                                            {total}
                                                                            {delta >
                                                                            0 ? (
                                                                                <TrendingUp
                                                                                    size={
                                                                                        14
                                                                                    }
                                                                                    className="text-green-500"
                                                                                />
                                                                            ) : delta <
                                                                              0 ? (
                                                                                <TrendingDown
                                                                                    size={
                                                                                        14
                                                                                    }
                                                                                    className="text-red-500"
                                                                                />
                                                                            ) : (
                                                                                <Minus
                                                                                    size={
                                                                                        14
                                                                                    }
                                                                                    className="text-muted-foreground"
                                                                                />
                                                                            )}
                                                                        </span>
                                                                    );
                                                                })()}
                                                            </TableCell>
                                                        </Fragment>
                                                    );
                                                })}
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setEditRound(round);
                                                            setEditDialogOpen(true);
                                                        }}
                                                    >
                                                        <Edit size={16} />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </>
                    )}
                </div>
            </div>
            {editRound ? (
                <BoerenbridgeRoundDialog
                    open={editDialogOpen}
                    scoreboardId={scoreboardId}
                    players={players}
                    roundNumber={editRound.roundNumber}
                    editRound={editRound}
                    onOpenChange={(open) => {
                        setEditDialogOpen(open);
                        if (!open) {
                            setEditRound(null);
                        }
                    }}
                />
            ) : null}
        </>
    );
}
