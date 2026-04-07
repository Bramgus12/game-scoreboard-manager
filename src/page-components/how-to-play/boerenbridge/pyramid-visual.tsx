export function PyramidVisual({ maxRound }: { maxRound: number }) {
    const ascending = Array.from({ length: maxRound }, (_, i) => i + 1);
    const descending = Array.from({ length: maxRound }, (_, i) => maxRound - i);
    const allRounds = [...ascending, ...descending];

    const getBarColorClass = (index: number, isTop: boolean) => {
        if (isTop) {
            return "bg-gradient-to-t from-amber-600 to-amber-400";
        }

        if (index < maxRound) {
            return "bg-gradient-to-t from-emerald-600 to-emerald-400";
        }

        return "bg-gradient-to-t from-blue-600 to-blue-400";
    };

    return (
        <>
            <div className="mx-auto flex w-full max-w-xs flex-col gap-1.5 sm:hidden">
                {allRounds.map((cards, index) => {
                    const isTop = index === maxRound - 1 || index === maxRound;
                    return (
                        <div key={index} className="flex items-center gap-2">
                            <span
                                className={`w-4 text-center text-[10px] ${isTop ? "font-bold text-amber-500" : "text-muted-foreground"}`}
                            >
                                {cards}
                            </span>
                            <div className="bg-muted h-3 flex-1 rounded-sm">
                                <div
                                    className={`h-full rounded-sm transition-all ${getBarColorClass(index, isTop)}`}
                                    style={{ width: `${(cards / maxRound) * 100}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="hidden items-end justify-center gap-0.5 sm:flex sm:gap-1">
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
                                className={`w-3 rounded-t-sm transition-all sm:w-4 ${getBarColorClass(index, isTop)}`}
                                style={{ height: `${cards * 8}px` }}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
}
