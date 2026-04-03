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
        <section className="border-border/70 bg-card/80 rounded-xl border p-6 backdrop-blur-sm md:p-8">
            <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
                {description}
            </p>
            <div className="mt-6 space-y-2">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="border-border/70 bg-background/70 flex items-center gap-4 rounded-lg border p-3 sm:p-4"
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
