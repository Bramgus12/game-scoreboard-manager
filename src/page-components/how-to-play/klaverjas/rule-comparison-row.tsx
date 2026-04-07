export function RuleComparisonRow({
    priority,
    amsterdams,
    rotterdams,
}: {
    priority: number;
    amsterdams: string;
    rotterdams: string;
}) {
    return (
        <div className="grid grid-cols-[auto_1fr_1fr] items-center gap-3 rounded-md border border-white/70 bg-white/70 p-2 text-sm dark:border-slate-600/60 dark:bg-slate-900/50">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-sky-600 text-xs font-bold text-white">
                {priority}
            </div>
            <span className="text-muted-foreground">{amsterdams}</span>
            <span className="text-muted-foreground">{rotterdams}</span>
        </div>
    );
}
