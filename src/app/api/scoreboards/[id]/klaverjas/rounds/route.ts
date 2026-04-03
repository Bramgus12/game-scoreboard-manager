import {
    createKlaverjasRoundsForBothTeams,
    getRoundsForScoreboard,
    updateKlaverjasRoundsForBothTeams,
} from "@/server/service/klaverjas";
import { NextResponse } from "next/server";
import { z } from "zod";
import { isUuid, parseUuid } from "@/lib/uuid";
import { UUID } from "crypto";

const createRoundSchema = z.object({
    roundNumber: z.number(),
    points: z.number(),
    fame: z.number(),
    isPit: z.boolean(),
    isWet: z.boolean(),
    isGoing: z.boolean(),
});

const updateRoundSchema = z.object({
    roundNumber: z.number(),
    points: z.number(),
    fame: z.number(),
    isPit: z.boolean(),
    isWet: z.boolean(),
    isGoing: z.boolean(),
    id: z.custom<UUID>(
        (value): value is UUID => typeof value === "string" && isUuid(value),
        "Invalid UUID",
    ),
});

type Props = {
    params: Promise<{ id: string }>;
};

const createRoundsBodySchema = z.object({
    teamUsRound: createRoundSchema,
    teamThemRound: createRoundSchema,
});

const updateRoundsBodySchema = z.object({
    teamUsRound: updateRoundSchema,
    teamThemRound: updateRoundSchema,
});

export async function GET(_request: Request, props: Props) {
    try {
        const { id: rawId } = await props.params;
        const id = parseUuid(rawId);
        const rounds = await getRoundsForScoreboard(id);

        return NextResponse.json(rounds);
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Failed to fetch klaverjas rounds";

        return new NextResponse(message, { status: 500 });
    }
}

export async function POST(request: Request, props: Props) {
    try {
        const { id: rawId } = await props.params;
        const id = parseUuid(rawId);
        const body = createRoundsBodySchema.parse(await request.json());

        await createKlaverjasRoundsForBothTeams(
            id,
            body.teamUsRound,
            body.teamThemRound,
        );

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Failed to create klaverjas rounds";

        return new NextResponse(message, { status: 500 });
    }
}

export async function PUT(request: Request, props: Props) {
    try {
        const { id: rawId } = await props.params;
        const id = parseUuid(rawId);
        const body = updateRoundsBodySchema.parse(await request.json());

        await updateKlaverjasRoundsForBothTeams(
            id,
            body.teamUsRound,
            body.teamThemRound,
        );

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Failed to update klaverjas rounds";

        return new NextResponse(message, { status: 500 });
    }
}
