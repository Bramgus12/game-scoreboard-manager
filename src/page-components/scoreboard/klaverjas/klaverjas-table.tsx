"use client";

import { UUID } from "crypto";
import useScoreboardByIdQuery from "@/queries/use-scoreboard-by-id-query";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import useKlaverjasTeamsQuery from "@/queries/use-klaverjas-teams-query";
import CreateRoundButton from "@/page-components/scoreboard/klaverjas/create-round-button";
import RoundDialog from "@/page-components/scoreboard/klaverjas/round-dialog";
import useKlaverjasRoundsForScoreboardQuery from "@/queries/use-klaverjas-rounds-for-scoreboard-query";
import useKlaverjasTotalsForScoreboardQuery from "@/queries/use-klaverjas-totals-for-scoreboard-query";
import {
    ArrowLeftIcon,
    Asterisk,
    BookOpen,
    Droplets,
    Edit,
    Loader2Icon,
    Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MergedRound } from "@/models/app/klaverjas-round/merged-round";
import Paper from "@/components/paper";
import { Link, useRouter } from "@/i18n/navigation";
import KlaverjasBattleOverview from "@/page-components/scoreboard/klaverjas/klaverjas-battle-overview";

type Props = {
    scoreboardId: UUID;
};

export default function KlaverjasTable(props: Props) {
    const { scoreboardId } = props;

    const router = useRouter();

    const t = useTranslations();

    const [editRound, setEditRound] = useState<MergedRound | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const {
        data: scoreboard,
        isPending: isScoreboardPending,
        isError: isScoreboardError,
    } = useScoreboardByIdQuery(scoreboardId);

    const {
        data: teams,
        isPending: isTeamsPending,
        isError: isTeamsError,
    } = useKlaverjasTeamsQuery(scoreboardId);

    const {
        data: rounds,
        isPending: isRoundsPending,
        isError: isRoundsError,
        isRefetching: isRoundsRefetching,
    } = useKlaverjasRoundsForScoreboardQuery(scoreboardId);

    const {
        data: totals,
        isPending: isTotalsPending,
        isError: isTotalsError,
        isRefetching: isTotalsRefetching,
    } = useKlaverjasTotalsForScoreboardQuery(scoreboardId);

    if (
        isScoreboardPending ||
        isScoreboardError ||
        isTeamsError ||
        isTeamsPending ||
        isRoundsError ||
        isRoundsPending ||
        isTotalsError ||
        isTotalsPending
    ) {
        return null;
    }

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
                            <Link href="/how-to-play/klaverjas">
                                <BookOpen size={16} />
                                {t("klaverjas.howToPlay")}
                            </Link>
                        </Button>
                    </div>
                    <Paper className="relative flex items-center justify-between gap-4 overflow-hidden border-2 border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-4 text-2xl dark:border-emerald-500/30 dark:from-emerald-950/30 dark:via-slate-950 dark:to-sky-950/20">
                        <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/20" />
                        <div className="relative flex items-center gap-4">
                            <span>{scoreboard?.scoreboardName}</span>
                            {isRoundsRefetching || isTotalsRefetching ? (
                                <Loader2Icon className="animate-spin" />
                            ) : null}
                        </div>
                        <div className="relative">
                            <CreateRoundButton scoreboardId={scoreboardId} />
                        </div>
                    </Paper>
                    <KlaverjasBattleOverview scoreboardId={scoreboardId} />
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <Paper className="relative flex-2 overflow-hidden border-2 border-indigo-200/70 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-4 dark:border-indigo-500/30 dark:from-indigo-950/30 dark:via-slate-950 dark:to-sky-950/20">
                            <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-indigo-300/15 blur-3xl dark:bg-indigo-500/15" />
                            <div className="relative overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-white/70 dark:bg-slate-950/40">
                                        <TableHead className="w-[100px] font-bold">
                                            #
                                        </TableHead>
                                        <TableHead className="font-bold">
                                            {teams?.us.name ??
                                                t("klaverjas.table.teamUs")}
                                        </TableHead>
                                        <TableHead className="font-bold">
                                            {teams?.them.name ??
                                                t("klaverjas.table.teamThem")}
                                        </TableHead>
                                        <TableHead className="w-[100px] font-bold">
                                            {t("klaverjas.table.actions")}
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rounds?.map((round) => (
                                        <TableRow
                                            key={`${round.team1.id} - ${round.team2.id}`}
                                        >
                                            <TableCell className="font-medium">
                                                {round.roundNumber}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-row items-center gap-2">
                                                    {round.team1.points}
                                                    {round.team1.fame > 0 ? (
                                                        <p className="rounded-sm bg-gray-300 p-0.5 px-2 dark:bg-gray-600">
                                                            {round.team1.fame}
                                                        </p>
                                                    ) : null}
                                                    {round.team1.isGoing ? (
                                                        <Asterisk size={16} />
                                                    ) : null}
                                                    {round.team1.isPit ? (
                                                        <Sparkles size={16} />
                                                    ) : null}
                                                    {round.team1.isWet ? (
                                                        <Droplets size={16} />
                                                    ) : null}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-row items-center gap-2">
                                                    {round.team2.points}
                                                    {round.team2.fame > 0 ? (
                                                        <p className="rounded-sm bg-gray-300 p-0.5 px-2 dark:bg-gray-600">
                                                            {round.team2.fame}
                                                        </p>
                                                    ) : null}
                                                    {round.team2.isGoing ? (
                                                        <Asterisk size={16} />
                                                    ) : null}
                                                    {round.team2.isPit ? (
                                                        <Sparkles size={16} />
                                                    ) : null}
                                                    {round.team2.isWet ? (
                                                        <Droplets size={16} />
                                                    ) : null}
                                                </div>
                                            </TableCell>
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
                                <TableFooter>
                                    <TableRow className="bg-white/70 dark:bg-slate-950/40">
                                        <TableCell className="font-bold">
                                            {t("klaverjas.table.total")}
                                        </TableCell>
                                        <TableCell className="font-bold">
                                            {totals.us}
                                        </TableCell>
                                        <TableCell className="font-bold">
                                            {totals.them}
                                        </TableCell>
                                        <TableCell>
                                            {/* Empty cell for Actions column */}
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                            </div>
                        </Paper>
                    </div>
                </div>
            </div>
            {editRound && (
                <RoundDialog
                    scoreboardId={scoreboardId}
                    editRound={editRound}
                    isEditMode={true}
                    open={editDialogOpen}
                    onOpenChange={(open) => {
                        setEditDialogOpen(open);
                        if (!open) {
                            setEditRound(null);
                        }
                    }}
                />
            )}
        </>
    );
}
