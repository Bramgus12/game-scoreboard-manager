import { ArrowRightLeft, Scale, ShieldCheck } from "lucide-react";
import { RuleComparisonRow } from "./rule-comparison-row";

export function VariantsSection({
    title,
    description,
    amsterdamsTitle,
    amsterdamsDescription,
    rotterdamsTitle,
    rotterdamsDescription,
    comparisonTitle,
    rules,
    keyDifferenceTitle,
    keyDifferenceDescription,
}: {
    title: string;
    description: string;
    amsterdamsTitle: string;
    amsterdamsDescription: string;
    rotterdamsTitle: string;
    rotterdamsDescription: string;
    comparisonTitle: string;
    rules: { amsterdams: string; rotterdams: string }[];
    keyDifferenceTitle: string;
    keyDifferenceDescription: string;
}) {
    return (
        <section className="relative overflow-hidden rounded-xl border-2 border-sky-200/70 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-6 backdrop-blur-sm dark:border-sky-500/30 dark:from-sky-950/30 dark:via-slate-950 dark:to-indigo-950/20 md:p-8">
            <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/20" />
            <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
                {description}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
                {/* Amsterdams */}
                <div className="rounded-xl border border-sky-300/70 bg-sky-100/60 p-5 dark:border-sky-500/40 dark:bg-sky-900/20">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                            <Scale size={20} className="text-blue-500" />
                        </div>
                        <h3 className="font-semibold">{amsterdamsTitle}</h3>
                    </div>
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                        {amsterdamsDescription}
                    </p>
                </div>

                {/* Rotterdams */}
                <div className="rounded-xl border border-rose-300/70 bg-rose-100/60 p-5 dark:border-rose-500/40 dark:bg-rose-900/20">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10">
                            <ShieldCheck size={20} className="text-rose-500" />
                        </div>
                        <h3 className="font-semibold">{rotterdamsTitle}</h3>
                    </div>
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                        {rotterdamsDescription}
                    </p>
                </div>
            </div>

            {/* Comparison table */}
            <div className="mt-6 rounded-lg border border-white/70 bg-white/75 p-4 dark:border-slate-600/60 dark:bg-slate-900/60 md:p-6">
                <h4 className="mb-4 text-sm font-semibold">{comparisonTitle}</h4>
                <div className="mb-3 grid grid-cols-[auto_1fr_1fr] gap-3 text-xs font-semibold">
                    <div className="w-6" />
                    <span className="text-blue-500">Amsterdams</span>
                    <span className="text-rose-500">Rotterdams</span>
                </div>
                <div className="space-y-2">
                    {rules.map((rule, index) => (
                        <RuleComparisonRow
                            key={index}
                            priority={index + 1}
                            amsterdams={rule.amsterdams}
                            rotterdams={rule.rotterdams}
                        />
                    ))}
                </div>
            </div>

            {/* Key difference callout */}
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-300/70 bg-amber-100/60 p-4 dark:border-amber-500/40 dark:bg-amber-900/20">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                    <ArrowRightLeft
                        size={16}
                        className="text-amber-600 dark:text-amber-400"
                    />
                </div>
                <div>
                    <h4 className="text-sm font-semibold">{keyDifferenceTitle}</h4>
                    <p className="text-muted-foreground mt-1 text-sm">
                        {keyDifferenceDescription}
                    </p>
                </div>
            </div>
        </section>
    );
}
