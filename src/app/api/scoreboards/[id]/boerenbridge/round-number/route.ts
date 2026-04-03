import { NextResponse } from "next/server";
import { parseUuid } from "@/lib/uuid";
import { getBoerenbridgeRoundNumber } from "@/server/service/boerenbridge";
import { logApiError } from "@/app/api/_utils/route-error";

type Props = {
    params: Promise<{ id: string }>;
};

export async function GET(_request: Request, props: Props) {
    try {
        const { id: rawId } = await props.params;
        const scoreboardId = parseUuid(rawId);
        const roundState = await getBoerenbridgeRoundNumber(scoreboardId);

        return NextResponse.json(roundState);
    } catch (error) {
        logApiError({
            route: "/api/scoreboards/[id]/boerenbridge/round-number",
            operation: "GET round number",
            error,
            request: _request,
            metadata: {
                rawId: (await props.params).id,
            },
        });

        const message =
            error instanceof Error
                ? error.message
                : "Failed to fetch boerenbridge round number";

        return new NextResponse(message, { status: 500 });
    }
}
