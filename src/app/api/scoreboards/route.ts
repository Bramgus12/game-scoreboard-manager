import {
    createScoreboard,
    getScoreboardsForUser,
} from "@/server/service/scoreboard";
import { NextResponse } from "next/server";
import { z } from "zod";
import { GAME_TYPE } from "@/constants/gameType";
import { currentUser } from "@clerk/nextjs/server";
import { getPostHogClient } from "@/lib/posthog-server";

const createScoreboardSchema = z.object({
    scoreboardName: z.string().min(1),
    gameType: z.enum([GAME_TYPE.KLAVERJAS, GAME_TYPE.BOERENBRIDGE]),
});

export async function GET() {
    try {
        const scoreboards = await getScoreboardsForUser();

        return NextResponse.json(scoreboards);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Failed to fetch scoreboards";

        return new NextResponse(message, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = createScoreboardSchema.parse(await request.json());
        const scoreboard = await createScoreboard(body);

        const user = await currentUser();
        if (user) {
            const posthog = getPostHogClient();
            posthog.capture({
                distinctId: user.id,
                event: "scoreboard_created",
                properties: {
                    scoreboard_id: scoreboard.id,
                    scoreboard_name: scoreboard.scoreboardName,
                    game_type: body.gameType,
                },
            });
        }

        return NextResponse.json(scoreboard, { status: 201 });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Failed to create scoreboard";

        return new NextResponse(message, { status: 500 });
    }
}
