import type { LucideIcon } from "lucide-react";

export type OverviewItem = {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
    bg: string;
};

export function OverviewGrid({
    title,
    items,
}: {
    title: string;
    items: OverviewItem[];
}) {
    return (
        <section className="grid gap-4 sm:grid-cols-2">
            <h2 className="text-xl font-semibold sm:col-span-2 md:text-2xl">
                {title}
            </h2>
            {items.map((item, index) => (
                <div
                    key={index}
                    className="relative overflow-hidden rounded-xl border-2 border-sky-200/70 bg-gradient-to-br from-sky-50/80 via-white to-indigo-50/70 p-5 backdrop-blur-sm dark:border-sky-500/30 dark:from-sky-950/20 dark:via-slate-950 dark:to-indigo-950/20"
                >
                    <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/70 bg-white/80 dark:border-slate-600/60 dark:bg-slate-900/70 ${item.bg}`}
                    >
                        <item.icon size={20} className={item.color} />
                    </div>
                    <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                            {item.description}
                        </p>
                    </div>
                </div>
            ))}
        </section>
    );
}
