import { Check, Crown, X } from "lucide-react";
import { ScoringExample } from "./scoring-example";

export function ScoringSection({
    title,
    correctTitle,
    correctFormula,
    correctDescription,
    wrongTitle,
    wrongFormula,
    wrongDescription,
    strategyTitle,
    strategyDescription,
}: {
    title: string;
    correctTitle: string;
    correctFormula: string;
    correctDescription: string;
    wrongTitle: string;
    wrongFormula: string;
    wrongDescription: string;
    strategyTitle: string;
    strategyDescription: string;
}) {
    return (
        <section className="grid gap-4 md:grid-cols-2">
            <h2 className="text-xl font-semibold md:col-span-2 md:text-2xl">
                {title}
            </h2>

            {/* Correct prediction */}
            <div className="border-border/70 bg-card/70 rounded-xl border p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                        <Check size={20} className="text-emerald-500" />
                    </div>
                    <h3 className="font-semibold">{correctTitle}</h3>
                </div>
                <div className="mt-3 rounded-md bg-emerald-500/10 px-3 py-2 font-mono text-sm text-emerald-700 dark:text-emerald-300">
                    {correctFormula}
                </div>
                <p className="text-muted-foreground mt-3 text-sm">
                    {correctDescription}
                </p>
                <div className="mt-4 space-y-2">
                    <ScoringExample
                        predicted={0}
                        actual={0}
                        pointsPerTrick={2}
                        isCorrect
                    />
                    <ScoringExample
                        predicted={3}
                        actual={3}
                        pointsPerTrick={2}
                        isCorrect
                    />
                </div>
            </div>

            {/* Wrong prediction */}
            <div className="border-border/70 bg-card/70 rounded-xl border p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                        <X size={20} className="text-red-500" />
                    </div>
                    <h3 className="font-semibold">{wrongTitle}</h3>
                </div>
                <div className="mt-3 rounded-md bg-red-500/10 px-3 py-2 font-mono text-sm text-red-700 dark:text-red-300">
                    {wrongFormula}
                </div>
                <p className="text-muted-foreground mt-3 text-sm">
                    {wrongDescription}
                </p>
                <div className="mt-4 space-y-2">
                    <ScoringExample
                        predicted={2}
                        actual={1}
                        pointsPerTrick={2}
                        isCorrect={false}
                    />
                    <ScoringExample
                        predicted={0}
                        actual={3}
                        pointsPerTrick={2}
                        isCorrect={false}
                    />
                </div>
            </div>

            {/* Strategy tip */}
            <div className="border-border/70 bg-card/70 rounded-xl border border-amber-500/30 p-5 backdrop-blur-sm md:col-span-2">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                        <Crown size={20} className="text-amber-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold">{strategyTitle}</h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                            {strategyDescription}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
