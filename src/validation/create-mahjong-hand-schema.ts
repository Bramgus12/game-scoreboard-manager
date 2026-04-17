import { z } from "zod";
import { MAHJONG_WIN_TYPE } from "@/constants/mahjong";
import { UUID } from "crypto";
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

const nullableUuid = z.union([
    z.null(),
    z.custom<UUID>(
        (value): value is UUID => typeof value === "string" && isUuid(value),
        "Invalid UUID",
    ),
]);

export const createMahjongHandSchema = z.object({
    winType: z.enum([
        MAHJONG_WIN_TYPE.SELF_DRAW,
        MAHJONG_WIN_TYPE.DISCARD,
        MAHJONG_WIN_TYPE.REMISE,
    ]),
    winnerPlayerId: nullableUuid,
    discardedByPlayerId: nullableUuid,
    winnerPoints: numberFromText.pipe(z.number().int().min(0)),
    isLimitHand: z.boolean().default(false),
});

export type CreateMahjongHandForm = z.output<typeof createMahjongHandSchema>;
export type CreateMahjongHandFormInput = z.input<typeof createMahjongHandSchema>;
