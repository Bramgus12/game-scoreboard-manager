import {
    deleteScoreboardById,
    getScoreboardById,
} from "@/server/service/scoreboard";
import { NextResponse } from "next/server";
import { parseUuid } from "@/lib/uuid";

type Props = {
    params: Promise<{ id: string }>;
};

export async function GET(_request: Request, props: Props) {
    try {
        const { id: rawId } = await props.params;
        const id = parseUuid(rawId);
        const scoreboard = await getScoreboardById(id);

        return NextResponse.json(scoreboard);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Failed to fetch scoreboard";

        if (message === "Scoreboard not found") {
            return new NextResponse(message, { status: 404 });
        }

        return new NextResponse(message, { status: 500 });
    }
}

export async function DELETE(_request: Request, props: Props) {
    try {
        const { id: rawId } = await props.params;
        const id = parseUuid(rawId);

        await deleteScoreboardById(id);

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Failed to delete scoreboard";

        if (message === "Scoreboard not found") {
            return new NextResponse(message, { status: 404 });
        }

        return new NextResponse(message, { status: 500 });
    }
}
