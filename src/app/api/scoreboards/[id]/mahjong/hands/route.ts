import { NextResponse } from "next/server";
import { parseUuid } from "@/lib/uuid";
import { createMahjongHand, getMahjongHands } from "@/server/service/mahjong";
import { createMahjongHandSchema } from "@/validation/create-mahjong-hand-schema";
import { logApiError } from "@/app/api/_utils/route-error";
import { currentUser } from "@clerk/nextjs/server";
import { getPostHogClient } from "@/lib/posthog-server";

type Props = {
    params: Promise<{ id: string }>;
};

export async function GET(_request: Request, props: Props) {
    try {
        const { id: rawId } = await props.params;
        const scoreboardId = parseUuid(rawId);
        const hands = await getMahjongHands(scoreboardId);

        return NextResponse.json(hands);
    } catch (error) {
        logApiError({
            route: "/api/scoreboards/[id]/mahjong/hands",
            operation: "GET hands",
            error,
            request: _request,
            metadata: {
                rawId: (await props.params).id,
            },
        });

        const message =
            error instanceof Error ? error.message : "Failed to fetch mahjong hands";

        return new NextResponse(message, { status: 500 });
    }
}

export async function POST(request: Request, props: Props) {
    try {
        const { id: rawId } = await props.params;
        const scoreboardId = parseUuid(rawId);
        const body = createMahjongHandSchema.parse(await request.json());

        await createMahjongHand(scoreboardId, body);

        const user = await currentUser();
        if (user) {
            const posthog = getPostHogClient();
            posthog.capture({
                distinctId: user.id,
                event: "mahjong_hand_created",
                properties: {
                    scoreboard_id: scoreboardId,
                    win_type: body.winType,
                    winner_points: body.winnerPoints,
                    is_limit_hand: body.isLimitHand,
                },
            });
        }

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        logApiError({
            route: "/api/scoreboards/[id]/mahjong/hands",
            operation: "POST hands",
            error,
            request,
            metadata: {
                rawId: (await props.params).id,
            },
        });

        const message =
            error instanceof Error ? error.message : "Failed to create mahjong hand";

        return new NextResponse(message, { status: 500 });
    }
}
