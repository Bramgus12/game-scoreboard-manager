import { z } from "zod";

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

export const createBoerenbridgeScoreboardSchema = z.object({
    scoreboardName: z.string().trim().min(1),
    pointsPerCorrectGuess: numberFromText.pipe(z.number().int().min(1)),
    players: z
        .array(z.object({ playerName: z.string().trim().min(1) }))
        .min(1)
        .max(52),
});

export type CreateBoerenbridgeScoreboardForm = z.output<
    typeof createBoerenbridgeScoreboardSchema
>;
export type CreateBoerenbridgeScoreboardFormInput = z.input<
    typeof createBoerenbridgeScoreboardSchema
>;
