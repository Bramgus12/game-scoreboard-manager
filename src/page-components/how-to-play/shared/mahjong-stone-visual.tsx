import { Zen_Maru_Gothic } from "next/font/google";

type MahjongStoneKind = "character" | "bamboo" | "circle" | "wind" | "dragon";
type MahjongStoneTone = "emerald" | "sky" | "rose" | "amber" | "indigo";

const zenMaruGothic = Zen_Maru_Gothic({
    subsets: ["latin"],
    weight: ["500", "700"],
    display: "swap",
});

const CHINESE_NUMERAL_BY_DIGIT: Record<string, string> = {
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六",
    "7": "七",
    "8": "八",
    "9": "九",
};

const WIND_GLYPH_BY_VALUE: Record<string, string> = {
    E: "東",
    S: "南",
    W: "西",
    N: "北",
};

const DRAGON_GLYPH_BY_VALUE: Record<string, string> = {
    C: "中",
    F: "發",
    P: "白",
};

const DRAGON_CORNER_MARK_BY_VALUE: Record<string, string> = {
    C: "C",
    F: "F",
    P: "P",
};

const CIRCLE_POSITIONS: Record<number, Array<[number, number]>> = {
    1: [[32, 44]],
    2: [
        [24, 34],
        [40, 54],
    ],
    3: [
        [22, 32],
        [32, 44],
        [42, 56],
    ],
    4: [
        [22, 32],
        [42, 32],
        [22, 56],
        [42, 56],
    ],
    5: [
        [22, 32],
        [42, 32],
        [32, 44],
        [22, 56],
        [42, 56],
    ],
    6: [
        [22, 28],
        [42, 28],
        [22, 44],
        [42, 44],
        [22, 60],
        [42, 60],
    ],
    7: [
        [32, 22],
        [22, 32],
        [42, 32],
        [22, 46],
        [42, 46],
        [22, 60],
        [42, 60],
    ],
    8: [
        [22, 22],
        [42, 22],
        [22, 36],
        [42, 36],
        [22, 50],
        [42, 50],
        [22, 64],
        [42, 64],
    ],
    9: [
        [22, 22],
        [32, 22],
        [42, 22],
        [22, 42],
        [32, 42],
        [42, 42],
        [22, 62],
        [32, 62],
        [42, 62],
    ],
};

function getBambooPositions(value: number): Array<[number, number]> {
    const count = Math.max(1, Math.min(9, value));
    const result: Array<[number, number]> = [];

    Array.from({ length: count }).forEach((_, index) => {
        const col = index % 3;
        const row = Math.floor(index / 3);

        result.push([17 + col * 10, 22 + row * 15]);
    });

    return result;
}

function CirclePips({ value }: { value: number }) {
    return (
        <>
            {(CIRCLE_POSITIONS[value] ?? []).map(([x, y], index) => {
                const isRed = index % 3 === 0;

                return (
                    <g key={`circle-pip-${value}-${index}`}>
                        <circle
                            cx={x}
                            cy={y}
                            r="5.5"
                            fill={isRed ? "#fee2e2" : "#dbeafe"}
                            stroke={isRed ? "#b91c1c" : "#1d4ed8"}
                            strokeWidth="1.1"
                        />
                        <circle
                            cx={x}
                            cy={y}
                            r="3.2"
                            fill="none"
                            stroke={isRed ? "#ef4444" : "#3b82f6"}
                            strokeWidth="0.9"
                        />
                        <circle
                            cx={x}
                            cy={y}
                            r="1.2"
                            fill={isRed ? "#991b1b" : "#1e3a8a"}
                        />
                    </g>
                );
            })}
        </>
    );
}

function BambooPips({ value }: { value: number }) {
    return (
        <>
            {getBambooPositions(value).map(([x, y], index) => {
                const isAlt = index % 2 === 0;

                return (
                    <g key={`bamboo-pip-${value}-${index}`}>
                        <rect
                            x={x}
                            y={y}
                            width="6"
                            height="12"
                            rx="2"
                            fill={isAlt ? "#16a34a" : "#15803d"}
                        />
                        <rect
                            x={x + 1}
                            y={y - 1}
                            width="4"
                            height="2"
                            rx="1"
                            fill="#14532d"
                        />
                        <rect
                            x={x + 1}
                            y={y + 5}
                            width="4"
                            height="2"
                            rx="1"
                            fill="#14532d"
                        />
                        <rect
                            x={x + 1}
                            y={y + 11}
                            width="4"
                            height="2"
                            rx="1"
                            fill="#14532d"
                        />
                    </g>
                );
            })}
        </>
    );
}

