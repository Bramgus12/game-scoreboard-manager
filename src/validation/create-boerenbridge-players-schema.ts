import { z } from "zod";

export const createBoerenbridgePlayersSchema = z.object({
    players: z
        .array(z.object({ playerName: z.string().trim().min(1) }))
        .min(1)
        .max(52),
});

export type CreateBoerenbridgePlayersForm = z.infer<
    typeof createBoerenbridgePlayersSchema
>;
