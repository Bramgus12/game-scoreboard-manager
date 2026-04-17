type MahjongWallDiagramProps = {
    liveLabel: string;
    breakLabel: string;
    deadLabel: string;
};

export default function MahjongWallDiagram(props: MahjongWallDiagramProps) {
    const { liveLabel, breakLabel, deadLabel } = props;
    const stacksPerSide = 18;
    const lastIndex = stacksPerSide - 1;
    const step = 13;

    const horizontalWidth = 12;
    const horizontalHeight = 8;
    const verticalWidth = 8;
    const verticalHeight = 12;
    const wallGap = 1;

    const topRowStartX = 36;
    const bottomRowStartX = topRowStartX + verticalWidth + wallGap;
    const topRowY = 36;
    const bottomRowY =
        topRowY +
        lastIndex * step +
        (verticalHeight - horizontalHeight) +
        horizontalHeight +
        wallGap;

    const leftColX = topRowStartX;
    const rightColX = topRowStartX + lastIndex * step + horizontalWidth + wallGap;
    const leftColStartY = topRowY + horizontalHeight + wallGap;
    const rightColStartY = topRowY;

    const deadWallStartIndex = 10;
    const deadWallEndIndex = 16;

    function renderStack(
        x: number,
        y: number,
        width: number,
        height: number,
        isDeadWall = false,
    ) {
        const bottomColor = isDeadWall ? "#e97474" : "#c79145";
        const topColor = isDeadWall ? "#f3a1a1" : "#e2b56a";

        return (
            <g>
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    rx="1.4"
                    fill={bottomColor}
                />
                <rect
                    x={x + 0.7}
                    y={y - 2.2}
                    width={width}
                    height={height}
                    rx="1.4"
                    fill={topColor}
                />
            </g>
        );
    }

    return (
        <div className="mt-4 rounded-lg border border-amber-300/60 bg-white/80 p-3 dark:bg-slate-950/40">
            <svg viewBox="0 0 320 320" className="mx-auto h-72 w-72" aria-hidden="true">
                <rect
                    x="22"
                    y="22"
                    width="276"
                    height="276"
                    rx="12"
                    fill="#fff9ec"
                    stroke="#d8bf8b"
                    strokeWidth="2.5"
                />
                <rect
                    x="78"
                    y="78"
                    width="164"
                    height="164"
                    rx="10"
                    fill="#f7f8fa"
                    stroke="#d8dee8"
                    strokeWidth="1.5"
                />

                {Array.from({ length: stacksPerSide }).map((_, index) => (
                    <g key={`top-wall-${index}`}>
                        {renderStack(
                            topRowStartX + index * step,
                            topRowY,
                            horizontalWidth,
                            horizontalHeight,
                        )}
                    </g>
                ))}

                {Array.from({ length: stacksPerSide }).map((_, index) => (
                    <g key={`bottom-wall-${index}`}>
                        {renderStack(
                            bottomRowStartX + index * step,
                            bottomRowY,
                            horizontalWidth,
                            horizontalHeight,
                        )}
                    </g>
                ))}

                {Array.from({ length: stacksPerSide }).map((_, index) => {
                    const y = leftColStartY + index * step;

                    return (
                        <g key={`left-wall-${index + 1}`}>
                            {renderStack(leftColX, y, verticalWidth, verticalHeight)}
                        </g>
                    );
                })}

                {Array.from({ length: stacksPerSide }).map((_, index) => {
                    const logicalIndex = index + 1;
                    const isDeadWall =
                        logicalIndex >= deadWallStartIndex &&
                        logicalIndex <= deadWallEndIndex;
                    const y = rightColStartY + index * step;

                    return (
                        <g key={`right-wall-${logicalIndex}`}>
                            {renderStack(
                                rightColX,
                                y,
                                verticalWidth,
                                verticalHeight,
                                isDeadWall,
                            )}
                        </g>
                    );
                })}

                <circle
                    cx={rightColX + verticalWidth / 2}
                    cy={rightColStartY + step * 9}
                    r="7"
                    fill="#0ea5e9"
                />
                <text
                    x={rightColX + verticalWidth / 2}
                    y={rightColStartY + step * 9 + 2}
                    textAnchor="middle"
                    fontSize="7"
                    fill="#ffffff"
                    fontWeight="700"
                >
                    B
                </text>
            </svg>
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-medium">
                <div className="rounded-md border border-amber-300/60 bg-amber-100/60 px-2 py-1">
                    {liveLabel}
                </div>
                <div className="rounded-md border border-sky-300/60 bg-sky-100/60 px-2 py-1">
                    {breakLabel}
                </div>
                <div className="rounded-md border border-rose-300/60 bg-rose-100/60 px-2 py-1">
                    {deadLabel}
                </div>
            </div>
        </div>
    );
}
