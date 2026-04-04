import { NextResponse } from "next/server";
import { parseUuid } from "@/lib/uuid";
import {
    createBoerenbridgeRound,
    getBoerenbridgeRounds,
    updateBoerenbridgeRound,
} from "@/server/service/boerenbridge";
import { createBoerenbridgeRoundSchema } from "@/validation/create-boerenbridge-round-schema";
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
        const rounds = await getBoerenbridgeRounds(scoreboardId);

        return NextResponse.json(rounds);
    } catch (error) {
        logApiError({
            route: "/api/scoreboards/[id]/boerenbridge/rounds",
            operation: "GET rounds",
            error,
            request: _request,
            metadata: {
                rawId: (await props.params).id,
            },
        });

        const message =
            error instanceof Error
                ? error.message
                : "Failed to fetch boerenbridge rounds";

        return new NextResponse(message, { status: 500 });
    }
}

export async function POST(request: Request, props: Props) {
    try {
        const { id: rawId } = await props.params;
        const scoreboardId = parseUuid(rawId);
        const body = createBoerenbridgeRoundSchema.parse(await request.json());

        await createBoerenbridgeRound(scoreboardId, body.roundNumber, body.entries);

        const user = await currentUser();
        if (user) {
            const posthog = getPostHogClient();
            posthog.capture({
                distinctId: user.id,
                event: "boerenbridge_round_created",
                properties: {
                    scoreboard_id: scoreboardId,
                    round_number: body.roundNumber,
                    player_count: body.entries.length,
                },
            });
        }

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        logApiError({
            route: "/api/scoreboards/[id]/boerenbridge/rounds",
            operation: "POST rounds",
            error,
            request,
            metadata: {
                rawId: (await props.params).id,
            },
        });

        const message =
            error instanceof Error
                ? error.message
                : "Failed to create boerenbridge round";

        return new NextResponse(message, { status: 500 });
    }
}

export async function PUT(request: Request, props: Props) {
    try {
        const { id: rawId } = await props.params;
        const scoreboardId = parseUuid(rawId);
        const body = createBoerenbridgeRoundSchema.parse(await request.json());

        await updateBoerenbridgeRound(scoreboardId, body.roundNumber, body.entries);

        const user = await currentUser();
        if (user) {
            const posthog = getPostHogClient();
            posthog.capture({
                distinctId: user.id,
                event: "boerenbridge_round_updated",
                properties: {
                    scoreboard_id: scoreboardId,
                    round_number: body.roundNumber,
                    player_count: body.entries.length,
                },
            });
        }

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        logApiError({
            route: "/api/scoreboards/[id]/boerenbridge/rounds",
            operation: "PUT rounds",
            error,
            request,
            metadata: {
                rawId: (await props.params).id,
            },
        });

        const message =
            error instanceof Error
                ? error.message
                : "Failed to update boerenbridge round";

        return new NextResponse(message, { status: 500 });
    }
}
