export function PointsTable({
    title,
    rows,
    highlight,
}: {
    title: string;
    rows: { card: string; points: number }[];
    highlight?: boolean;
}) {
    return (
        <div
            className={`rounded-lg border p-4 ${highlight ? "border-amber-300/70 bg-amber-100/60 dark:border-amber-500/40 dark:bg-amber-900/20" : "border-white/70 bg-white/75 dark:border-slate-600/60 dark:bg-slate-900/60"}`}
        >
            <h4
                className={`mb-3 text-sm font-semibold ${highlight ? "text-amber-600 dark:text-amber-400" : ""}`}
            >
                {title}
            </h4>
            <div className="space-y-1.5">
                {rows.map((row) => (
                    <div
                        key={row.card}
                        className="text-muted-foreground flex items-center justify-between text-sm"
                    >
                        <span>{row.card}</span>
                        <span className="font-mono font-medium">{row.points}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
