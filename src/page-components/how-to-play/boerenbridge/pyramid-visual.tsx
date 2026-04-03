export function PyramidVisual({ maxRound }: { maxRound: number }) {
    const ascending = Array.from({ length: maxRound }, (_, i) => i + 1);
    const descending = Array.from({ length: maxRound }, (_, i) => maxRound - i);
    const allRounds = [...ascending, ...descending];

    return (
        <div className="flex items-end justify-center gap-0.5 sm:gap-1">
            {allRounds.map((cards, index) => {
                const isTop = index === maxRound - 1 || index === maxRound;
                return (
                    <div key={index} className="flex flex-col items-center gap-1">
                        <span
                            className={`text-[10px] ${isTop ? "font-bold text-amber-500" : "text-muted-foreground"}`}
                        >
                            {cards}
                        </span>
                        <div
                            className={`w-3 rounded-t-sm transition-all sm:w-4 ${
                                isTop
                                    ? "bg-gradient-to-t from-amber-600 to-amber-400"
                                    : index < maxRound
                                      ? "bg-gradient-to-t from-emerald-600 to-emerald-400"
                                      : "bg-gradient-to-t from-blue-600 to-blue-400"
                            }`}
                            style={{ height: `${cards * 8}px` }}
                        />
                    </div>
                );
            })}
        </div>
    );
}
