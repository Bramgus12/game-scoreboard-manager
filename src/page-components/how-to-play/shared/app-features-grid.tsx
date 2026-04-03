import type { LucideIcon } from "lucide-react";

export type AppFeatureItem = {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
    bg: string;
};

export function AppFeaturesGrid({
    title,
    features,
}: {
    title: string;
    features: AppFeatureItem[];
}) {
    return (
        <section id="app-features" className="scroll-mt-8">
            <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="border-border/70 bg-card/70 rounded-xl border p-5 backdrop-blur-sm"
                    >
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${feature.bg}`}
                        >
                            <feature.icon size={20} className={feature.color} />
                        </div>
                        <h3 className="mt-3 font-semibold">{feature.title}</h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
