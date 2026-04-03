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
                    className="border-border/70 bg-card/70 flex items-start gap-4 rounded-xl border p-5 backdrop-blur-sm"
                >
                    <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.bg}`}
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
