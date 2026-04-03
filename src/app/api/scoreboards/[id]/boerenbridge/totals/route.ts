import { NextResponse } from "next/server";
import { parseUuid } from "@/lib/uuid";
import { getBoerenbridgeTotals } from "@/server/service/boerenbridge";
import { logApiError } from "@/app/api/_utils/route-error";

type Props = {
    params: Promise<{ id: string }>;
};

export async function GET(_request: Request, props: Props) {
    try {
        const { id: rawId } = await props.params;
        const scoreboardId = parseUuid(rawId);
        const totals = await getBoerenbridgeTotals(scoreboardId);

        return NextResponse.json(totals);
    } catch (error) {
        logApiError({
            route: "/api/scoreboards/[id]/boerenbridge/totals",
            operation: "GET totals",
            error,
            request: _request,
            metadata: {
                rawId: (await props.params).id,
            },
        });

        const message =
            error instanceof Error
                ? error.message
                : "Failed to fetch boerenbridge totals";

        return new NextResponse(message, { status: 500 });
    }
}
