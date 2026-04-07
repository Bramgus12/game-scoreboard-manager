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
        <section className="relative overflow-hidden rounded-xl border-2 border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6 backdrop-blur-sm dark:border-emerald-500/30 dark:from-emerald-950/30 dark:via-slate-950 dark:to-sky-950/20 md:p-8">
            <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/20" />
            <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
                {description}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <PointsTable title={trumpTitle} highlight rows={trumpRows} />
                <PointsTable title={nonTrumpTitle} rows={nonTrumpRows} />
            </div>
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-sky-300/70 bg-sky-100/60 p-4 dark:border-sky-500/40 dark:bg-sky-900/20">
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
