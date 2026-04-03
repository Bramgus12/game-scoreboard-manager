import { NextResponse } from "next/server";
import { parseUuid } from "@/lib/uuid";
import { getBoerenbridgePlayers } from "@/server/service/boerenbridge";
import { logApiError } from "@/app/api/_utils/route-error";

type Props = {
    params: Promise<{ id: string }>;
};

export async function GET(_request: Request, props: Props) {
    try {
        const { id: rawId } = await props.params;
        const scoreboardId = parseUuid(rawId);
        const players = await getBoerenbridgePlayers(scoreboardId);

        return NextResponse.json(players);
    } catch (error) {
        logApiError({
            route: "/api/scoreboards/[id]/boerenbridge/players",
            operation: "GET players",
            error,
            request: _request,
            metadata: {
                rawId: (await props.params).id,
            },
        });

        const message =
            error instanceof Error
                ? error.message
                : "Failed to fetch boerenbridge players";

        return new NextResponse(message, { status: 500 });
    }
}
