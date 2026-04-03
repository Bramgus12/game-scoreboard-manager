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
        <div className="grid grid-cols-[auto_1fr_1fr] items-center gap-3 text-sm">
            <div className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                {priority}
            </div>
            <span className="text-muted-foreground">{amsterdams}</span>
            <span className="text-muted-foreground">{rotterdams}</span>
        </div>
    );
}
