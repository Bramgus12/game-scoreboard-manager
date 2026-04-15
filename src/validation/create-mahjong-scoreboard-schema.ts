import { z } from "zod";
import { MAHJONG_RULE_PROFILE } from "@/constants/mahjong";

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

const playerSchema = z.object({
    playerName: z.string().trim().min(1),
});

export const createMahjongGameSchema = z.object({
    players: z.array(playerSchema).length(4),
    handLimit: numberFromText.pipe(z.number().int().min(4).max(256)).default(16),
    pointsLimit: numberFromText
        .pipe(z.number().int().min(1).max(2000))
        .default(2000),
    ruleProfile: z
        .enum([MAHJONG_RULE_PROFILE.NTS_2002_2019_V1])
        .default(MAHJONG_RULE_PROFILE.NTS_2002_2019_V1),
});

export const createMahjongScoreboardSchema = createMahjongGameSchema.extend({
    scoreboardName: z.string().trim().min(1),
});

export type CreateMahjongGameForm = z.output<typeof createMahjongGameSchema>;
export type CreateMahjongGameFormInput = z.input<typeof createMahjongGameSchema>;

export type CreateMahjongScoreboardForm = z.output<
    typeof createMahjongScoreboardSchema
>;
