import { NextResponse } from "next/server";
import { createMahjongScoreboardWithGame } from "@/server/service/scoreboard";
import { createMahjongScoreboardSchema } from "@/validation/create-mahjong-scoreboard-schema";
import { logApiError } from "@/app/api/_utils/route-error";
import { currentUser } from "@clerk/nextjs/server";
import { getPostHogClient } from "@/lib/posthog-server";

export async function POST(request: Request) {
    try {
        const body = createMahjongScoreboardSchema.parse(await request.json());

        const scoreboard = await createMahjongScoreboardWithGame({
            scoreboardName: body.scoreboardName,
            players: body.players.map((player) => ({ name: player.playerName })),
            handLimit: body.handLimit,
            pointsLimit: body.pointsLimit,
            ruleProfile: body.ruleProfile,
        });

        const user = await currentUser();
        if (user) {
            const posthog = getPostHogClient();
            posthog.capture({
                distinctId: user.id,
                event: "mahjong_scoreboard_created",
                properties: {
                    scoreboard_id: scoreboard.id,
                    scoreboard_name: scoreboard.scoreboardName,
                    player_count: body.players.length,
                    hand_limit: body.handLimit,
                    points_limit: body.pointsLimit,
                    rule_profile: body.ruleProfile,
                },
            });
        }

        return NextResponse.json(scoreboard, { status: 201 });
    } catch (error) {
        logApiError({
            route: "/api/scoreboards/mahjong",
            operation: "POST create mahjong scoreboard",
            error,
            request,
        });

        const message =
            error instanceof Error
                ? error.message
                : "Failed to create mahjong scoreboard";

        return new NextResponse(message, { status: 500 });
    }
}
