import { getTotals } from "@/server/service/klaverjas";
import { NextResponse } from "next/server";
import { parseUuid } from "@/lib/uuid";

type Props = {
    params: Promise<{ id: string }>;
};

export async function GET(_request: Request, props: Props) {
    try {
        const { id: rawId } = await props.params;
        const id = parseUuid(rawId);
        const totals = await getTotals(id);

        return NextResponse.json(totals);
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Failed to fetch klaverjas totals";

        return new NextResponse(message, { status: 500 });
    }
}
