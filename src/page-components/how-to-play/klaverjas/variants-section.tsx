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
        <section className="border-border/70 bg-card/80 rounded-xl border p-6 backdrop-blur-sm md:p-8">
            <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
                {description}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
                {/* Amsterdams */}
                <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-5">
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
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-5">
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
            <div className="bg-background/50 mt-6 rounded-lg border p-4 md:p-6">
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
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
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
