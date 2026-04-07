import { getScoreboardsStatsForUser } from "@/server/service/scoreboard";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const stats = await getScoreboardsStatsForUser();

        return NextResponse.json(stats);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Failed to fetch scoreboards stats";

        return new NextResponse(message, { status: 500 });
    }
}
