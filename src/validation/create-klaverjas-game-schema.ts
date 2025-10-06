import { z } from "zod";

export const createKlaverjasGameSchema = z.object({
    ourTeamName: z.string().nonempty(),
    theirTeamName: z.string().nonempty(),
});

export type CreateKlaverjasGameForm = z.infer<typeof createKlaverjasGameSchema>;
