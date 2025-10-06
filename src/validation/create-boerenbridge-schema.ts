import { z } from "zod";

export const validationScheme = z.object({
    scoreboardName: z.string().nonempty(),
    pointsPerCorrectGuess: z.coerce
        .number({ message: "Value must be a number" })
        .int()
        .min(1),
    players: z.array(z.object({ playerName: z.string().nonempty() })).nonempty(),
});

export type CreateBoerenbridgeGameForm = z.infer<typeof validationScheme>;
