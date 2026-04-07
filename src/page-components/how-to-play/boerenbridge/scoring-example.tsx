import { Check, X } from "lucide-react";

export function ScoringExample({
    predicted,
    actual,
    pointsPerTrick,
    isCorrect,
}: {
    predicted: number;
    actual: number;
    pointsPerTrick: number;
    isCorrect: boolean;
}) {
    const score = isCorrect
        ? 10 + actual * pointsPerTrick
        : -Math.abs(predicted - actual) * pointsPerTrick;

    return (
        <div className="flex items-center gap-4 rounded-lg border border-white/70 bg-white/75 p-3 dark:border-slate-600/60 dark:bg-slate-900/60 sm:p-4">
            <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    isCorrect
                        ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                        : "bg-red-500/20 text-red-600 dark:text-red-400"
                }`}
            >
                {isCorrect ? <Check size={20} /> : <X size={20} />}
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">
                        Predicted: {predicted}
                    </span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-muted-foreground">Won: {actual}</span>
                </div>
            </div>
            <div
                className={`text-lg font-bold ${
                    score >= 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                }`}
            >
                {score > 0 ? `+${score}` : score}
            </div>
        </div>
    );
}
