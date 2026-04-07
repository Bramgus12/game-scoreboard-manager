import { Check, Crown, Sparkles, Star, X } from "lucide-react";

export function KlaverjasScoring({
    title,
    winTitle,
    winDescription,
    natTitle,
    natDescription,
    pitTitle,
    pitDescription,
    lastTrickTitle,
    lastTrickDescription,
    strategyTitle,
    strategyDescription,
}: {
    title: string;
    winTitle: string;
    winDescription: string;
    natTitle: string;
    natDescription: string;
    pitTitle: string;
    pitDescription: string;
    lastTrickTitle: string;
    lastTrickDescription: string;
    strategyTitle: string;
    strategyDescription: string;
}) {
    return (
        <section className="grid gap-4 md:grid-cols-2">
            <h2 className="text-xl font-semibold md:col-span-2 md:text-2xl">
                {title}
            </h2>

            {/* Normal scoring */}
            <div className="rounded-xl border-2 border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5 backdrop-blur-sm dark:border-emerald-500/30 dark:from-emerald-950/20 dark:via-slate-950 dark:to-sky-950/20">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                        <Check size={20} className="text-emerald-500" />
                    </div>
                    <h3 className="font-semibold">{winTitle}</h3>
                </div>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {winDescription}
                </p>
            </div>

            {/* Nat */}
            <div className="rounded-xl border-2 border-rose-200/70 bg-gradient-to-br from-rose-50 via-white to-amber-50 p-5 backdrop-blur-sm dark:border-rose-500/30 dark:from-rose-950/20 dark:via-slate-950 dark:to-amber-950/20">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                        <X size={20} className="text-red-500" />
                    </div>
                    <h3 className="font-semibold">{natTitle}</h3>
                </div>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {natDescription}
                </p>
            </div>

            {/* Pit */}
            <div className="rounded-xl border-2 border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-rose-50 p-5 backdrop-blur-sm dark:border-amber-500/30 dark:from-amber-950/20 dark:via-slate-950 dark:to-rose-950/20">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                        <Sparkles size={20} className="text-amber-500" />
                    </div>
                    <h3 className="font-semibold">{pitTitle}</h3>
                </div>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {pitDescription}
                </p>
            </div>

            {/* Last trick */}
            <div className="rounded-xl border-2 border-sky-200/70 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-5 backdrop-blur-sm dark:border-sky-500/30 dark:from-sky-950/20 dark:via-slate-950 dark:to-indigo-950/20">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                        <Star size={20} className="text-purple-500" />
                    </div>
                    <h3 className="font-semibold">{lastTrickTitle}</h3>
                </div>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {lastTrickDescription}
                </p>
            </div>

            {/* Strategy tip */}
            <div className="rounded-xl border-2 border-amber-300/70 bg-gradient-to-br from-amber-50 via-white to-emerald-50 p-5 backdrop-blur-sm dark:border-amber-500/40 dark:from-amber-950/20 dark:via-slate-950 dark:to-emerald-950/20 md:col-span-2">
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
