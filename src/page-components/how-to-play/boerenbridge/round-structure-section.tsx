import { ChevronsDown, ChevronsUp, Crown } from "lucide-react";
import { PyramidVisual } from "./pyramid-visual";

export function RoundStructureSection({
    title,
    description,
    ascending,
    topRound,
    descending,
    exampleLabel,
    totalRounds,
    maxCards,
    noTrumpTitle,
    noTrumpDescription,
    maxRound,
}: {
    title: string;
    description: string;
    ascending: string;
    topRound: string;
    descending: string;
    exampleLabel: string;
    totalRounds: string;
    maxCards: string;
    noTrumpTitle: string;
    noTrumpDescription: string;
    maxRound: number;
}) {
    return (
        <section className="relative overflow-hidden rounded-xl border-2 border-sky-200/70 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-6 backdrop-blur-sm dark:border-sky-500/30 dark:from-sky-950/30 dark:via-slate-950 dark:to-indigo-950/20 md:p-8">
            <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/20" />
            <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
                {description}
            </p>

            {/* Pyramid visualization */}
            <div className="relative mt-6 rounded-lg border border-white/70 bg-white/75 p-4 dark:border-slate-600/60 dark:bg-slate-900/60 md:p-6">
                <div className="mb-3 flex flex-wrap items-center justify-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                        <ChevronsUp size={14} className="text-emerald-500" />
                        <span className="text-muted-foreground">{ascending}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Crown size={14} className="text-amber-500" />
                        <span className="text-muted-foreground">{topRound}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <ChevronsDown size={14} className="text-blue-500" />
                        <span className="text-muted-foreground">{descending}</span>
                    </div>
                </div>
                <PyramidVisual maxRound={maxRound} />
                <p className="text-muted-foreground mt-4 text-center text-xs">
                    {exampleLabel}
                    {" — "}
                    {totalRounds}
                </p>
            </div>

            <p className="text-muted-foreground mt-4 text-sm">{maxCards}</p>

            {/* No trump info */}
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-300/70 bg-amber-100/60 p-4 dark:border-amber-500/40 dark:bg-amber-900/20">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                    <Crown
                        size={16}
                        className="text-amber-600 dark:text-amber-400"
                    />
                </div>
                <div>
                    <h4 className="text-sm font-semibold">{noTrumpTitle}</h4>
                    <p className="text-muted-foreground mt-1 text-sm">
                        {noTrumpDescription}
                    </p>
                </div>
            </div>
        </section>
    );
}
