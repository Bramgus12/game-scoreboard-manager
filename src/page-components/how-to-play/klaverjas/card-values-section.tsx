import { Calculator } from "lucide-react";
import { PointsTable } from "./points-table";

export function CardValuesSection({
    title,
    description,
    trumpTitle,
    nonTrumpTitle,
    trumpRows,
    nonTrumpRows,
    totalTitle,
    totalDescription,
}: {
    title: string;
    description: string;
    trumpTitle: string;
    nonTrumpTitle: string;
    trumpRows: { card: string; points: number }[];
    nonTrumpRows: { card: string; points: number }[];
    totalTitle: string;
    totalDescription: string;
}) {
    return (
        <section className="border-border/70 bg-card/80 rounded-xl border p-6 backdrop-blur-sm md:p-8">
            <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
                {description}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <PointsTable title={trumpTitle} highlight rows={trumpRows} />
                <PointsTable title={nonTrumpTitle} rows={nonTrumpRows} />
            </div>
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                    <Calculator
                        size={16}
                        className="text-blue-600 dark:text-blue-400"
                    />
                </div>
                <div>
                    <h4 className="text-sm font-semibold">{totalTitle}</h4>
                    <p className="text-muted-foreground mt-1 text-sm">
                        {totalDescription}
                    </p>
                </div>
            </div>
        </section>
    );
}
