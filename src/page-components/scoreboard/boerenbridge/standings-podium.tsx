"use client";

import { UUID } from "crypto";
import useBoerenbridgeTotalsQuery from "@/queries/use-boerenbridge-totals-query";
import Paper from "@/components/paper";
import { Medal, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
    scoreboardId: UUID;
};

const MEDAL_COLORS = {
    1: {
        bg: "from-yellow-400/20 to-yellow-600/20 dark:from-yellow-400/10 dark:to-yellow-600/10",
        border: "border-yellow-400 dark:border-yellow-500",
        text: "text-yellow-600 dark:text-yellow-400",
        icon: "text-yellow-500",
        ring: "ring-yellow-400/50",
        label: "🥇",
    },
    2: {
        bg: "from-gray-300/20 to-gray-400/20 dark:from-gray-300/10 dark:to-gray-500/10",
        border: "border-gray-400 dark:border-gray-400",
        text: "text-gray-600 dark:text-gray-300",
        icon: "text-gray-400",
        ring: "ring-gray-400/50",
        label: "🥈",
    },
    3: {
        bg: "from-amber-600/20 to-amber-800/20 dark:from-amber-600/10 dark:to-amber-800/10",
        border: "border-amber-600 dark:border-amber-600",
        text: "text-amber-700 dark:text-amber-500",
        icon: "text-amber-600",
        ring: "ring-amber-600/50",
        label: "🥉",
    },
} as const;

function isOnPodium(rank: number): rank is 1 | 2 | 3 {
    return rank >= 1 && rank <= 3;
}

const PODIUM_HEIGHTS = {
    1: "h-28",
    2: "h-20",
    3: "h-14",
} as const;

export default function StandingsPodium(props: Props) {
    const { scoreboardId } = props;
    const t = useTranslations();

    const {
        data: totals,
        isPending,
        isError,
    } = useBoerenbridgeTotalsQuery(scoreboardId);

    if (isPending || isError || !totals || totals.length === 0) {
        return null;
    }

    const sorted = [...totals].sort((a, b) => a.rank - b.rank);
    const topThree = sorted.slice(0, 3);
    const rest = sorted.slice(3);

    // Podium order: 2nd, 1st, 3rd (classic podium layout)
    const podiumOrder =
        topThree.length >= 3
            ? [topThree[1], topThree[0], topThree[2]]
            : topThree.length === 2
              ? [topThree[1], topThree[0]]
              : [topThree[0]];

    return (
        <Paper className="relative overflow-hidden border-2 border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-emerald-50 p-6 dark:border-amber-500/30 dark:from-amber-950/20 dark:via-slate-950 dark:to-emerald-950/20">
            <div className="pointer-events-none absolute -top-14 -right-14 h-36 w-36 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-500/20" />
            <div className="pointer-events-none absolute -bottom-14 -left-12 h-32 w-32 rounded-full bg-emerald-300/15 blur-3xl dark:bg-emerald-500/15" />
            <div className="relative mb-6 flex items-center gap-2">
                <Trophy size={20} className="text-yellow-500" />
                <h3 className="text-lg font-semibold">
                    {t("boerenbridge.standings.title")}
                </h3>
            </div>

            {/* Podium */}
            <div className="relative mb-6 flex items-end justify-center gap-3">
                {podiumOrder.map((player) => {
                    if (!isOnPodium(player.rank)) {
                        throw new Error("Player rank does not match");
                    }

                    const colors = MEDAL_COLORS[player.rank];
                    const height = PODIUM_HEIGHTS[player.rank];

                    return (
                        <div
                            key={player.playerId}
                            className="flex flex-col items-center gap-2"
                        >
                            {/* Player card */}
                            <div
                                className={`flex flex-col items-center rounded-lg border-2 bg-gradient-to-b p-3 ring-1 ${colors.bg} ${colors.border} ${colors.ring}`}
                            >
                                <span className="text-2xl">{colors.label}</span>
                                <span className="mt-1 text-sm font-semibold">
                                    {player.playerName}
                                </span>
                                <span className={`text-lg font-bold ${colors.text}`}>
                                    {player.total}
                                </span>
                                <span className="text-muted-foreground text-xs">
                                    {t("boerenbridge.standings.points")}
                                </span>
                            </div>

                            {/* Podium block */}
                            <div
                                className={`w-20 rounded-t-md bg-gradient-to-b sm:w-24 ${colors.bg} ${colors.border} border-2 ${height}`}
                            >
                                <div className="flex h-full items-center justify-center">
                                    <span
                                        className={`text-xl font-bold ${colors.text}`}
                                    >
                                        {player.rank}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Rest of the players */}
            {rest.length > 0 && (
                <div className="relative space-y-2">
                    <div className="text-muted-foreground mb-1 text-xs font-medium tracking-wider uppercase">
                        {t("boerenbridge.standings.otherPlayers")}
                    </div>
                    {rest.map((player) => (
                        <div
                            key={player.playerId}
                            className="flex items-center justify-between rounded-md border border-white/70 bg-white/75 px-4 py-2 dark:border-slate-600/60 dark:bg-slate-900/60"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-muted-foreground w-6 text-center text-sm font-medium">
                                    {player.rank}
                                </span>
                                <Medal size={14} className="text-muted-foreground" />
                                <span className="text-sm font-medium">
                                    {player.playerName}
                                </span>
                            </div>
                            <span className="text-sm font-semibold">
                                {player.total} {t("boerenbridge.standings.points")}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </Paper>
    );
}
