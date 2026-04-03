import { NextResponse } from "next/server";
import { createBoerenbridgeScoreboardWithGame } from "@/server/service/scoreboard";
import { createBoerenbridgeScoreboardSchema } from "@/validation/create-boerenbridge-scoreboard-schema";
import { logApiError } from "@/app/api/_utils/route-error";

export async function POST(request: Request) {
    try {
        const body = createBoerenbridgeScoreboardSchema.parse(await request.json());

        const scoreboard = await createBoerenbridgeScoreboardWithGame({
            scoreboardName: body.scoreboardName,
            pointsPerCorrectGuess: body.pointsPerCorrectGuess,
            players: body.players.map((player) => ({ name: player.playerName })),
        });

        return NextResponse.json(scoreboard, { status: 201 });
    } catch (error) {
        logApiError({
            route: "/api/scoreboards/boerenbridge",
            operation: "POST create boerenbridge scoreboard",
            error,
            request,
        });

        const message =
            error instanceof Error
                ? error.message
                : "Failed to create boerenbridge scoreboard";

        return new NextResponse(message, { status: 500 });
    }
}
