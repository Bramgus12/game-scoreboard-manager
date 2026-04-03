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
        <section className="border-border/70 bg-card/80 rounded-xl border p-6 backdrop-blur-sm md:p-8">
            <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
            <div className="mt-6 space-y-6">
                {steps.map((item) => (
                    <div key={item.step} className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="bg-primary text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                                {item.step}
                            </div>
                            {item.step < totalSteps && (
                                <div className="bg-border mt-2 w-px flex-1" />
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
