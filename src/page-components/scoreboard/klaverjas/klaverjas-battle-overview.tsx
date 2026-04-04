"use client";

import { UUID } from "crypto";
import Paper from "@/components/paper";
import { MergedRound } from "@/models/app/klaverjas-round/merged-round";
import useKlaverjasRoundsForScoreboardQuery from "@/queries/use-klaverjas-rounds-for-scoreboard-query";
import useKlaverjasTeamsQuery from "@/queries/use-klaverjas-teams-query";
import useKlaverjasTotalsForScoreboardQuery from "@/queries/use-klaverjas-totals-for-scoreboard-query";
import { getFame } from "@/utils/funcs/get-fame";
import { Crown, Droplets, Shield, Sparkles, Swords, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
    scoreboardId: UUID;
};

function getRoundScore(round: MergedRound, team: "team1" | "team2") {
    return round[team].points + getFame(round, team);
}

function getAverage(total: number, roundsPlayed: number) {
    if (roundsPlayed === 0) {
        return 0;
    }

    return Math.round((total / roundsPlayed) * 10) / 10;
}

export default function KlaverjasBattleOverview(props: Props) {
    const { scoreboardId } = props;
    const t = useTranslations();

    const {
        data: teams,
        isPending: isTeamsPending,
        isError: isTeamsError,
    } = useKlaverjasTeamsQuery(scoreboardId);

    const {
        data: rounds,
        isPending: isRoundsPending,
        isError: isRoundsError,
    } = useKlaverjasRoundsForScoreboardQuery(scoreboardId);

    const {
        data: totals,
        isPending: isTotalsPending,
        isError: isTotalsError,
    } = useKlaverjasTotalsForScoreboardQuery(scoreboardId);

    if (
        isTeamsPending ||
        isTeamsError ||
        isRoundsPending ||
        isRoundsError ||
        isTotalsPending ||
        isTotalsError ||
        !teams ||
        !rounds ||
        !totals
    ) {
        return null;
    }

    const roundsPlayed = rounds.length;
    const totalPoints = totals.us + totals.them;

    const usShare = totalPoints > 0 ? (totals.us / totalPoints) * 100 : 50;
    const themShare = totalPoints > 0 ? (totals.them / totalPoints) * 100 : 50;

    const usWins = rounds.filter(
        (round) => getRoundScore(round, "team1") > getRoundScore(round, "team2"),
    ).length;
    const themWins = rounds.filter(
        (round) => getRoundScore(round, "team2") > getRoundScore(round, "team1"),
    ).length;

    const usWet = rounds.filter((round) => round.team1.isWet).length;
    const themWet = rounds.filter((round) => round.team2.isWet).length;

    const usPit = rounds.filter((round) => round.team1.isPit).length;
    const themPit = rounds.filter((round) => round.team2.isPit).length;

    const lead = Math.abs(totals.us - totals.them);
    const isTie = totals.us === totals.them;
    const isUsLeading = totals.us > totals.them;

    const usAverage = getAverage(totals.us, roundsPlayed);
    const themAverage = getAverage(totals.them, roundsPlayed);

    return (
        <Paper className="relative overflow-hidden border-2 border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5 shadow-sm dark:border-emerald-500/30 dark:from-emerald-950/30 dark:via-slate-950 dark:to-sky-950/20">
            <div className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/20" />

            <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                    <p className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
                        {t("klaverjas.battle.subtitle")}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold">
                        {t("klaverjas.battle.title")}
                    </h3>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-emerald-300/70 bg-white/80 px-3 py-1 text-sm dark:border-emerald-500/40 dark:bg-slate-950/70">
                    <Swords
                        size={14}
                        className="text-emerald-600 dark:text-emerald-400"
                    />
                    <span>
                        {t("klaverjas.battle.roundsPlayed", { count: roundsPlayed })}
                    </span>
                </div>
            </div>

            <div className="mb-5 rounded-xl border border-emerald-300/70 bg-white/70 p-3 dark:border-emerald-500/40 dark:bg-slate-950/60">
                <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                    <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                        style={{ width: `${usShare}%` }}
                    />
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-lg bg-emerald-100/70 p-2 dark:bg-emerald-900/30">
                        <p className="text-muted-foreground text-xs">
                            {teams.us.name}
                        </p>
                        <p className="text-lg font-semibold">{totals.us}</p>
                    </div>
                    <div className="rounded-lg bg-sky-100/70 p-2 text-right dark:bg-sky-900/30">
                        <p className="text-muted-foreground text-xs">
                            {teams.them.name}
                        </p>
                        <p className="text-lg font-semibold">{totals.them}</p>
                    </div>
                </div>

                <div className="text-muted-foreground mt-3 flex items-center justify-center gap-1 text-sm">
                    <Crown size={14} className="text-amber-500" />
                    {isTie
                        ? t("klaverjas.battle.tied")
                        : t("klaverjas.battle.leadBy", {
                              team: isUsLeading ? teams.us.name : teams.them.name,
                              points: lead,
                          })}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-2 rounded-xl border border-emerald-300/70 bg-white/80 p-3 dark:border-emerald-500/40 dark:bg-slate-950/60">
                    <p className="font-medium">{teams.us.name}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="rounded-md bg-emerald-100/80 p-2 dark:bg-emerald-900/30">
                            <div className="mb-1 flex items-center gap-1 text-xs">
                                <Shield size={12} />
                                {t("klaverjas.battle.roundsWon")}
                            </div>
                            <p className="font-semibold">{usWins}</p>
                        </div>
                        <div className="rounded-md bg-rose-100/80 p-2 dark:bg-rose-900/30">
                            <div className="mb-1 flex items-center gap-1 text-xs">
                                <Droplets size={12} />
                                {t("klaverjas.battle.natCount")}
                            </div>
                            <p className="font-semibold">{usWet}</p>
                        </div>
                        <div className="rounded-md bg-amber-100/80 p-2 dark:bg-amber-900/30">
                            <div className="mb-1 flex items-center gap-1 text-xs">
                                <Sparkles size={12} />
                                {t("klaverjas.battle.pitCount")}
                            </div>
                            <p className="font-semibold">{usPit}</p>
                        </div>
                        <div className="rounded-md bg-sky-100/80 p-2 dark:bg-sky-900/30">
                            <div className="mb-1 flex items-center gap-1 text-xs">
                                <TrendingUp size={12} />
                                {t("klaverjas.battle.avgPoints")}
                            </div>
                            <p className="font-semibold">{usAverage}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 rounded-xl border border-sky-300/70 bg-white/80 p-3 dark:border-sky-500/40 dark:bg-slate-950/60">
                    <p className="font-medium">{teams.them.name}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="rounded-md bg-sky-100/80 p-2 dark:bg-sky-900/30">
                            <div className="mb-1 flex items-center gap-1 text-xs">
                                <Shield size={12} />
                                {t("klaverjas.battle.roundsWon")}
                            </div>
                            <p className="font-semibold">{themWins}</p>
                        </div>
                        <div className="rounded-md bg-rose-100/80 p-2 dark:bg-rose-900/30">
                            <div className="mb-1 flex items-center gap-1 text-xs">
                                <Droplets size={12} />
                                {t("klaverjas.battle.natCount")}
                            </div>
                            <p className="font-semibold">{themWet}</p>
                        </div>
                        <div className="rounded-md bg-amber-100/80 p-2 dark:bg-amber-900/30">
                            <div className="mb-1 flex items-center gap-1 text-xs">
                                <Sparkles size={12} />
                                {t("klaverjas.battle.pitCount")}
                            </div>
                            <p className="font-semibold">{themPit}</p>
                        </div>
                        <div className="rounded-md bg-emerald-100/80 p-2 dark:bg-emerald-900/30">
                            <div className="mb-1 flex items-center gap-1 text-xs">
                                <TrendingUp size={12} />
                                {t("klaverjas.battle.avgPoints")}
                            </div>
                            <p className="font-semibold">{themAverage}</p>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-muted-foreground mt-4 text-center text-xs">
                {t("klaverjas.battle.pointsSplit", {
                    usPoints: Math.round(usShare),
                    themPoints: Math.round(themShare),
                })}
            </p>
        </Paper>
    );
}
