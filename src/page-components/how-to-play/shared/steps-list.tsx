import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type StepItem = {
    step: number;
    icon: LucideIcon;
    title: string;
    description: string;
    visual: ReactNode;
};

export function StepsList({ title, steps }: { title: string; steps: StepItem[] }) {
    const totalSteps = steps.length;

    return (
        <section className="relative overflow-hidden rounded-xl border-2 border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6 backdrop-blur-sm dark:border-emerald-500/30 dark:from-emerald-950/20 dark:via-slate-950 dark:to-sky-950/20 md:p-8">
            <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/20" />
            <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
            <div className="relative mt-6 space-y-6">
                {steps.map((item) => (
                    <div
                        key={item.step}
                        className="flex gap-4 rounded-lg border border-white/70 bg-white/70 p-3 dark:border-slate-600/60 dark:bg-slate-900/60"
                    >
                        <div className="flex flex-col items-center">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-sky-600 text-sm font-bold text-white">
                                {item.step}
                            </div>
                            {item.step < totalSteps && (
                                <div className="mt-2 w-px flex-1 bg-gradient-to-b from-emerald-300 to-sky-300 dark:from-emerald-700 dark:to-sky-700" />
                            )}
                        </div>
                        <div className="pb-6">
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                                {item.description}
                            </p>
                            {item.visual}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
