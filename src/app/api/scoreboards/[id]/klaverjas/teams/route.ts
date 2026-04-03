import {
    createKlaverjasGame,
    getTeamsForScoreboard,
} from "@/server/service/klaverjas";
import { createKlaverjasGameSchema } from "@/validation/create-klaverjas-game-schema";
import { NextResponse } from "next/server";
import { parseUuid } from "@/lib/uuid";

type Props = {
    params: Promise<{ id: string }>;
};

export async function GET(_request: Request, props: Props) {
    try {
        const { id: rawId } = await props.params;
        const id = parseUuid(rawId);
        const teams = await getTeamsForScoreboard(id);

        return NextResponse.json(teams);
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Failed to fetch klaverjas teams";

        if (message === "Teams not found" || message === "Both teams must exist") {
            return new NextResponse(message, { status: 404 });
        }

        return new NextResponse(message, { status: 500 });
    }
}

export async function POST(request: Request, props: Props) {
    try {
        const { id: rawId } = await props.params;
        const id = parseUuid(rawId);
        const body = createKlaverjasGameSchema.parse(await request.json());
        const teams = await createKlaverjasGame(body, id);

        return NextResponse.json(teams, { status: 201 });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Failed to create klaverjas teams";

        return new NextResponse(message, { status: 500 });
    }
}
