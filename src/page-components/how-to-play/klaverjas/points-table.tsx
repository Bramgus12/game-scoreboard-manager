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
            className={`border-border/70 rounded-lg border p-4 ${highlight ? "border-amber-500/30 bg-amber-500/5" : "bg-background/50"}`}
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