export function MahjongStoneVisual({
    kind,
    value,
    label,
    tone,
    small,
}: {
    kind: MahjongStoneKind;
    value: string;
    label?: string;
    tone?: MahjongStoneTone;
    small?: boolean;
}) {
    const effectiveTone = tone ?? "amber";
    const toneClass = {
        emerald: "border-emerald-300/70 bg-emerald-50/80",
        sky: "border-sky-300/70 bg-sky-50/80",
        rose: "border-rose-300/70 bg-rose-50/80",
        amber: "border-amber-300/70 bg-amber-50/80",
        indigo: "border-indigo-300/70 bg-indigo-50/80",
    }[effectiveTone];

    const numericValue = Number(value);
    const chineseNumeral = CHINESE_NUMERAL_BY_DIGIT[value] ?? value;
    const windGlyph = WIND_GLYPH_BY_VALUE[value] ?? value;
    const dragonGlyph = DRAGON_GLYPH_BY_VALUE[value] ?? value;
    const cornerMark =
        kind === "dragon" ? (DRAGON_CORNER_MARK_BY_VALUE[value] ?? value) : value;

    return (
        <div
            className={`box-border flex shrink-0 flex-col items-center rounded-md border shadow-sm dark:border-slate-600/60 dark:bg-slate-900 ${toneClass} ${small ? "w-10" : "w-14"}`}
        >
            <svg
                viewBox="0 0 64 88"
                className={`${small ? "h-14 w-10" : "h-20 w-14"} -m-px rounded-sm border border-amber-200/70 bg-amber-50`}
                aria-hidden="true"
            >
                <text
                    x="12"
                    y="14"
                    textAnchor="middle"
                    fontSize="18"
                    fill="#334155"
                    fontWeight="700"
                    className={zenMaruGothic.className}
                >
                    {cornerMark}
                </text>

                {kind === "circle" && Number.isInteger(numericValue) ? (
                    <CirclePips value={Math.min(Math.max(numericValue, 1), 9)} />
                ) : null}

                {kind === "bamboo" && Number.isInteger(numericValue) ? (
                    <BambooPips value={Math.min(Math.max(numericValue, 1), 9)} />
                ) : null}

                {kind === "character" ? (
                    <text
                        x="32"
                        y="56"
                        textAnchor="middle"
                        fontSize="28"
                        fill="#b42318"
                        fontWeight="700"
                        className={zenMaruGothic.className}
                    >
                        {chineseNumeral}
                    </text>
                ) : null}

                {kind === "wind" ? (
                    <text
                        x="32"
                        y="56"
                        textAnchor="middle"
                        fontSize="28"
                        fill="#5b4b2e"
                        fontWeight="700"
                        className={zenMaruGothic.className}
                    >
                        {windGlyph}
                    </text>
                ) : null}

                {kind === "dragon" ? (
                    value === "P" ? null : (
                        <text
                            x="32"
                            y="56"
                            textAnchor="middle"
                            fontSize="28"
                            fill={value === "C" ? "#b42318" : "#1f9d5a"}
                            fontWeight="700"
                            className={zenMaruGothic.className}
                        >
                            {dragonGlyph}
                        </text>
                    )
                ) : null}
            </svg>
            {label != null ? (
                <span
                    className={`${small ? "text-[9px]" : "text-[10px]"} mt-1 font-medium`}
                >
                    {label}
                </span>
            ) : null}
        </div>
    );
}

export function MahjongStonesFan({ small }: { small?: boolean }) {
    return (
        <div className="flex items-end gap-2 md:gap-3">
            <div className="origin-bottom translate-y-2 -rotate-12">
                <MahjongStoneVisual
                    kind="dragon"
                    value="F"
                    tone="emerald"
                    small={small}
                />
            </div>
            <div className="origin-bottom translate-y-1 -rotate-6">
                <MahjongStoneVisual
                    kind="wind"
                    value="E"
                    tone="amber"
                    small={small}
                />
            </div>
            <div className="origin-bottom rotate-2">
                <MahjongStoneVisual
                    kind="circle"
                    value="1"
                    tone="sky"
                    small={small}
                />
            </div>
            <div className="origin-bottom rotate-8">
                <MahjongStoneVisual
                    kind="character"
                    value="5"
                    tone="rose"
                    small={small}
                />
            </div>
        </div>
    );
}

export type { MahjongStoneKind, MahjongStoneTone };
