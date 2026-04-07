import type { LucideIcon } from "lucide-react";

export type RoemItem = {
    label: string;
    points: string;
    icon: LucideIcon;
};

export function RoemSection({
    title,
    description,
    items,
    stukNote,
}: {
    title: string;
    description: string;
    items: RoemItem[];
    stukNote: string;
}) {
    return (
        <section className="relative overflow-hidden rounded-xl border-2 border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-rose-50 p-6 backdrop-blur-sm dark:border-amber-500/30 dark:from-amber-950/20 dark:via-slate-950 dark:to-rose-950/20 md:p-8">
            <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-500/20" />
            <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
                {description}
            </p>
            <div className="mt-6 space-y-2">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 rounded-lg border border-white/70 bg-white/75 p-3 dark:border-slate-600/60 dark:bg-slate-900/60 sm:p-4"
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400">
                            <item.icon size={20} />
                        </div>
                        <div className="flex-1">
                            <span className="text-sm">{item.label}</span>
                        </div>
                        <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
                            +{item.points}
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-muted-foreground mt-4 text-sm">{stukNote}</p>
        </section>
    );
}
