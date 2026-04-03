export function CardVisual({
    suit,
    value,
    isTrump,
    small,
}: {
    suit: "spade" | "heart" | "diamond" | "club";
    value: string;
    isTrump?: boolean;
    small?: boolean;
}) {
    const suitSymbols = {
        spade: "\u2660",
        heart: "\u2665",
        diamond: "\u2666",
        club: "\u2663",
    };
    const isRed = suit === "heart" || suit === "diamond";

    return (
        <div
            className={`relative flex flex-col items-center justify-center rounded-lg border-2 bg-white shadow-md dark:bg-gray-800 ${
                isTrump
                    ? "border-amber-400 shadow-amber-400/30"
                    : "border-gray-300 dark:border-gray-600"
            } ${small ? "h-14 w-10 text-xs" : "h-20 w-14 text-sm"}`}
        >
            <span
                className={`font-bold ${isRed ? "text-red-500" : "text-gray-900 dark:text-gray-100"} ${small ? "text-xs" : "text-base"}`}
            >
                {value}
            </span>
            <span
                className={`${isRed ? "text-red-500" : "text-gray-900 dark:text-gray-100"} ${small ? "text-sm" : "text-lg"}`}
            >
                {suitSymbols[suit]}
            </span>
            {isTrump && (
                <div className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[8px] font-bold text-amber-900">
                    T
                </div>
            )}
        </div>
    );
}
