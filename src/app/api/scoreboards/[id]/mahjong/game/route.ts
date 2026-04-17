import { NextResponse } from "next/server";
import { parseUuid } from "@/lib/uuid";
import { getMahjongGame } from "@/server/service/mahjong";
import { logApiError } from "@/app/api/_utils/route-error";

type Props = {
    params: Promise<{ id: string }>;
};

export async function GET(_request: Request, props: Props) {
    try {
        const { id: rawId } = await props.params;
        const scoreboardId = parseUuid(rawId);
        const game = await getMahjongGame(scoreboardId);

        return NextResponse.json(game);
    } catch (error) {
        logApiError({
            route: "/api/scoreboards/[id]/mahjong/game",
            operation: "GET game",
            error,
            request: _request,
            metadata: {
                rawId: (await props.params).id,
            },
        });

        const message =
            error instanceof Error ? error.message : "Failed to fetch mahjong game";

        return new NextResponse(message, { status: 500 });
    }
}
