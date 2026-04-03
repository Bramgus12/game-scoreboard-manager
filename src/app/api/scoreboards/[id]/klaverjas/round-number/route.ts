import { getRoundNumber } from "@/server/service/klaverjas";
import { NextResponse } from "next/server";
import { parseUuid } from "@/lib/uuid";

type Props = {
    params: Promise<{ id: string }>;
};

export async function GET(_request: Request, props: Props) {
    try {
        const { id: rawId } = await props.params;
        const id = parseUuid(rawId);
        const roundNumber = await getRoundNumber(id);

        return NextResponse.json({ roundNumber });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Failed to fetch klaverjas round number";

        return new NextResponse(message, { status: 500 });
    }
}
