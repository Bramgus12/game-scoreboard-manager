import { UUID } from "crypto";
import { z } from "zod";
import { isUuid } from "@/lib/uuid";

const numberFromText = z.union([
    z.number(),
    z
        .string()
        .trim()
        .min(1, "Value must be a number")
        .refine((value) => !Number.isNaN(Number(value)), {
            message: "Value must be a number",
        })
        .transform((value) => Number(value)),
]);

const roundEntrySchema = z.object({
    playerId: z.custom<UUID>(
        (value): value is UUID => typeof value === "string" && isUuid(value),
        "Invalid UUID",
    ),
    expectedWins: numberFromText.pipe(z.number().int().min(0)),
    actualWins: numberFromText.pipe(z.number().int().min(0)),
});

export const createBoerenbridgeRoundSchema = z.object({
    roundNumber: numberFromText.pipe(z.number().int().min(1)),
    entries: z.array(roundEntrySchema).min(1),
});

export type CreateBoerenbridgeRoundForm = z.output<
    typeof createBoerenbridgeRoundSchema
>;
export type CreateBoerenbridgeRoundFormInput = z.input<
    typeof createBoerenbridgeRoundSchema
>;
