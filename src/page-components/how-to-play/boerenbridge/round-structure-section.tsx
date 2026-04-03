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
    playerCount,
    totalRoundsCount,
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
    playerCount: number;
    totalRoundsCount: number;
    maxRound: number;
}) {
    return (
        <section className="border-border/70 bg-card/80 rounded-xl border p-6 backdrop-blur-sm md:p-8">
            <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
                {description}
            </p>

            {/* Pyramid visualization */}
            <div className="bg-background/50 mt-6 rounded-lg border p-4 md:p-6">
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
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
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
