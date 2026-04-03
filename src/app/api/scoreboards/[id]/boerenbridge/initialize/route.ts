import { NextResponse } from "next/server";
import { parseUuid } from "@/lib/uuid";
import { initializeBoerenbridgePlayers } from "@/server/service/boerenbridge";
import { createBoerenbridgePlayersSchema } from "@/validation/create-boerenbridge-players-schema";
import { logApiError } from "@/app/api/_utils/route-error";

type Props = {
    params: Promise<{ id: string }>;
};

export async function POST(request: Request, props: Props) {
    try {
        const { id: rawId } = await props.params;
        const scoreboardId = parseUuid(rawId);
        const body = createBoerenbridgePlayersSchema.parse(await request.json());

        const players = await initializeBoerenbridgePlayers(
            scoreboardId,
            body.players.map((player) => ({ name: player.playerName })),
        );

        return NextResponse.json({ players }, { status: 201 });
    } catch (error) {
        logApiError({
            route: "/api/scoreboards/[id]/boerenbridge/initialize",
            operation: "POST initialize players",
            error,
            request,
            metadata: {
                rawId: (await props.params).id,
            },
        });

        const message =
            error instanceof Error
                ? error.message
                : "Failed to initialize boerenbridge players";

        return new NextResponse(message, { status: 500 });
    }
}
